import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import Navbar from "./Components/Header";
import { useState } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart"

function App() {
  const cartData = JSON.parse(localStorage.getItem("cartItems"));
  const [cartItem, setCartItem] = useState(cartData);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BrowserRouter>
        <Navbar totalItems={cartItem.length} />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/register"
            element={<Register  />}
          />
          <Route
            exact
            path="/home"
            element={<ProductList setCartItem={setCartItem} />}
          />
          <Route
            exact
            path="/cart"
            element={<Cart />}
          />
          {/* <Route exact path="/form/:formId" element={<Form />} /> */}
          {/* <Route exact path="/formList" element={<FormsList />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
