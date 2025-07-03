import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import OrderForm from "./components/OrderForm";
import DeliveryStatus from "./components/DeliveryStatus";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<OrderForm />} />
        <Route path="/status" element={<DeliveryStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
