import React from "react";
import { NavLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    textDecoration: "none",
    color: theme.palette.text.primary,
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  activeMenuItem: {
    backgroundColor: theme.palette.grey[300],
    fontWeight: "bold",
  },
}));

const MenuBarItem = ({ to, exact, children }) => {
  const classes = useStyles();

  return (
    <Box
      component={NavLink}
      to={to}
      exact={exact}
      className={classes.menuItem}
      activeClassName={classes.activeMenuItem}
    >
      {children}
    </Box>
  );
};

export default MenuBarItem;
