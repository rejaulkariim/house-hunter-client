## House Hunter - Simplifying House Rentals

House Hunter is a delightful platform built using Node.js, React.js, and MongoDB, designed to simplify the house rental process. It serves as a bridge between house owners and house renters, making it easy for owners to list their properties and for renters to find their dream homes.

### Features

1. **User Registration and Authentication**
   - Users can register with their full name, role (House Owner or House Renter), phone number, email, and password.
   - Custom authentication using JSON Web Tokens (JWT) and MongoDB to handle user registration and login.

2. **House Owner Dashboard**
   - House Owners have access to a dashboard to manage their listed houses and bookings.
   - Owners can view a list of houses they own and add new houses by providing detailed information.
   - The "Add New House" button opens a form/modal for adding house information.
   - The dashboard displays the owned houses in a table with options to delete or edit each house.

3. **House Renter Dashboard**
   - House Renters have their unique dashboard to manage their bookings.
   - Renters can book houses by providing their name, email, and phone number.
   - The dashboard shows booked houses, allowing renters to view their current bookings.
   - House renters can book a maximum of two houses and can remove booked houses to free up space for new bookings.

4. **Home Page and House Search**
   - The home page displays all the listed houses.
   - Anyone can search for houses, but only logged-in House Renters can book houses.
   - Users can filter houses by city, bedrooms, bathrooms, room size, availability, and rent per month (using a range selector).
   - Server-side pagination/infinite scroll is implemented to fetch data in batches.

### Tools and Technologies

- Node.js
- React.js
- MongoDB

### Installation

1. Clone the repository.
2. Install the required dependencies using `npm install`.
3. Set up the MongoDB database and provide the connection details in the configuration file.

### How to Run

1. Run the backend server using `npm run start` in the backend directory.
2. Run the frontend using `npm run start` in the frontend directory.
3. Access the application in your browser at `http://localhost:3000`.

### Conclusion

House Hunter simplifies the house rental process by providing a user-friendly platform for house owners and renters. With features like user registration, custom authentication, owner and renter dashboards, and house search functionality, finding and booking rental houses has never been easier. The powerful combination of Node.js, React.js, and MongoDB ensures a seamless and efficient experience for all users.
