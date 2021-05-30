import { mount } from 'enzyme';
import React from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {
   const history = {
      replace: jest.fn(),
   };

   const contextValue = {
      dispatch: jest.fn(),
      user: {
         logged: true,
      },
   };

   const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
         <LoginScreen history={history} />
      </AuthContext.Provider>
   );

   test('debe de mostrarse correctamente', () => {
      expect(wrapper).toMatchSnapshot();
   });

   test('debe de realizar el dispatch y la navegación', () => {
      const handleClick = wrapper.find('button').prop('onClick');

      handleClick();
      expect(contextValue.dispatch).toHaveBeenCalledWith({
         type: types.login,
         payload: {
            name: 'Jeral',
         },
      });

      expect(history.replace).toHaveBeenCalledWith('/');

      //   Simular que grabamos algo en localstorage
      localStorage.setItem('lastPath', '/dc');
      handleClick();
      expect(history.replace).toHaveBeenCalledWith('/dc');
   });
});
