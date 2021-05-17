import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Toolbar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Header from '../Header';
import LeftMenu from '../LeftMenu';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#f3f3f3',
    minHeight: 1200,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const PageTemplate = ({ children, title, description, header, actions }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [catalogOpen, setCatalogOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      <div className={classes.root}>
        <Header
          handleToggle={handleDrawerToggle}
          setCatalogOpen={setCatalogOpen}
          catalogOpen={catalogOpen}
        />
        {catalogOpen && (
          <LeftMenu
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        )}
        <main className={classes.content}>
          <Toolbar />
          <Grid container direction="row" justify="space-between">
            <Typography variant="h4" component="h1" gutterBottom>
              {header}
            </Typography>
            {actions && <div>{actions}</div>}
          </Grid>
          {children}
        </main>
      </div>
    </div>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
  description: PropTypes.string,
  title: PropTypes.string,
  header: PropTypes.node,
  actions: PropTypes.node,
};

PageTemplate.defaultProps = {
  title: 'Vacation Manager',
  description: 'Description of Vacation Manager',
};

export default PageTemplate;
