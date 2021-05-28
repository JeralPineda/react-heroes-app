import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

import './navbar.css';

export const Navbar = () => {
   // Extraer la información del usuario logeado
   const {
      user: { name },
      dispatch,
   } = useContext(AuthContext);

   const history = useHistory();

   //    Cerrar sesión
   const handleLogout = () => {
      history.replace('/login');

      dispatch({
         type: types.logout,
      });
   };

   return (
      <nav className='navbar navbar-expand-sm navbar-light bg-light'>
         <Link className='navbar-brand' to='/'>
            Asociaciones
         </Link>

         <div className='navbar-collapse'>
            <div className='navbar-nav'>
               <NavLink activeClassName='active' className='nav-item nav-link' exact to='/marvel'>
                  Marvel
               </NavLink>

               <NavLink activeClassName='active' className='nav-item nav-link' exact to='/dc'>
                  DC
               </NavLink>

               <NavLink activeClassName='active' className='nav-item nav-link' exact to='/search'>
                  Search
               </NavLink>
            </div>
         </div>

         <div className='navbar-collapse collapse w-100 order-3 dual-collapse2'>
            <ul className='navbar-nav ml-auto'>
               <span className='nav-item nav-link text-info'>{name}</span>

               <button onClick={handleLogout} className='nav-item nav-link btn btn-light'>
                  Logout
               </button>
            </ul>
         </div>
      </nav>
   );
};
