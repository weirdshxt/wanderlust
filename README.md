
# Wanderlust Backend Project

## Overview
Wanderlust is a platform that allows users to explore and manage listings for various travel experiences. This backend application is built with Node.js and Express, providing a robust API for handling user authentication, listings, and reviews.

## Features
- **User Authentication**: Secure registration and login using Passport.js.
- **Listings Management**: Create, read, update, and delete listings with ease.
- **Review System**: Users can leave reviews for listings, enhancing community feedback.
- **Session Management**: Utilizes express-session and connect-mongo for session handling.
- **Flash Messages**: Provides user feedback for actions like login success or errors.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   ATLASDB_URL=<your-mongodb-connection-string>
   ```

## Usage
1. Start the server:
   ```bash
   node app.js
   ```

2. Open your browser and navigate to `http://localhost:8080` to access the application.

3. Use Postman or any API client to interact with the endpoints:
   - **GET /listings**: Retrieve all listings
   - **POST /signup**: Register a new user
   - **POST /login**: Authenticate a user

## Dependencies
- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling tool
- **EJS**: Templating engine for rendering views
- **Passport**: Authentication middleware
- **Connect-flash**: Flash messages for user feedback
- **Connect-mongo**: MongoDB session store
- **Method-override**: Support for HTTP verbs such as PUT or DELETE
- **dotenv**: Environment variable management

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## Author
**Kabir Khan**

## License
This project is licensed under the ISC License.

## Acknowledgments
- Thanks to [MongoDB](https://www.mongodb.com/) for providing a powerful database solution.
