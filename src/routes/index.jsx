//import react router dom
import { Routes, Route } from "react-router-dom";

//import view homepage
import Home from '../views/home.jsx';



import Login from "../views/auth/Login.jsx";
import Register from "../views/auth/Register.jsx";
import Dashboard from "../views/Dashboard.jsx";
import CategoryIndex from "../views/category/index.jsx";
import CategoryCreate from "../views/category/create.jsx";
import CategoryEdit from "../views/category/edit.jsx";
import ProductIndex from "../views/product/index.jsx";
import ProductCreate from "../views/product/create.jsx";
import ProductEdit from "../views/product/edit.jsx";
import IndexUsers from "../views/user/index.jsx";
import CreateUser from "../views/user/create.jsx";
import EditUsers from "../views/user/edit.jsx";
import CreateOrder from "../views/order/index.jsx";
import HomePage from "../pages/homepages.jsx";

function RoutesIndex() {
    return (
        <Routes>
             <Route path="/" element={<Login />} /> 
             <Route path="/register" element={<Register />} />
             <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<CategoryIndex />} />
            <Route path="/categories/create" element={<CategoryCreate />} />
            <Route path="/categories/edit/:id" element={<CategoryEdit />} />
            
            <Route path="/products" element={<ProductIndex />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/edit/:id" element={<ProductEdit />} />

            <Route path="/users" element={<IndexUsers />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/edit/:id" element={<EditUsers />} />

            <Route path="/orders" element={<CreateOrder />} />
            
            <Route path="/homepages" element={<HomePage />} />
           
        </Routes>
    )
}

export default RoutesIndex