import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen />', () => {
   test('debe de mostrarse correctamente con valores por defecto', () => {
      const wrapper = mount(
         <MemoryRouter initialEntries={['/search']}>
            <Route path='/search' component={SearchScreen} />
         </MemoryRouter>
      );

      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('.alert-info').text().trim()).toBe('Busca un heroe');
   });

   test('debe de mostrar a Flash y el input con el valor del queryString', () => {
      const wrapper = mount(
         <MemoryRouter initialEntries={['/search?q=flash']}>
            <Route path='/search' component={SearchScreen} />
         </MemoryRouter>
      );

      expect(wrapper.find('input').prop('value')).toBe('flash');
      expect(wrapper).toMatchSnapshot();
   });

   test('debe de mostrar un error si no se muestra el Hero', () => {
      const wrapper = mount(
         <MemoryRouter initialEntries={['/search?q=flash123']}>
            <Route path='/search' component={SearchScreen} />
         </MemoryRouter>
      );

      expect(wrapper.find('.alert-danger').text().trim()).toBe(`No hay un héroe con flash123`);
      expect(wrapper).toMatchSnapshot();
   });

   test('debe de llamar el push del history', () => {
      const history = {
         push: jest.fn(),
      };

      const wrapper = mount(
         <MemoryRouter initialEntries={['/search?q=flash123']}>
            <Route path='/search' component={() => <SearchScreen history={history} />} />
         </MemoryRouter>
      );

      //   Simulación cambio en la caja de texto
      wrapper.find('input').simulate('change', {
         target: {
            name: 'searchHero',
            value: 'flash',
         },
      });

      //   Simulación del formulario
      wrapper.find('form').prop('onSubmit')({
         preventDefault() {},
      });

      expect(history.push).toHaveBeenCalledWith(`?q=flash`);
   });
});
