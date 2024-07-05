import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { LOGIN_URL } from '../../../Api';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const [loginData, setLoginData] = useState({
        username:"",
        password:""
    })
    const navigate = useNavigate()
    const [formErrors, setFormErrors]  = useState("")
    const onFormInputChange=(e)=>{
        setLoginData((prev)=>({
               ...prev,
               [e.target.name] :e.target.value
        }))
    }
    const  handleFormSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, {
                username: loginData.username,
                password: loginData.password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.status ==200) {
                const responseData = response.data[0];
                console.log("User data:", responseData.user);
                sessionStorage.setItem('user', JSON.stringify(responseData.user));
                setFormErrors("")
                navigate("/home")
            } 
            else {
                setFormErrors(response.data.detail)
            }
        } catch (error) {
            console.error('Error occurred during login:', error);
        }
    }
  return (
    <div className='form-container'>
        <div className='login-form'>
         <form onSubmit={handleFormSubmit}>
           <p className='label'>  Username:  </p> 
            <input type="text" className='input-field' value={loginData.username} onChange={onFormInputChange} name ="username" id="username" required/> <br/><br/>
            <p className='label'>  Password:  </p>  
            <input type="password" className="input-field" value={loginData.password} onChange={onFormInputChange} name='password' id="password" required/><br/><br/>
            {formErrors && <span className="error-msg" >{formErrors}</span>}
            <input type='submit' value ="Login" className= "submit-btn" />
         </form>
           <p> You dont have an account? <Link to ="/signup">Signup now</Link></p> 
        </div>
    </div>
  )
}

export default Login;