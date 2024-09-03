const restaurantRow = (restaurant) => {
  const {name, address} = restaurant;
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${name}</td>
    <td>${address}</td>
  `;
  return row;
};

const restaurantModal = (restaurant, menu) => {
  const {name, address, company, postalCode, city, phone} = restaurant;
  let menuHTML = '';
  for (const course of menu.courses) {
    const {name, price, diets} = course;
    menuHTML += `<li>
                  <h4>Course: ${name}</h4>
                  <p><i>Price: </i>${price || 'No price available'}</p>
                  <p><i>Allergens: </i> ${diets || 'No allergens listed'}</p>
                </li>
              `;
  }
  const restaurantHTML = `
    <header>
      <h3>${name}</h3>
      <p>${company}</p>
    </header>
    <address>
        ${address}<br>
        ${postalCode} ${city}<br>
        ${phone && phone.trim() !== '-' ? phone : 'No phone number'}<br>
    </address>
    <div>
      <h3>Today's Menu</h3>
      <ul>
        ${menuHTML || 'No menu available today'}
      </ul>
    </div>
  `;
  return restaurantHTML;
};

export { restaurantRow, restaurantModal };
