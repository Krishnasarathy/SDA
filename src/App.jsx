import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import DropoutMain from "./Pages/DropoutMain";
import Financial from "./Pages/Financial";
import ProtectedRoute from "./Pages/Protected";
import AdminLogin from "./Pages/AdminLogin";
import AdminPage from "./Pages/Admin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dropout" element={<DropoutMain/>} />
        <Route path="/Financial" element={<Financial/>} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
