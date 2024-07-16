import { UserMsg } from './UserMsg.jsx'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export function AppHeader() {






    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React toy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >toys</NavLink>

                </nav>
            </section>

            <UserMsg />
        </header>
    )
}
