import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import PhonesPage from "./pages/PhonesPage";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import DataBundlesPage from "./pages/DataBundlesPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import SwapPage from "./pages/SwapPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import TrackPage from "./pages/TrackPage";

function App() {
  return (
    <div className="min-h-screen bg-[#e9eff7]">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/swap" element={<SwapPage />} />
          <Route path="/data-bundles" element={<DataBundlesPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/contact" element={<ComingSoon title="Contact" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
