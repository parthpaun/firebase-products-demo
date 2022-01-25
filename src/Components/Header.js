import React from "react";
import { AppBar, Toolbar, IconButton, Badge, Button } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logout } from "./../firebase";

const PrimarySearchAppBar = ({ totalItems }) => {

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <div />
          <div>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <Button onClick={logout}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default PrimarySearchAppBar;
