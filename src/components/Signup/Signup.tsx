import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Signup.scss'

function Signup() {
    let defaultInput = {
        email: '',
        password: '',
        passwordConfirm: ''
    }
    const [userInput, setUserInput] = useState(defaultInput);
    const { signup } = useAuth()
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e:FormEvent <HTMLFormElement>){
        e.preventDefault();
        
        if(userInput.password !== userInput.passwordConfirm){
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(userInput.email, userInput.password);
            history.push('/');            
        } catch (error) {
            setError('Failed to sign up');
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
        <div className="signup">
            <div className="signup-container">
                <h2>Sign Up</h2>
                {error && <div className="error-msg"><span>{error}</span></div>}
                <form onSubmit={handleSubmit} className="signup-form">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={updateInput} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={updateInput} required />
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input type="password" id="passwordConfirm" onChange={updateInput} required />
                    <button disabled={loading} className="" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
            <div className="have-account">
               <span>Already have an account?</span> <Link to="/login">Log In</Link>
            </div>
        </div>
    )
}

export default Signup
