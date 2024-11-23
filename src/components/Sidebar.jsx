import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <ul>
                <li><Link to="/" className="block py-2">Dashboard</Link></li>
                <li><Link to="/ecommerce" className="block py-2">eCommerce</Link></li>
                <li><Link to="/analytics" className="block py-2">Analytics</Link></li>
                <li><Link to="/calendar" className="block py-2">Calendar</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
