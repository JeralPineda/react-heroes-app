import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router';
import { heroImages } from '../../helpers/heroImages';
import { getHeroById } from '../../selectors/getHeroById';

// import batman from '../../assets/heroes/dc-batman.jpg'; // estático
// const heroImages = require.context('../../assets/heroes', true); //webpack

export const HeroScreen = ({ history }) => {
   const { heroeId } = useParams();

   const hero = useMemo(() => getHeroById(heroeId), [heroeId]);

   //    const hero = getHeroById(heroeId);

   if (!hero) {
      return <Redirect to='/' />;
   }

   const handleReturn = () => {
      if (history.length <= 2) {
         hero.publisher === 'Marvel Comics' && history.push('/');
         hero.publisher === 'DC Comics' && history.push('/dc');
      } else {
         history.goBack();
      }
   };

   const { superhero, publisher, alter_ego, first_appearance, characters } = hero;

   return (
      <div className='row  mt-5'>
         <div className='col-4'>
            <img
               // src={`../heroes/${heroeId}.jpg`} // desde public/assets
               // src={ batman } // import
               src={heroImages(`./${heroeId}.jpg`).default}
               alt={superhero}
               className='img-thumbnail animate__animated animate__backInLeft'
            />
         </div>

         <div className='col-8'>
            <h3>{superhero}</h3>
            <ul className='list-group list-group-flush'>
               <li className='list-group-item color-screen'>
                  <b>Alter ego: </b>
                  {alter_ego}
               </li>
               <li className='list-group-item color-screen'>
                  <b>Publisher: </b>
                  {publisher}
               </li>
               <li className='list-group-item color-screen'>
                  <b>First apparance: </b>
                  {first_appearance}
               </li>
            </ul>

            <h5 className='mt-2'>Characters: </h5>
            <p>{characters}</p>

            <button onClick={handleReturn} className='btn btn-secondary'>
               Return
            </button>
         </div>
      </div>
   );
};
