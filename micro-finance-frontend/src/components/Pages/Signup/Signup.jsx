import axios from 'axios'
import React, { useState } from 'react'
import { SIGNUP_URL } from '../../../Api'
import { Link, useNavigate } from 'react-router-dom'
import "./signup.css"
const Signup = () => {
    const navigate = useNavigate() 
    const [Signup, setSignup] =  useState({
        username:"",
        password:"",
        pswd: "",
        email : "",
    })
    const [formErrors, setFormErrors] = useState("")
     const handleFormChange = (e) =>{
        setSignup((prev)=>({
            ...prev,
             [e.target.name] : e.target.value
            }))
     }
     const handleFormSubmit = async (e) =>{
        e.preventDefault();
        if(Signup.password !== Signup.pswd){
            setFormErrors("Password doesn't match")
        }
        else{
            try {
                const response = await axios.post(SIGNUP_URL, {
                    username: Signup.username,
                    email:  Signup.email,
                    password: Signup.password
                },
                {headers:{
                    "Content-Type": "application/json"
                },
            })
            if (response.status === 201){
                 setFormErrors(response.data.message)  
            }
            else{
                 setFormErrors(response.data.message)
            }

            } catch (error) {
            console.log("catched error" + error)  
            }
        }
     }
  return (
    <div>   
        <div className="form-container">
            <form onSubmit={handleFormSubmit}>
                {formErrors && <p className="error-msg">{formErrors}</p>}
                <label className="label" htmlFor="username">Username:</label>
                <input className="input-field" type='text' name='username' value={Signup.username} onChange={handleFormChange} required />
                <label className="label" htmlFor="email">Email:</label>
                <input className="input-field" type='email' name='email' value={Signup.email} onChange={handleFormChange} required />
                <label className="label" htmlFor="password">Password:</label>
                <input className="input-field" type='password' name='password' value={Signup.password} onChange={handleFormChange} required />
                <label className="label" htmlFor="confirmPassword">Confirm Password:</label>
                <input className="input-field" type='password' name='pswd' value={Signup.pswd} onChange={handleFormChange} required />
                <button className="submit-btn" type='submit'>Register</button>
                <p> Already have an account? <Link to ="/">Signup now</Link></p> 
            </form>
        </div>
    </div>
  )
}

export default Signup;