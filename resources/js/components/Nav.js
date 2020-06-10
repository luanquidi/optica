import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return ( 
        <Fragment>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        Óptica <i className="fas fa-glasses"></i>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        
                        <ul className="navbar-nav mr-auto">

                        </ul>

                        <ul className="navbar-nav ml-auto">
                         
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-primary" to="/home">Home</NavLink>
                            </li>
                            
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="text-primary" to="/users">Usuarios</NavLink>
                            </li>
                               
                            {/* @else
                                <li className="nav-item dropdown">
                                    <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        {{ Auth::user()->name }} <span className="caret"></span>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                                        document.getElementById('logout-form').submit();">
                                            {{ __('Logout') }}
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            @csrf
                                        </form>
                                    </div>
                                </li>
                            @endguest */}
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}
 
export default Nav;