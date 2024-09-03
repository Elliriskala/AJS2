/* 1. In this assignment, your objective is to finalize the restaurant app by incorporating modular components, arrow functions, special operators, and applying destructuring where appropriate. You'll be enhancing the existing codebase to create a more organized, maintainable, and efficient application. */

import { fetchData } from './utils.js';
import { restaurantModal } from './components.js';
import { restaurantRow } from './components.js';
import { apiURL } from './variables.js';

'use strict';

const target = document.querySelector('tbody');
const modal = document.querySelector('dialog');
const closeModal = document.querySelector('#close-modal');

closeModal.addEventListener('click', () => {
  modal.close();
});

// Fetching restaurant data
const listRestaurants = async () => {
  try {
    const restaurants = await fetchData(apiURL + '/api/v1/restaurants');

    const filteredRestaurants = restaurants.filter( ({company}) => company === 'Sodexo' || company === 'Compass Group');

    filteredRestaurants.sort((a, b) => a.name.localeCompare(b.name));
    console.log(restaurants);

    filteredRestaurants.forEach(restaurant => {
      const row = restaurantRow(restaurant);

      row.addEventListener('click', async () => {
        // fetch menu data
        const menu = await fetchData(`${apiURL}/api/v1/restaurants/daily/${restaurant._id}/en`);

        const highlights = document.querySelectorAll('.highlight');
        for (const highligted of highlights) {
          highligted.classList.remove('highlight');
        }
        row.classList.add('highlight');
        modal.showModal();

        document.querySelector('#info').innerHTML = restaurantModal(restaurant, menu);
      });
      target.append(row);
    });
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
  }
}

listRestaurants();
