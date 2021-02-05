import React from "react";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCart";

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar component="nav" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.logoBar}>
          <Typography variant="h5" className={classes.title}>
            lasagna
          </Typography>
        </div>

        <div className={classes.searchBar}>
          <InputBase className={classes.searchField} />
          <Button className={classes.searchButton}>
            <SearchIcon className={classes.searchIcon} />
          </Button>
        </div>

        <div className={classes.navLinks}>
          <Button className={classes.loginButton}>Login</Button>

          <IconButton className={classes.iconButton}>
            <Badge badgeContent={69} color="secondary">
              <CartIcon className={classes.cartIcon} />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    letterSpacing: ".3rem",
  },
  searchBar: {
    width: "40%",
    display: "flex",
  },
  searchField: {
    background: "white",
    flex: "1",
  },
  searchButton: {
    background: theme.palette.secondary.main,
    "&:hover": {
      background: "rgba(255,153,0, 0.9)",
    },
  },
  searchIcon: {
    margin: "0",
  },
  cartIcon: {
    fill: "#fff",
  },
  loginButton: {
    background: theme.palette.secondary.main,
    "&:hover": {
      background: "rgba(255,153,0, 0.9)",
    },
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
}));

export default Header;
