import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { productsData } from "../data";
import { auth } from "./../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
function ProductList({ setCartItem }) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  const data = productsData;
  const handleAddToCart = (product) => {
    const cartItemClone = cartItems;

    const filteredItemIndex = cartItemClone.findIndex((item) => {
      return item.id === product.id;
    });
    if (filteredItemIndex !== -1) {
      cartItemClone[filteredItemIndex] = {
        ...product,
        qty: cartItemClone?.[filteredItemIndex]?.qty + 1,
      };
    } else {
      cartItemClone.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItemClone));
    setCartItem(cartItemClone);
  };
  useEffect(
    () => {
      if (loading) return;
      if (!user) return navigate("/");
    },
    [user, loading, navigate],
    navigate
  );
  return (
    <div className="App">
      <div style={{ display: "flex", margin: "1rem" }}>
        <Grid container spacing={2}>
          {data?.map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 400, minHeight: 320 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    // height="140"
                    image={product?.image_src?.[0]}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.vendor}
                    </Typography>
                    <Typography gutterBottom variant="body" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {`$ ${product?.price}`}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default ProductList;
