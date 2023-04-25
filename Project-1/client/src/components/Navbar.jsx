import React from 'react'
import '../styles/Navbar.css'
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className='navbar'>
                <NavLink to='/' className='logo' >
                    <div>AnuragGupta</div>
                </NavLink>
                <div className="nav-links">
                    <ul>
                        <li>
                            <NavLink exact className='nav-link' activeClassName="active" to="/about">about</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="buttonSection">
                    <button className="button">Login</button>
                    <button className="button">Sign Up</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar