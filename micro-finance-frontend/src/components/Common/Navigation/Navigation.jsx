
import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSettings,FiLogOut,IoIosNotifications , FiUsers, FiDollarSign, FiBarChart2, FiClipboard, FiBell } from 'react-icons/fi';
import './nav.css'; 

const Navigation = () => {
    return (
        <div className="navigation-container">
            <ul className="navigation-list">
                <li className="navigation-item">
                    <Link to="/home" className="navigation-link">
                        <FiHome className="icon" />
                        <span>Home</span>
                    </Link>
                </li>
                
                <li className="navigation-item">
                    <Link to="/beneficiaries" className="navigation-link">
                        <FiUsers className="icon" />
                        <span>Beneficiaries</span>
                    </Link>
                </li>
                <li className="navigation-item">
                    <Link to="/funds" className="navigation-link">
                        <FiDollarSign className="icon" />
                        <span>Funds Management</span>
                    </Link>
                </li>
                <li className="navigation-item">
                    <Link to="/loan" className="navigation-link">
                        <FiDollarSign className="icon" />
                        <span>Loan Management</span>
                    </Link>
                </li>
                <li className="navigation-item">
                    <Link to="/logout" className="navigation-link">
                         <FiBell  className='icon' />
                         <span>Notifications</span>          
                    </Link>
                </li>
                <li className="navigation-item">
                    <Link to="/reports" className="navigation-link">
                        <FiBarChart2 className="icon" />
                        <span>Reports</span>
                    </Link>
                </li>
                <li className="navigation-item">
                    <Link to="/settings" className="navigation-link">
                        <FiSettings className="icon" />
                        <span>Settings</span>
                    </Link>
                </li>
                <li className="navigation-item">
                    <Link to="/logout" className="navigation-link">
                         <FiLogOut className='icon' />
                         <span>Logout</span>          
                    </Link>
                </li>

            </ul>
        </div>
    );
}

export default Navigation;
