import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

import './login.css';

export const LoginScreen = ({ history }) => {
   const { dispatch } = useContext(AuthContext);

   const handleLogin = () => {
      // Navegamos a otra pantalla
      //   history.push('/');

      //   Disparar acción
      dispatch({
         type: types.login,
         payload: {
            name: 'Jeral',
         },
      });

      history.replace('/'); //remplaza en la historia
   };

   return (
      <div className='container p-5'>
         <div className='row rounded-lg ali'>
            <div className='col-md-4 mx-auto'>
               <div className='card fondo text-center color'>
                  <div className='card-header'>
                     <h3>Heroes App</h3>
                  </div>
                  <img src='./logo192.png' alt='Logo App' className='card-img-top mx-auto m-2 rounded-circle w-50' />
                  <div className='card-body'>
                     <div className='d-flex justify-content-center mb-2'>
                        <button onClick={handleLogin} className='btn btn-secondary'>
                           LogIn
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
