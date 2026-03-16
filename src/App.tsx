import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wealth from "./pages/Wealth";
import Maker from "./pages/Maker";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Wealth />} />
      <Route path="/maker" element={<Maker />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
