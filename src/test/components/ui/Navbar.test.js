import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { MemoryRouter, Router } from 'react-router';
import { types } from '../../../types/types';

describe('Pruebas en <Navbar />', () => {
   // Evaluar customHook
   const historyMock = {
      push: jest.fn(),
      replace: jest.fn(),
      location: {},
      listen: jest.fn(),
      createHref: jest.fn(),
   };

   const contextValue = {
      dispatch: jest.fn(),
      user: {
         logged: true,
         name: 'Cris',
      },
   };

   const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
         <MemoryRouter>
            <Router history={historyMock}>
               <Navbar />
            </Router>
         </MemoryRouter>
      </AuthContext.Provider>
   );

   //    Siempre que se haga un mock es bueno limpiarlo
   afterEach(() => {
      jest.clearAllMocks();
   });

   test('debe de mostrarse correctamente', () => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('.text-info').text().trim()).toBe('Cris');
   });

   test('debe de llamar el logout y usar el history', () => {
      wrapper.find('button').prop('onClick')();

      expect(contextValue.dispatch).toHaveBeenCalledWith({
         type: types.logout,
      });

      expect(historyMock.replace).toHaveBeenCalledWith('/login');
   });
});
