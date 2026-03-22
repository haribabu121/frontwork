import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainSite from "./MainSite";
import AdminShell from "./admin/AdminShell";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Routes>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/*" element={<AdminShell />} />
          <Route path="*" element={<MainSite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;