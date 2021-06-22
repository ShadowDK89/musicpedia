import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'


const Navbar = () => {
    const mobileMenuIcon = <FontAwesomeIcon icon={faBars} size="lg"></FontAwesomeIcon>
    const [showLinks, setShowLinks] = useState(false);
    const [triggerNavTrans, setTriggerNavTrans] = useState('');
    const [navBackground, setNavBackground] = useState('');

    function setAnimation() {
        
        if(!showLinks){
            setTriggerNavTrans('show-links-background');
            setNavBackground('show-links');
            setShowLinks(true);
        } else {
            setTriggerNavTrans('hide-links-background');
            setNavBackground('hide-links');
            setShowLinks(false);
        }
    }

    return (
        <nav>
            <div className="nav-mobile-icon" onClick={setAnimation}>
                {mobileMenuIcon}
            </div>
            <div id="nav-grayed-background" className={`${triggerNavTrans}`} onClick={setAnimation}>
                <div id="nav-links" className={`${navBackground}`}>
                    <div className="links-container">
                        <ul className="ul-layout">
                            <li className="nav-link">
                                <Link to="/" onClick={setAnimation}>Home Page</Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/profile" onClick={setAnimation}>Profile</Link>
                            </li>
                            <li className="nav-link">
                                <Link to="/login" onClick={setAnimation}>Log In</Link>
                            </li>
                            <li className="close-nav">
                                <div></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;