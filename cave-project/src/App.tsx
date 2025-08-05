import { Routes, Route } from "react-router-dom";
import BidPage from "./pages/bid";
import PersonalDataPage from "./pages/personalData";
import ConfirmationPage from "./pages/confirmation";
import ThankYouPage from "./pages/thankYou";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BidPage />} />
      <Route path="/dados" element={<PersonalDataPage />} />
      <Route path="/confirmacao" element={<ConfirmationPage />} />
      <Route path="/obrigado" element={<ThankYouPage />} />
    </Routes>
  );
}

export default App;
