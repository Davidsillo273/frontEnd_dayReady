import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginAdmin from './Pages/admin/loginAdmin';
import Dashboard from './Pages/admin/dashboard';
import Menu from './Pages/admin/menu';
import Products from './Pages/admin/products';
import Orders from './Pages/admin/orders';
import RegisterUser from './Pages/admin/registerUser';
import RecoveryPass from './Pages/admin/recoveryPass';
import LoginCustomer from './Pages/customer/loginCustomer';
import RecoveryPassCustomer from './Pages/customer/recoveryPass';
import RegisterCustomer from './Pages/customer/registerCustomer';

function App() {

  console.log("App se está cargando...");

  return (
    <Router>
      <Routes>
        {/* RUTAS DE CLIENTE */}
        <Route path="/" element={<LoginCustomer />} />
        <Route path="/customer/register" element={<RegisterCustomer />} />
        <Route path="/customer/recovery" element={<RecoveryPassCustomer />} />

        {/* RUTAS DE ADMIN */}
        <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/menu" element={<Menu />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/register" element={<RegisterUser />} />
        <Route path="/admin/recovery" element={<RecoveryPass />} />

        {/* 404 - Redirigir al inicio si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;