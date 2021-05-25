import React, { useMemo } from 'react';
import queryString from 'query-string';

import { useLocation } from 'react-router';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';

import './search.css';

export const SearchScreen = ({ history }) => {
   // obtener la location desde los componentes(url)
   const location = useLocation();
   const { q = '' } = queryString.parse(location.search);

   const [formValues, handleInputChange] = useForm({
      searchHero: q,
   });

   const { searchHero } = formValues;

   const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

   //    Filtro de búsqueda
   const handleSearch = (e) => {
      e.preventDefault();

      //   query de busqueda
      history.push(`?q=${searchHero}`);
   };

   return (
      <div>
         <h1>Search Screen</h1>
         <hr />

         <div className='row'>
            <div className='col-5'>
               <h4>Search Form</h4>
               <hr />

               <form onSubmit={handleSearch}>
                  <input className='form-control defaultInput' type='text' placeholder='Busca tu héroe' autoComplete='off' name='searchHero' value={searchHero} onChange={handleInputChange} />
               </form>

               <button type='submit' className='btn m-1 btn-block btn-outline-secondary' onClick={handleSearch}>
                  Buscar...
               </button>
            </div>

            <div className='col-7'>
               <h4>Results</h4>
               <hr />
               {/* no mostrar caja de cards si esta vacio el input */}

               {q === '' && <div className='alert alert-info'>Busca un heroe</div>}

               {q !== '' && heroesFiltered.length === 0 && <div className='alert alert-danger'>No hay un héroe con {q}</div>}

               {heroesFiltered.map((hero) => (
                  <HeroCard key={hero.id} {...hero} />
               ))}
            </div>
         </div>
      </div>
   );
};
