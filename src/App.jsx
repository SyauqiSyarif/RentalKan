
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Rental from "./Pages/Rental";
import MyRentals from "./Pages/MyRentals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="rental" element={<Rental />} />
          <Route path="my-rentals" element={<MyRentals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
