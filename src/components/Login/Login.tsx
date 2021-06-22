import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.scss'

function Login() {
    let defaultInput = {
        email: '',
        password: '',
    }
    const [userInput, setUserInput] = useState(defaultInput);
    const { login } = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e:FormEvent <HTMLFormElement>){
        e.preventDefault()
        
        try {
            setError('');
            setLoading(true);
            await login(userInput.email, userInput.password);
            history.push('/');            
        } catch (error) {
            setError('Failed to sign in');
        }
        setLoading(false);
    }

    function updateInput(e:ChangeEvent <HTMLInputElement>){
        let value = e.target.value;
        let type = e.target.id;

        if(value !== undefined && type !== undefined){
            setUserInput({...userInput,[type]:value});            
        }
    }


    return (
        <div className="login">
            <div className="login-container">
                <h2 className="">Log In</h2>
                {error && <div className="error-msg"><span>{error}</span></div>}
                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={updateInput} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={updateInput} required />
                    <button disabled={loading} className="" type="submit">
                        Log In
                    </button>
                </form>
                <div className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </div>
            <div className="need-account">
               <span>Need an account?</span> <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}

export default Login
