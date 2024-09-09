/* 1. In this assignment, your objective is to finalize the restaurant app by incorporating modular components, arrow functions, special operators, and applying destructuring where appropriate. You'll be enhancing the existing codebase to create a more organized, maintainable, and efficient application. */

import { fetchData } from './utils.js';
import { restaurantModal } from './components.js';
import { restaurantRow } from './components.js';
import { apiURL } from './variables.js';

'use strict';

const body = document.querySelector('body')
const target = document.querySelector('tbody');
const modal = document.querySelector('dialog');
const info = document.querySelector('#info');
const closeModal = document.querySelector('#close-modal');
const sodexoButton = document.querySelector('#sodexo');
const compassButton = document.querySelector('#compass');
const resetButton = document.querySelector('#reset');

let restaurants = [];

closeModal.addEventListener('click', () => {
  modal.close();
});

// Fetching restaurant data
const fetchRestaurants = async () => {
  return await fetchData(apiURL + '/api/v1/restaurants');
};

const listRestaurants = async (restaurants) => {
  try {
    console.log(restaurants);

    target.innerHTML = '';

    sodexoButton.addEventListener('click', () => {
      const filteredRestaurants = restaurants.filter(
        ({company}) => company === 'Sodexo'
      );
      listRestaurants(filteredRestaurants);
    });

    compassButton.addEventListener('click', () => {
      const filteredRestaurants = restaurants.filter(
        ({company}) => company === 'Compass Group'
      );
      listRestaurants(filteredRestaurants);
    });

    resetButton.addEventListener('click', () => {
      restaurants = [];
      listRestaurants(restaurants);
    });

    restaurants.sort((a, b) => a.name.localeCompare(b.name));

    restaurants.forEach(restaurant => {
      if (restaurant) {
        const {_id} = restaurant;
        const row = restaurantRow(restaurant);

        row.addEventListener('click', async () => {
          try {
            modal.showModal();
            info.innerHTML = '<div>Fetching...</div>';

            const highlights = document.querySelectorAll('.highlight');
            highlights.forEach((highligted) => {
              highligted.classList.remove('highlight');
            });

            row.classList.add('highlight');
            // fetch menu data
            const menu = await fetchData(
              `${apiURL}/api/v1/restaurants/daily/${_id}/en`
            );

            console.log('Todays menu', menu.courses);

            const restaurantHTML = restaurantModal(
              restaurant,
              menu
            );
            info.innerHTML = '';
            info.insertAdjacentHTML('beforeend', restaurantHTML);
          } catch (error) {
            console.error(error);
          }
        });
        target.append(row);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

try {
  restaurants = await fetchRestaurants();
  listRestaurants(restaurants);
} catch (error) {
  const errorTarget = document.createElement('div');
  errorTarget.classList.add('error');
  const errorMessage = document.createElement('h2').textContent = 'Error fetching restaurant data';
  errorTarget.append(errorMessage)
  body.append(errorTarget)

  console.error(error);
}

