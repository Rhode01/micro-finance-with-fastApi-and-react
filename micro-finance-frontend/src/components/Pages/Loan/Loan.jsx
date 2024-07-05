import React from 'react'

import Navigation from '../../Common/Navigation/Navigation'
import { GET_LOAN_APPLI } from '../../../Api'
import { useState,useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart,CategoryScale, LinearScale,BarElement,Title,Tooltip,Legend, plugins } from 'chart.js';
import axios from "axios"
import "./loan.css"
import { faker } from '@faker-js/faker';
const Loan = () => {
    const [LoanApplications, setLoanApplication] = useState([])
    const [activeLoans, setActiveLoans] = useState([])
    const [loanPayments, setLoanPayments] = useState([])
    const userSession =  JSON.parse(sessionStorage.getItem("user"))
    const userId = userSession ?  userSession.id :  null
    useEffect(()=>{
        const get_loan_applications = async () => {
            try {
                const response = await axios.get(`${GET_LOAN_APPLI}${userId}`)
                setLoanApplication(response.data.loan_applications || [])
                setActiveLoans(response.data.active_loans|| [])
            } catch (error) {
                
            }
        }
        if(userId){
            get_loan_applications()
        }
       
    },[userId])
    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )
    const options = {
        responsive:true,
        plugins:{
            legend:{
                position:"top",
            },
            title:{
                display:true,
                text:"Loan Statistics",
            },
        }
    }
    const labels = ['Loan Applications', 'Active Loans', 'Loan Payments']
    const loanApplicationData = {
        labels: ['Loan Applications'],
        datasets: [
            {
                label: 'Loan Application',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [LoanApplications.length]
            }
        ]
    };
    const activeLoansData = {
        labels: ['Active Loans'],
        datasets: [
            {
                label: 'Active Loans',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [activeLoans.length]
            }
        ]
    };
    const graphContainerStyle = {
        display: 'flex'
    };

    const graphStyle = {
        flex: '1',
        margin: '0 10px' 
    };
    const style = {
        display:"flex"
    }

  return (
    <div className="app-container">
        <Navigation/>
        <div className="dashboard-body">
            <div className="dashboard-overview ">
                <div className="dashboard-card">
                    <span>Loan Applications</span>
                    {LoanApplications.length}
                </div>
                <div className="dashboard-card">
                    <span>Active Loans</span>
                    {activeLoans.length}
                </div>
                <div className="dashboard-card">
                    <span>Loan Payments</span>
                    {loanPayments.length}
                </div>
            </div>
            <div className="loan-overview">
            </div>
            <div className="loan-statistics" >
                <div className="graph">
                    <Bar
                        data={loanApplicationData}
                        options={options}
                    />
                </div>
                <div className="graph" >
                    <Bar
                        data={activeLoansData}
                        options={options}
                    />
                </div>
                <div className="active-loan-short">
                    {activeLoans.length > 0 ?
                        activeLoans.map((current, index)=>(
                            <div key={index} className='loan-table'>
                                <table>
                                    <th>Current people with Loans in due</th>
                                    <tr>
                                        <td>Name</td>
                                        <td>Amount</td>
                                        <td>Date of Payment</td>
                                    </tr>
                                    <tr>
                                       <td>{current.beneficiary_id}</td> 
                                       <td>{current.amount}</td> 
                                       <td>{current.date_disbursed}</td> 
                                    </tr>
        
                                </table>
                            </div>
                        )) :( 
                            <div>
                                <span>No one has loan</span>
                            </div>
                        )
                    }
                </div>
                </div>
        </div>
    </div>
  )
}

export default Loan
















