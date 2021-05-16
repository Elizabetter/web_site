import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import { Collapse, List } from '@material-ui/core';
import messages from './messages';

import { routes } from '../../constants/routes';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
// eslint-disable-next-line import/named
import { roleTypes } from '../../constants/api';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  link: {
    marginTop: 20,
    color: 'inherit',
    textDecoration: 'inherit',
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const LeftMenu = ({ handleDrawerToggle, mobileOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
  const { pathname } = location;
  const isSelected = path => pathname === path;
  const { user } = useAuthDataContext();
  //   // const user = {};
  //   // user.role = roleTypes.ADMIN;
  let role;
  if (user) {
    // eslint-disable-next-line prefer-destructuring
    role = user.role;
  } else {
    role = 'EMPTY';
  }

  const defaultLinks = (
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {user && role === roleTypes.ADMIN && (
          <Link to={routes.PRODUCTS} className={classes.link}>
            <ListItem button selected={isSelected(routes.PRODUCTS)}>
              <ListItemText primary="Товары" />
            </ListItem>
          </Link>
        )}
        {user && role === roleTypes.ADMIN && (
          <Link to={routes.ORDERS} className={classes.link}>
            <ListItem button selected={isSelected(routes.ORDERS)}>
              <ListItemText primary="Заказы" />
            </ListItem>
          </Link>
        )}
        {user && role === roleTypes.ADMIN && (
          <Link to={routes.USERS} className={classes.link}>
            <ListItem button selected={isSelected(routes.USERS)}>
              <ListItemText primary="Пользователи" />
            </ListItem>
          </Link>
        )}
        <ListItem button>
          <ListItemText primary="Каталог" />
        </ListItem>
        <Collapse in timeout="auto" unmountOnExit>
          <Link to={routes.QUADCOPTERS} className={classes.link}>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Квадрокоптеры" />
              </ListItem>
            </List>
          </Link>
          <Link to={routes.DRONS} className={classes.link}>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Гоночные дроны" />
              </ListItem>
            </List>
          </Link>
          <Link to={routes.CAMERAS} className={classes.link}>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Камеры для дронов" />
              </ListItem>
            </List>
          </Link>
          <Link to={routes.SETS} className={classes.link}>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Комплектующие для дронов" />
              </ListItem>
            </List>
          </Link>
          {user && role === roleTypes.ADMIN && (
            <ListItem
              button
              onClick={() => window.open('https://vk.com/arturqa_s', '_blank')}
            >
              <ListItemText primary="Админ" />
            </ListItem>
          )}
        </Collapse>
      </List>
    </>
  );

  const drawer = (
    <div className={classes.drawerContainer}>
      <Toolbar>
        <Typography component="h6" variant="h6">
          <FormattedMessage {...messages.title} />
        </Typography>
      </Toolbar>
      <Divider />
      {defaultLinks}
    </div>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label="menu">
      <Hidden smUp implementation="css">
        <Drawer
          // container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClick={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

LeftMenu.propTypes = {
  // window: PropTypes.func,
  handleDrawerToggle: PropTypes.func,
  mobileOpen: PropTypes.bool,
};

export default LeftMenu;
