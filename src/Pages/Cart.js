import { useEffect } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { auth } from "./../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
function Cart() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading,navigate]);
  return (
    <div className="App">
      <div style={{ display: "flex", margin: "1rem" }}>
        <Grid container spacing={2}>
          {cartItems?.map((product) => {
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
                    <Typography variant="body1" color="text.secondary">
                      {`Qty - ${product?.qty}`}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {`Total -$ ${product?.qty * product?.price}`}
                    </Typography>
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

export default Cart;
