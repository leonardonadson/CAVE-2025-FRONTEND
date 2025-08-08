import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BidProcess from "./pages/bidProcess";
import AdminPanel from "./pages/adminPanel";
import Login from "./pages/login";
import { ProtectedRoute } from "./components/protectedRoute";
import { useAuth } from "./hooks/useAuth";

function App() {
  const isAuthenticated = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BidProcess />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
