import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Hidden from '@material-ui/core/Hidden';
import { Button, Menu, MenuItem, Typography } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { useAuthDataContext } from '../../auth/AuthDataProvider';
import ChangePassword from '../ChangePassword';
import { getList } from '../../dataProvider/API';
import { CART } from '../../constants/endpoints';
import { roleTypes } from '../../constants/api';

const useStyles = makeStyles(theme => ({
  appBar: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#000000',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  rootList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  image: {
    height: 30,
    [theme.breakpoints.down('xs')]: {
      height: 25,
      marginTop: 5,
    },
  },
  submit: {
    margin: 5,
  },
  center: {
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(5),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    display: 'none',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  cart: {
    display: 'none',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = ({ handleToggle, setCatalogOpen, catalogOpen }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // eslint-disable-next-line no-unused-vars
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const history = useHistory();
  const { user, onLogout } = useAuthDataContext();
  let role;
  if (user) {
    // eslint-disable-next-line prefer-destructuring
    role = user.role;
  } else {
    role = 'EMPTY';
  }
  const [response, setResponse] = React.useState(null);
  useEffect(() => {
    getList(CART(user.id)).then(r => {
      setResponse(r.data.totalElements);
    });
  }, []);
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    history.push(routes.HOME);
  };

  const handleLogin = () => {
    history.push(routes.SIGN_IN);
  };
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden smUp implementation="css">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div
            className={classes.title}
            onClick={() => history.push(routes.MAIN)}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Drones.shop
            </Typography>
          </div>
          {/* <div className={classes.search}> */}
          {/*  <div className={classes.searchIcon}> */}
          {/*    <SearchIcon /> */}
          {/*  </div> */}
          {/*  <InputBase */}
          {/*    placeholder="Search…" */}
          {/*    classes={{ */}
          {/*      root: classes.inputRoot, */}
          {/*      input: classes.inputInput, */}
          {/*    }} */}
          {/*    inputProps={{ 'aria-label': 'search' }} */}
          {/*  /> */}
          {/* </div> */}
          <Button
            className={classes.sectionDesktop}
            onClick={() => setCatalogOpen(!catalogOpen)}
          >
            <h4 className={classes.center}>КАТАЛОГ</h4>
          </Button>
          <Button
            className={classes.sectionDesktop}
            onClick={() => history.push(routes.PAY)}
          >
            <h4 className={classes.center}>ДОСТАВКА И ОПЛАТА</h4>
          </Button>
          <Button
            className={classes.sectionDesktop}
            onClick={() => history.push(routes.CONTACTS)}
          >
            <h4 className={classes.center}>КОНТАКТЫ</h4>
          </Button>
          {user && role !== roleTypes.ADMIN && (
            <div className={classes.cart}>
              <IconButton
                onClick={() => history.push(routes.CART)}
                className={classes.center}
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={response || 0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          )}
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          <div>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            {user ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <ChangePassword>
                  <MenuItem>Сменить пароль</MenuItem>
                </ChangePassword>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
              </Menu>
            ) : (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogin}>Войти</MenuItem>
              </Menu>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  setCatalogOpen: PropTypes.func.isRequired,
  catalogOpen: PropTypes.bool.isRequired,
};

export default Header;
