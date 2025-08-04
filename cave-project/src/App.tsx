import { Routes, Route } from "react-router-dom";
import bidPage from "./pages/bid";
import personalDataPage from "./pages/personalData";
import confirmationPage from "./pages/confirmation";
import thankYouPage from "./pages/thankYou";

function App() {
  return (
    <Routes>
      <Route path="/" element={<bidPage />} />
      <Route path="/dados" element={<personalDataPage />} />
      <Route path="/confirmacao" element={<confirmationPage />} />
      <Route path="/obrigado" element={<thankYouPage />} />
    </Routes>
  );
}

export default App;
