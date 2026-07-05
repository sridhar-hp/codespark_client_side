import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/RegisterPage';
import "tailwindcss";
export default function App() {
  return (
    <BrowserRouter className="min-h-screen bg-[#0B1120] text-white">
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter>
  );
}
