import "./App.css";

import { Link, Redirect, Router } from "@reach/router";
import NotFound from "./views/NotFound";
import Product from "./views/Product";
import Products from "./views/Products";
import NewProduct from "./views/NewProduct";
import EditProduct from "./views/EditProduct";

function App() {
  return (
    <div style={{ textAlign: "center", width: "80%", margin: "0 auto" }}>
      <header>
        <nav>
          <Link to="/products">All Products</Link> |{" "}
          <Link to="/products/new">New Product</Link>
        </nav>
      </header>

      <Router>
        <Product path="/products/:id" />
        <Products path="/products" />
        <EditProduct path="/products/:id/edit" />
        <NewProduct path="/products/new" />
        <Redirect from="/" to="/products" noThrow="true" />
        {/* If no routes are matched, render this */}
        <NotFound default />
      </Router>
    </div>
  );
}

export default App;