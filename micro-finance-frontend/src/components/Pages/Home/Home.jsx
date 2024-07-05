import React, { useEffect, useState } from 'react';
import Navigation from '../../Common/Navigation/Navigation';
import { GET_BENE_URL } from '../../../Api';
import "./home.css"
import axios from 'axios';

const Home = () => {
    const userSession = sessionStorage.getItem('user');
    const user = userSession ? JSON.parse(userSession) : null;
    const userId = user?.id ?? null;
    const [Beneficiaries, setBeneficiaries] = useState([]);

    useEffect(() => {
        const get_all_loan_Beneficiaries = async () => {
            try {
                const response = await axios.get(`${GET_BENE_URL}${userId}`);
                if (response.status === 200) {
                    const responseData =  response.data[0]
                    setBeneficiaries(response.data);
                    console.log("Beneficiaries:", responseData); 
                } else {
                    console.log(response.data[0].detail);
                }
            } catch (error) {
                console.error("Error fetching beneficiaries:", error.message);
            }
        };
        get_all_loan_Beneficiaries();
    }, []);
    
    return (
        <div> 
            <div className="app-container">
                <Navigation/>
                <div className="dashboard-body">
                    <div className="dashboard-overview">
                      <div className="dashboard-card">
                        <span>Loan Beneficiaries</span>
                       </div> 
                      <div className="dashboard-card">
                        <p>Loan Payment</p>
                       </div> 
                      <div className="dashboard-card">
                        <p>Loan Application</p>
                       </div> 
                      <div className="dashboard-card">
                        <p>Loan Provider</p>
                       </div> 
                      <div className="dashboard-card">
                        <p>Transaction</p>
                       </div> 
                      <div className="dashboard-card">
                        <p>Notification</p>
                       </div> 
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;
