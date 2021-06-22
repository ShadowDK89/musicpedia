import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import './Profile.scss'

function Profile() {
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('');
    const history = useHistory();
    

    async function handleLogout(){
        setError('');

        try {
            await logout();
            history.push('/login');
        } catch (error) {
            setError('Failed to log out');
        }
    }

    return (
        <div className="profile">
            <div className="profile-container">
                <div className="profile-info">
                <h2>Profile</h2>
                {error && {error}}
                <div>
                    <strong>Email: </strong> <span>{currentUser.email}</span>
                </div>
                <Link to="/update-profile">Update Profile</Link>
                </div>
                
            </div>
            <div className="logout-btn">
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Profile
