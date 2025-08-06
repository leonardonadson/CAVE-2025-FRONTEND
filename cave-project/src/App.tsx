import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BidProcess from "./pages/bidProcess";
import AdminPanel from "./pages/adminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BidProcess />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
