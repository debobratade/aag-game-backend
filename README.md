# aag-game-backend

### Project Overview

**TOURNAMENT-LEAGUE** is a comprehensive web application designed to manage and facilitate sports leagues and tournaments. The application provides a platform for users to create team, manage, and participate in various leagues and tournaments. It aims to streamline the process of organizing sports events by offering features like user authentication, league creation, tournament management, team management, and match scheduling.

Key features of the project include:

- **League Management**: Users can participate and manage in multiple leagues, each with its own set of teams and matches. The application allows for detailed league information, including entry fees and timelines.
- **Tournament Management**: Users can enter their teams into any tournaments. The application supports various tournament formats and provides tools for scheduling and managing matches.
- **User Authentication**: The application includes robust user authentication mechanisms, including traditional signup/signin methods as well as OAuth integration with platforms like Facebook and Google.
- **Team and Match Management**: Users can create and manage teams, and the application facilitates scheduling matches between teams. Match results can be updated, and the status of matches can be tracked.
- **Subscription and Notification**: The application offers subscription features where users can subscribe to different plans for accessing premium features. Notifications and updates are provided to keep users informed about their teams and matches.

The project is built using modern web technologies, ensuring a scalable and maintainable codebase.

# TOURNAMENT-LEAGUE

## Project Overview

**TOURNAMENT-LEAGUE** is a comprehensive web application designed to manage and facilitate sports leagues and tournaments. The application provides a platform for users to create, manage, and participate in various leagues and tournaments. It aims to streamline the process of organizing sports events by offering features like user authentication, league creation, tournament management, team management, and match scheduling.

**Key features of the project include:**

- **League Management**: Users can create and manage multiple leagues, each with its own set of teams and matches. The application allows for detailed league information, including entry fees and timelines.
- **Tournament Management**: Tournaments can be created within leagues, and users can enter their teams into these tournaments. The application supports various tournament formats and provides tools for scheduling and managing matches.
- **User Authentication**: The application includes robust user authentication mechanisms, including traditional signup/signin methods as well as OAuth integration with platforms like Facebook and Google.
- **Team and Match Management**: Users can create and manage teams, and the application facilitates scheduling matches between teams. Match results can be updated, and the status of matches can be tracked.
- **Subscription and Notification**: The application offers subscription features where users can subscribe to different plans for accessing premium features. Notifications and updates are provided to keep users informed about their teams and matches.

## Installation

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/en/download/) (version 14.x or higher)
- [npm](https://www.npmjs.com/get-npm) (version 6.x or higher)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/debobratade/aag-game-backend
   ```

2. **Navigate to the project directory**

   ```bash
   cd your-repo-name
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the build**

   ```bash
   npm run build
   ```

5. **Start the server**

   ```bash
   npm start
   ```

6. **Access the application**
   Open your web browser and navigate to `http://localhost:3000` to access the application.

### Environment Variables

Make sure to set up the necessary environment variables. You can insert necessary Environment variables in `.env` file in the root directory and add the following variables:

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgres://your-username:your-password@localhost:5432/your-database-name
JWT_SECRET=your-jwt-secret
```

## Technologies Used

### Core Technologies

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, which is used for building fast and scalable server-side applications. The project uses Node.js to handle server-side logic, including API requests and responses.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. Express is used to create and manage the server, define API routes, and handle middleware functions.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. TypeScript is used to provide type safety, enhance code quality, and improve development efficiency.

- **PostgreSQL**: A powerful, open-source object-relational database system. PostgreSQL is used as the main database for storing and retrieving data related to leagues, tournaments, users, and matches.

- **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication, and more. Sequelize is used to interact with the PostgreSQL database in an object-oriented manner.

### Authentication and Security

- **bcryptjs**: A library to help you hash passwords. bcryptjs is used to hash user passwords before storing them in the database, ensuring secure password management.
- **jsonwebtoken**: A library to generate and verify JSON Web Tokens (JWT). JWT is used for user authentication, allowing secure communication between the client and the server.

- **passport**: An authentication middleware for Node.js. Passport is used to handle different authentication strategies, including local authentication and OAuth.

- **passport-apple**, **passport-facebook**, **passport-google-oauth20**: These are Passport strategies for integrating OAuth authentication with Apple, Facebook, and Google, respectively. They are used to enable users to log in using their social media accounts.

### Development Tools

- **nodemon**: A utility that will monitor for any changes in your source code and automatically restart your server. It is used to improve development efficiency by providing live-reload functionality.

- **ts-node**: A TypeScript execution environment for Node.js. It is used to run TypeScript directly without the need for pre-compilation, enhancing the development workflow.

- **jest**: A delightful JavaScript testing framework with a focus on simplicity. Jest is used for writing and running unit tests to ensure code quality and reliability.

- **supertest**: A library for testing Node.js HTTP servers. It is used in conjunction with Jest to perform integration tests on the API endpoints.

### Additional Tools and Libraries

- **axios**: A promise-based HTTP client for the browser and Node.js. Axios is used for making HTTP requests to external APIs and services.

- **cors**: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. cors is used to handle cross-origin resource sharing, allowing the API to be accessible from different origins.

- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`. dotenv is used to manage environment-specific configurations and keep sensitive information secure.

- **morgan**: HTTP request logger middleware for Node.js. Morgan is used to log incoming requests and responses, aiding in debugging and monitoring.

- **joi**: A powerful schema description language and data validator for JavaScript objects. Joi is used to validate request payloads to ensure they meet the defined schemas, enhancing the robustness and security of the API by preventing invalid data from being processed.

---

By using these technologies, the project ensures robust performance, security, and scalability. Each technology was chosen to address specific needs and improve the overall development experience and end-user experience.

---

---

## How the Project Works

### Leagues

Leagues and Tournament are a fundamental part of the **AAG-TOURNAMENT-LEAGUE** application. They serve as the umbrella under which league & tournaments are organized and managed.

- **Creating a League**: Admin can create a new league by providing details such as the league name, entry fee, start time, and end time. This is handled via the `leagueController`.
- **Managing Leagues**: Once created, leagues can be updated or deleted. Users can view all leagues or get details about a specific league and can take entry by using the appropriate API endpoints.
- **League Information**: Each league contains comprehensive information, including the teams participating, matches scheduled, and other relevant details.

### Tournaments

Tournaments are hosted as the main events where teams compete against each other.

- **Creating a Tournament**: Admin can create tournaments. Tournaments include details like the tournament name, description, entry fee, start and end times, and prize distribution.
- **Managing Tournaments**: Tournaments can be updated or deleted as necessary by Admin. Users can view all tournaments within a league or get details about a specific tournament.
- **Tournament Entries**: Teams can enter tournaments by paying the entry fee, and the application manages the list of entries for each tournament.

### Entries

Entries refer to the teams or users that participate in a specific tournament.

- **Entering Tournaments**: Users can enter their teams into tournaments by submitting an entry. This is managed by the `entryController`.
- **Managing Entries**: The status of entries can be updated (e.g., pending, confirmed, or rejected). Users can view all their entries and get detailed information about each entry.
- **Entry Status**: The application keeps track of the status of each entry, ensuring that only confirmed teams participate in the tournaments.

### Matches

Matches are the individual games played between teams within a tournament.

- **Creating Matches**: Matches are scheduled between teams, including details like the start and end times. Matches can be created automatically through the matchmaking process by administrators.
- **Updating Match Results**: After matches are played, results can be updated to reflect the outcome. This includes recording the winning team and updating the status of the match to "Completed".
- **Match Management**: The application allows for detailed management of matches, including viewing match details, updating match results, and tracking the status of each match.

---

## Api Documentation

### Subscription API

### API documentation for the `addSubscription` function:

#### POST /api/subscriptions

**Description**: This API endpoint is used to add a new subscription plan by Admin.

**Request**:

- **URL**: `/api/subscriptions`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "string",
    "features": "string",
    "price": "number"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "message": "Subscription plan added successfully!",
      "subscription": {
        "id": "number",
        "name": "string",
        "features": "string",
        "price": "number",
        "createdAt": "date-time",
        "updatedAt": "date-time"
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "A subscription plan with this name already exists."
    }
    ```

    ```json
    {
      "message": "Validation error message"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "An error occurred while adding the subscription plan."
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/subscriptions
  {
    "name": "Premium Plan",
    "features": "Access to all premium content, priority support",
    "price": 29.99
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "Subscription plan added successfully!",
    "subscription": {
      "id": 1,
      "name": "Premium Plan",
      "features": "Access to all premium content, priority support",
      "price": 29.99,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

- **Error Response**:
  ```json
  {
    "message": "A subscription plan with this name already exists."
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `subscriptionSchemaToCreate` from `subscriptionsValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error message.
- **Check Existing Subscription**: The subscription name is checked to see if it already exists. If it does, a `400 Bad Request` response is returned with an appropriate message.
- **Create Subscription**: If validation passes and the subscription name is not already used, a new subscription is created in the `Subscription` model.
- **Return Response**: If the subscription is successfully created, a `201 Created` response is returned with the new subscription details and a success message.

### API documentation for the `getSubscriptions` function:

#### GET /api/subscriptions

**Description**: This API endpoint retrieves a list of all subscription plans.

**Request**:

- **URL**: `/api/subscriptions`
- **Method**: `GET`

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": "number",
        "name": "string",
        "features": "string",
        "price": "number",
        "createdAt": "date-time",
        "updatedAt": "date-time"
      }
    ]
    ```

- **Error Response**:
  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "An error occurred while fetching subscriptions."
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/subscriptions
  ```

- **Success Response**:

  ```json
  [
    {
      "id": 1,
      "name": "Premium Plan",
      "features": "Access to all premium content, priority support",
      "price": 29.99,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": 2,
      "name": "Basic Plan",
      "features": "Access to basic content",
      "price": 9.99,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

- **Error Response**:
  ```json
  {
    "message": "An error occurred while fetching subscriptions."
  }
  ```

### Explanation

- **Fetch Subscriptions**: The `getSubscriptions` function retrieves all subscription plans from the `Subscription` model using the `findAll` method.
- **Return Response**: If the subscriptions are successfully retrieved, a `200 OK` response is returned with the list of subscriptions.
- **Error Handling**: If there is an error while fetching subscriptions, a `500 Internal Server Error` response is returned with an appropriate message.

### API documentation for the `selectSubscription` function:

#### POST /api/users/select

**Description**: This API endpoint allows a user to select a subscription plan.

**Request**:

- **URL**: `/api/users/select`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "userId": "number",
    "subscriptionId": "number"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "message": "Subscription selected successfully!"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation error message"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Subscription not found."
    }
    ```

    ```json
    {
      "message": "User not found."
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "An error occurred while selecting the subscription."
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/users/select-subscription
  {
    "userId": 1,
    "subscriptionId": 2
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "Subscription selected successfully!"
  }
  ```

- **Error Response**:

  ```json
  {
    "message": "Subscription not found."
  }
  ```

  ```json
  {
    "message": "User not found."
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `subscriptionSchema` from `subscriptionsValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error message.
- **Check Subscription**: The subscription ID is checked to see if it exists. If not, a `404 Not Found` response is returned with an appropriate message.
- **Check User**: The user ID is checked to see if it exists. If not, a `404 Not Found` response is returned with an appropriate message.
- **Update User Subscription**: If both the user and subscription exist, the user's subscription ID is updated, and the changes are saved.
- **Return Response**: If the subscription is successfully selected, a `200 OK` response is returned with a success message.

### User API

### API documentation for the `sendOtpController` function:

#### POST /api/users/send-otp

**Description**: This API endpoint is used to send an OTP (One-Time Password) to a user's phone number for verification purposes during the registration process.

**Request**:

- **URL**: `/api/users/send-otp`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "phoneNumber": "string"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "otp": "123456",
      "message": "OTP sent successfully"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Phone number already registered! Please log in."
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "Failed to generate OTP"
    }
    ```
    ```json
    {
      "message": "Failed to send OTP"
    }
    ```
    ```json
    {
      "message": "An error occurred while processing the request"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/users/send-otp
  {
    "phoneNumber": "+1234567890"
  }
  ```

- **Success Response**:

  ```json
  {
    "otp": "123456",
    "message": "OTP sent successfully"
  }
  ```

- **Error Response**:
  ```json
  {
    "message": "Phone number already registered! Please log in."
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `sendOtpSchema` from `userValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error message.
- **Check Registration**: The phone number is checked to see if it is already registered. If it is, a `400 Bad Request` response is returned with an appropriate message.
- **Generate and Send OTP**: An OTP is generated using the `generateOtp` utility function. If the OTP generation or sending fails, a `500 Internal Server Error` response is returned with an appropriate message.
- **Upsert Phone Number and OTP**: The phone number and OTP are upserted in the `PhoneNumber` model.
- **Return Response**: If the OTP is successfully sent, a `200 OK` response is returned with the OTP and a success message.

### API documentation for the `verify-otp` function:

#### POST /api/users/verify-otp

**Description**: This API endpoint verifies the OTP (One-Time Password) sent to a user's phone number during the registration process.

**Request**:

- **URL**: `/api/users/verify-otp`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "phoneNumber": "string",
    "otp": "string"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "message": "OTP verified successfully"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation error message"
    }
    ```

    ```json
    {
      "message": "Invalid OTP"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Phone number not found"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "An error occurred while verifying OTP"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/users/verify-otp
  {
    "phoneNumber": "+1234567890",
    "otp": "123456"
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "OTP verified successfully"
  }
  ```

- **Error Response**:

  ```json
  {
    "message": "Invalid OTP"
  }
  ```

  ```json
  {
    "message": "Phone number not found"
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `verifyOtpSchema` from `userValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error message.
- **Check Phone Record**: The phone number is checked to see if it exists in the database. If it does not, a `404 Not Found` response is returned with an appropriate message.
- **Verify OTP**: The OTP provided by the user is compared with the OTP in the database. If they do not match, a `400 Bad Request` response is returned with an appropriate message.
- **Update Verification Status**: If the OTP is valid and the phone number exists, the verification status of the phone number is updated, and the changes are saved.
- **Return Response**: If the OTP is successfully verified, a `200 OK` response is returned with a success message.

### API documentation for the `updateEntryStatus` function:

#### POST /api/users/signup

**Description**: This API endpoint allows a new user to sign up by providing their name, email, and phone number. The phone number must be verified before signing up.

**Request**:

- **URL**: `/api/users/signup`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phoneNumber": "string"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "data": {
        "user": {
          "id": "number",
          "username": "string",
          "email": "string",
          "phoneId": "number",
          "createdAt": "date-time",
          "updatedAt": "date-time"
        }
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "success": false,
      "message": "Validation error message"
    }
    ```

    ```json
    {
      "success": false,
      "message": "Phone number is not verified"
    }
    ```

    ```json
    {
      "success": false,
      "message": "Phone number already registered! Do login."
    }
    ```

    ```json
    {
      "success": false,
      "message": "Email is already in use"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "success": false,
      "message": "Phone number is not exist!"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "success": false,
      "message": "An error occurred while creating the user"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/users/signup
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "+1234567890"
  }
  ```

- **Success Response**:

  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "user": {
        "id": 1,
        "username": "John Doe",
        "email": "john.doe@example.com",
        "phoneId": 1,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    }
  }
  ```

- **Error Responses**:

  ```json
  {
    "success": false,
    "message": "Validation error message"
  }
  ```

  ```json
  {
    "success": false,
    "message": "Phone number is not verified"
  }
  ```

  ```json
  {
    "success": false,
    "message": "Phone number already registered! Do login."
  }
  ```

  ```json
  {
    "success": false,
    "message": "Email is already in use"
  }
  ```

  ```json
  {
    "success": false,
    "message": "Phone number is not exist!"
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `validateCreateUserPayload` from `userValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error message.
- **Check Phone Number**: The phone number is checked to see if it exists and is verified. If the phone number is not found or not verified, appropriate error responses are returned.
- **Check Registration**: The phone number and email are checked to ensure they are not already registered. If they are, appropriate error responses are returned.
- **Create User**: If validation passes and the phone number is verified and not already registered, a new user is created in the `User` model.
- **Update Phone Record**: The phone record is updated to mark the phone number as registered.
- **Return Response**: If the user is successfully created, a `201 Created` response is returned with the user details and a success message.

### API documentation for the `create-password` function:

#### POST /api/users/create-password

**Description**: This API endpoint allows a user to create a password for their account using their phone number.

**Request**:

- **URL**: `/api/users/create-password`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "phoneNumber": "string",
    "password": "string"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "success": true,
      "message": "Password created successfully"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "success": false,
      "message": "Validation error message"
    }
    ```

    ```json
    {
      "success": false,
      "message": "Phone number is not verified"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "success": false,
      "message": "User not found"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "success": false,
      "message": "An error occurred while creating the signin record"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/users/create-password
  {
    "phoneNumber": "+1234567890",
    "password": "your-secure-password"
  }
  ```

- **Success Response**:

  ```json
  {
    "success": true,
    "message": "Password created successfully"
  }
  ```

- **Error Response**:

  ```json
  {
    "success": false,
    "message": "Validation error message"
  }
  ```

  ```json
  {
    "success": false,
    "message": "Phone number is not verified"
  }
  ```

  ```json
  {
    "success": false,
    "message": "User not found"
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `validatePasswordPayload` from `userValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error message.
- **Check Phone Number**: The phone number is checked to see if it exists and is verified. If the phone number is not found or not verified, appropriate error responses are returned.
- **Check User**: The user is checked to see if they exist based on the phone record. If the user is not found, a `404 Not Found` response is returned with an appropriate message.
- **Hash Password**: The password provided by the user is hashed using `bcrypt`.
- **Create signin Record**: A new signin record is created in the `SignIn` model with the hashed password.
- **Return Response**: If the password is successfully created, a `201 Created` response is returned with a success message.

### API documentation for the `signInController` function:

#### POST /api/users/signin

**Description**: This API endpoint allows a user to sign in by providing their phone number and password. Upon successful authentication, a JWT token is generated and returned.

**Request**:

- **URL**: `/api/users/signin`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "phoneNumber": "string",
    "password": "string"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "message": "Login successful",
      "token": "string"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Phone number and password are required"
    }
    ```

    ```json
    {
      "message": "Phone number is not verified"
    }
    ```

    ```json
    {
      "message": "User not found"
    }
    ```

    ```json
    {
      "message": "signin record not found"
    }
    ```

  - **Code**: `401 Unauthorized`
  - **Content**:

    ```json
    {
      "message": "Invalid password"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "An error occurred while signing in"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/users/signin
  {
    "phoneNumber": "+1234567890",
    "password": "your-secure-password"
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Phone number and password are required"
  }
  ```

  ```json
  {
    "message": "Phone number is not verified"
  }
  ```

  ```json
  {
    "message": "User not found"
  }
  ```

  ```json
  {
    "message": "signin record not found"
  }
  ```

  ```json
  {
    "message": "Invalid password"
  }
  ```

### Explanation

- **Request Validation**: The input is validated to ensure both `phoneNumber` and `password` are provided. If either is missing, a `400 Bad Request` response is returned.
- **Check Phone Number**: The phone number is checked to see if it exists and is verified. If the phone number is not found or not verified, appropriate error responses are returned.
- **Check User**: The user is checked to see if they exist based on the phone record. If the user is not found, a `400 Bad Request` response is returned with an appropriate message.
- **Check signin Record**: The signin record is checked to see if it exists for the user. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Verify Password**: The provided password is compared with the stored hashed password using `bcrypt`. If the passwords do not match, a `401 Unauthorized` response is returned with an appropriate message.
- **Generate JWT Token**: If the password is valid, a JWT token is generated using the user's ID and returned in the response.
- **Return Response**: If the signin is successful, a `200 OK` response is returned with the JWT token and a success message.

### League API

### API documentation for the `createLeague` function:

#### POST /api/leagues/create-leagues

**Description**: This API endpoint allows an administrator to create a new league. Leagues have unique names and cannot have overlapping schedules with existing leagues of the same name.

**Request**:

- **URL**: `/api/leagues`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "string",
    "start_time": "date-time",
    "end_time": "date-time",
    "entry_fee": "number"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "start_time": "date-time",
      "end_time": "date-time",
      "entry_fee": "number",
      "createdAt": "date-time",
      "updatedAt": "date-time"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation error",
      "details": "Validation error message"
    }
    ```

    ```json
    {
      "message": `A league named ${name} is already scheduled from ${existingLeague.start_time} to ${existingLeague.end_time}.`
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/leagues
  {
    "name": "Summer League",
    "start_time": "2024-06-01T00:00:00Z",
    "end_time": "2024-08-31T23:59:59Z",
    "entry_fee": 100
  }
  ```

- **Success Response**:

  ```json
  {
    "id": 1,
    "name": "Summer League",
    "start_time": "2024-06-01T00:00:00Z",
    "end_time": "2024-08-31T23:59:59Z",
    "entry_fee": 100,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation error",
    "details": "Validation error message"
  }
  ```

  ```json
  {
    "message": "A league named Summer League is already scheduled from 2024-06-01T00:00:00Z to 2024-08-31T23:59:59Z."
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `validateCreateLeague` from `leagueValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Check Existing League**: The league name and schedule are checked to see if they conflict with existing leagues. If they do, a `400 Bad Request` response is returned with an appropriate message.
- **Create League**: If validation passes and there are no conflicts, a new league is created in the `League` model.
- **Return Response**: If the league is successfully created, a `201 Created` response is returned with the league details.

### API documentation for the `deleteLeague` function:

#### DELETE /api/leagues/delete-leagues/:id

**Description**: This API endpoint allows an administrator to delete a league by its ID. Deleting a league also removes all associated matches and teams.

**Request**:

- **URL**: `/api/leagues/delete-leagues/:id`
- **Method**: `DELETE`
- **URL Parameter**:
  - `id`: The ID of the league to be deleted.

**Response**:

- **Success Response**:

  - **Code**: `204 No Content`
  - **Content**: No content is returned upon successful deletion.

- **Error Responses**:

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "League not found"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  DELETE /api/leagues/delete-leagues/1
  ```

- **Success Response**:
  No content is returned.

- **Error Responses**:

  ```json
  {
    "message": "League not found"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Check League**: The league is checked to see if it exists by its ID using the `findByPk` method. If the league is not found, a `404 Not Found` response is returned with an appropriate message.
- **Delete Associated Matches and Teams**: If the league exists, all associated matches and teams are deleted using the `destroy` method on `MatchModel` and `Team` with the league ID as the condition.
- **Delete League**: The league is then deleted using the `destroy` method on the `League` model.
- **Return Response**: If the league and its associated entities are successfully deleted, a `204 No Content` response is returned. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `getLeagues` function:

#### GET /api/leagues/get-leagues

**Description**: This API endpoint retrieves a list of leagues with optional query parameters for pagination, sorting, and filtering by name.

**Request**:

- **URL**: `/api/leagues/get-leagues`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: The page number for pagination (default: `1`).
  - `limit`: The number of leagues per page (default: `10`).
  - `name`: Optional filter to retrieve leagues by name.
  - `sortBy`: The field to sort the leagues by (default: `start_time`).
  - `order`: The order of sorting, either `ASC` (ascending) or `DESC` (descending) (default: `ASC`).

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": "number",
        "name": "string",
        "start_time": "date-time",
        "end_time": "date-time",
        "entry_fee": "number"
      }
    ]
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request\*\*
  - **Content**:

    ```json
    {
      "message": "Validation error",
      "details": "Validation error message"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/leagues/get-leagues?page=1&limit=10&name=Summer%20League&sortBy=start_time&order=ASC
  ```

- **Success Response**:

  ```json
  [
    {
      "id": 1,
      "name": "Summer League",
      "start_time": "2024-06-01T00:00:00Z",
      "end_time": "2024-08-31T23:59:59Z",
      "entry_fee": 100
    },
    {
      "id": 2,
      "name": "Winter League",
      "start_time": "2024-12-01T00:00:00Z",
      "end_time": "2024-12-31T23:59:59Z",
      "entry_fee": 50
    }
  ]
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation error",
    "details": "Validation error message"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Request Validation**: The query parameters are validated using `validateGetLeaguesQuery` from `leagueValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Fetch Leagues**: The leagues are retrieved based on the query parameters, including pagination, sorting, and optional filtering by name. If the query parameters are invalid, appropriate error responses are returned.
- **Return Response**: If the leagues are successfully retrieved, a `200 OK` response is returned with the list of leagues. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `getLeagueById` function:

#### GET /api/leagues/:id

**Description**: This API endpoint retrieves detailed information about a specific league by its ID, including its associated teams.

**Request**:

- **URL**: `/api/leagues/:id`
- **Method**: `GET`
- **URL Parameter**:
  - `id`: The ID of the league to be retrieved.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "start_time": "date-time",
      "end_time": "date-time",
      "entry_fee": "number",
      "teams": [
        {
          "id": "number",
          "name": "string",
          "leagueId": "number"
        }
      ]
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid league ID. It must be a number."
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "League not found."
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "An error occurred while fetching the league."
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/leagues/1
  ```

- **Success Response**:

  ```json
  {
    "id": 1,
    "name": "Summer League",
    "start_time": "2024-06-01T00:00:00Z",
    "end_time": "2024-08-31T23:59:59Z",
    "entry_fee": 100,
    "teams": [
      {
        "id": 1,
        "name": "Team A",
        "leagueId": 1
      },
      {
        "id": 2,
        "name": "Team B",
        "leagueId": 1
      }
    ]
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Invalid league ID. It must be a number."
  }
  ```

  ```json
  {
    "message": "League not found."
  }
  ```

  ```json
  {
    "message": "An error occurred while fetching the league."
  }
  ```

### Explanation

- **Request Validation**: The league ID is validated to ensure it is a number. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Fetch League**: The league is retrieved by its ID using the `findByPk` method, including its associated teams. If the league is not found, a `404 Not Found` response is returned with an appropriate message.
- **Return Response**: If the league is successfully retrieved, a `200 OK` response is returned with the league details, including its associated teams. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `updateLeague` function:

#### PUT /api/update-leagues/:id

**Description**: This API endpoint allows an administrator to update an existing league by its ID. Leagues with the same name cannot have overlapping schedules.

**Request**:

- **URL**: `/api/leagues/:id`
- **Method**: `PUT`
- **URL Parameter**:
  - `id`: The ID of the league to be updated.
- **Request Body**:
  ```json
  {
    "name": "string",
    "start_time": "date-time",
    "end_time": "date-time",
    "entry_fee": "number"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "start_time": "date-time",
      "end_time": "date-time",
      "entry_fee": "number",
      "createdAt": "date-time",
      "updatedAt": "date-time"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request\*\*
  - **Content**:

    ```json
    {
      "message": "Validation error",
      "details": "Validation error message"
    }
    ```

    ```json
    {
      "message": `A league with the same name already exists from ${existingLeague.start_time} to ${existingLeague.end_time}.`
    }
    ```

  - **Code**: `404 Not Found\*\*
  - **Content**:

    ```json
    {
      "message": "League not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  PUT /api/leagues/1
  {
    "name": "Summer League",
    "start_time": "2024-06-01T00:00:00Z",
    "end_time": "2024-08-31T23:59:59Z",
    "entry_fee": 100
  }
  ```

- **Success Response**:

  ```json
  {
    "id": 1,
    "name": "Summer League",
    "start_time": "2024-06-01T00:00:00Z",
    "end_time": "2024-08-31T23:59:59Z",
    "entry_fee": 100,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation error",
    "details": "Validation error message"
  }
  ```

  ```json
  {
    "message": "A league with the same name already exists from 2024-06-01T00:00:00Z to 2024-08-31T23:59:59Z."
  }
  ```

  ```json
  {
    "message": "League not found"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `validateCreateLeague` from `leagueValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Check Existing League**: The league is checked to see if it exists by its ID using the `findByPk` method. If the league is not found, a `404 Not Found` response is returned with an appropriate message.
- **Check Schedule Conflicts**: The league name and schedule are checked to see if they conflict with existing leagues. If they do, a `400 Bad Request` response is returned with an appropriate message.
- **Update League**: If validation passes and there are no conflicts, the league is updated with the new details provided in the request body.
- **Return Response**: If the league is successfully updated, a `200 OK` response is returned with the updated league details.

### API documentation for the `deleteLeague` function:

#### DELETE /api/leagues/delete-leagues/:id

**Description**: This API endpoint allows an administrator to delete a league by its ID. Deleting a league also removes all associated matches and teams.

**Request**:

- **URL**: `/api/leagues/:id`
- **Method**: `DELETE`
- **URL Parameter**:
  - `id`: The ID of the league to be deleted.

**Response**:

- **Success Response**:

  - **Code**: `204 No Content`
  - **Content**: No content is returned upon successful deletion.

- **Error Responses**:

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "League not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  DELETE /api/leagues/1
  ```

- **Success Response**:
  No content is returned.

- **Error Responses**:

  ```json
  {
    "message": "League not found"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Check League**: The league is checked to see if it exists by its ID using the `findByPk` method. If the league is not found, a `404 Not Found` response is returned with an appropriate message.
- **Delete Associated Matches and Teams**: If the league exists, all associated matches and teams are deleted using the `destroy` method on `MatchModel` and `Team` with the league ID as the condition.
- **Delete League**: The league is then deleted using the `destroy` method on the `League` model.
- **Return Response**: If the league and its associated entities are successfully deleted, a `204 No Content` response is returned. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### Match API

### API documentation for the `createMatch` function:

#### POST /api/match/:leagueId/create-matches

**Description**: This API endpoint allows an administrator to create a new match within a specific league.

**Request**:

- **URL**: `/api/leagues/:leagueId/matches`
- **Method**: `POST`
- **URL Parameter**:
  - `leagueId`: The ID of the league in which the match is to be created.
- **Request Body**:
  ```json
  {
    "team1Id": "number",
    "team2Id": "number",
    "start_time": "date-time",
    "end_time": "date-time",
    "result": "string"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "id": "number",
      "leagueId": "number",
      "team1Id": "number",
      "team2Id": "number",
      "start_time": "date-time",
      "end_time": "date-time",
      "result": "string",
      "createdAt": "date-time",
      "updatedAt": "date-time"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request\*\*
  - **Content**:

    ```json
    {
      "message": "Validation error",
      "details": "Validation error message"
    }
    ```

    ```json
    {
      "message": `Match times must be within the league's start (${league.start_time}) and end (${league.end_time}) dates, and the start time must precede the end time.`
    }
    ```

    ```json
    {
      "message": `A match between the same teams already exists in the time frame (${overlappingMatch.start_time} - ${overlappingMatch.end_time}).`
    }
    ```

  - **Code**: `404 Not Found\*\*
  - **Content**:

    ```json
    {
      "message": "League not found"
    }
    ```

    ```json
    {
      "message": "One or both teams not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/leagues/1/matches
  {
    "team1Id": 1,
    "team2Id": 2,
    "start_time": "2024-06-01T10:00:00Z",
    "end_time": "2024-06-01T12:00:00Z",
    "result": "Team 1 wins"
  }
  ```

- **Success Response**:

  ```json
  {
    "id": 1,
    "leagueId": 1,
    "team1Id": 1,
    "team2Id": 2,
    "start_time": "2024-06-01T10:00:00Z",
    "end_time": "2024-06-01T12:00:00Z",
    "result": "Team 1 wins",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation error",
    "details": "Validation error message"
  }
  ```

  ```json
  {
    "message": "Match times must be within the league's start (2024-06-01T00:00:00Z) and end (2024-08-31T23:59:59Z) dates, and the start time must precede the end time."
  }
  ```

  ```json
  {
    "message": "A match between the same teams already exists in the time frame (2024-06-01T10:00:00Z - 2024-06-01T12:00:00Z)."
  }
  ```

  ```json
  {
    "message": "League not found"
  }
  ```

  ```json
  {
    "message": "One or both teams not found"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `validateCreateMatch` from `leagueMatchValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Check League**: The league is checked to see if it exists by its ID using the `findByPk` method. If the league is not found, a `404 Not Found` response is returned with an appropriate message.
- **Check Teams**: The teams are checked to see if they exist by their IDs using the `findByPk` method. If one or both teams are not found, a `404 Not Found` response is returned with an appropriate message.
- **Check Match Times**: The match times are checked to ensure they fall within the league's start and end times and that the start time precedes the end time. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Check Overlapping Matches**: The existing matches are checked to ensure there are no overlapping matches between the same teams within the specified time frame. If there is an overlapping match, a `400 Bad Request` response is returned with an appropriate message.
- **Create Match**: If all validations pass and there are no conflicts, a new match is created in the `Match` model.
- **Return Response**: If the match is successfully created, a `201 Created` response is returned with the match details.

### API documentation for the `getMatchById` function:

#### GET /api/match/:matchId

**Description**: This API endpoint retrieves detailed information about a specific match by its ID, including its associated teams and league.

**Request**:

- **URL**: `/api/match/:matchId`
- **Method**: `GET`
- **URL Parameter**:
  - `matchId`: The ID of the match to be retrieved.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "id": "number",
      "leagueId": "number",
      "team1Id": "number",
      "team2Id": "number",
      "start_time": "date-time",
      "end_time": "date-time",
      "result": "string",
      "team1": {
        "id": "number",
        "name": "string",
        "leagueId": "number"
      },
      "team2": {
        "id": "number",
        "name": "string",
        "leagueId": "number"
      },
      "league": {
        "id": "number",
        "name": "string",
        "start_time": "date-time",
        "end_time": "date-time",
        "entry_fee": "number"
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid match ID format"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Match not found"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/matches/1
  ```

- **Success Response**:

  ```json
  {
    "id": 1,
    "leagueId": 1,
    "team1Id": 1,
    "team2Id": 2,
    "start_time": "2024-06-01T10:00:00Z",
    "end_time": "2024-06-01T12:00:00Z",
    "result": "Team 1 wins",
    "team1": {
      "id": 1,
      "name": "Team A",
      "leagueId": 1
    },
    "team2": {
      "id": 2,
      "name": "Team B",
      "leagueId": 1
    },
    "league": {
      "id": 1,
      "name": "Summer League",
      "start_time": "2024-06-01T00:00:00Z",
      "end_time": "2024-08-31T23:59:59Z",
      "entry_fee": 100
    }
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Invalid match ID format"
  }
  ```

  ```json
  {
    "message": "Match not found"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Request Validation**: The match ID is validated to ensure it is a number. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Fetch Match**: The match is retrieved by its ID using the `findByPk` method, including its associated teams and league. If the match is not found, a `404 Not Found` response is returned with an appropriate message.
- **Return Response**: If the match is successfully retrieved, a `200 OK` response is returned with the match details, including its associated teams and league. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `getMatchesByLeagueId` function:

#### GET /api/match/league/:leagueId

**Description**: This API endpoint retrieves a list of matches for a specific league by its ID, including their associated teams and league details.

**Request**:

- **URL**: `/api/match/league/:leagueId`
- **Method**: `GET`
- **URL Parameter**:
  - `leagueId`: The ID of the league whose matches are to be retrieved.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": "number",
        "leagueId": "number",
        "team1Id": "number",
        "team2Id": "number",
        "start_time": "date-time",
        "end_time": "date-time",
        "result": "string",
        "team1": {
          "id": "number",
          "name": "string",
          "leagueId": "number"
        },
        "team2": {
          "id": "number",
          "name": "string",
          "leagueId": "number"
        },
        "league": {
          "id": "number",
          "name": "string",
          "start_time": "date-time",
          "end_time": "date-time",
          "entry_fee": "number"
        }
      }
    ]
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid match ID format"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/match/league/1
  ```

- **Success Response**:

  ```json
  [
    {
      "id": 1,
      "leagueId": 1,
      "team1Id": 1,
      "team2Id": 2,
      "start_time": "2024-06-01T10:00:00Z",
      "end_time": "2024-06-01T12:00:00Z",
      "result": "Team 1 wins",
      "team1": {
        "id": 1,
        "name": "Team A",
        "leagueId": 1
      },
      "team2": {
        "id": 2,
        "name": "Team B",
        "leagueId": 1
      },
      "league": {
        "id": 1,
        "name": "Summer League",
        "start_time": "2024-06-01T00:00:00Z",
        "end_time": "2024-08-31T23:59:59Z",
        "entry_fee": 100
      }
    }
  ]
  ```

- **Error Responses**:

  ```json
  {
    "message": "Invalid match ID format"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Request Validation**: The league ID is validated to ensure it is a number. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Fetch Matches**: The matches are retrieved by the league ID using the `findAll` method, including their associated teams and league. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.
- **Return Response**: If the matches are successfully retrieved, a `200 OK` response is returned with the list of matches, including their associated teams and league details.

### API documentation for the `getMatchById` function:

#### GET /api/match/:matchId

**Description**: This API endpoint retrieves the data of a specific match by its ID.

**Request**:

- **URL**: `/api/match/:matchId`
- **Method**: `GET`
- **URL Parameter**:
  - `matchId`: The ID of the match whose result is to be retrieved.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "result": "string"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid match ID format"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Match not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/match/1
  ```

- **Success Response**:

  ```json
  {
    "result": "Team 1 wins"
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Invalid match ID format"
  }
  ```

  ```json
  {
    "message": "Match not found"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Request Validation**: The match ID is validated to ensure it is a number. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Fetch Match**: The match is retrieved by its ID using the `findByPk` method with the `attributes` option to only include the `result`. If the match is not found, a `404 Not Found` response is returned with an appropriate message.
- **Return Response**: If the match is successfully retrieved, a `200 OK` response is returned with the match result. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `updateMatchResult` function:

#### PUT /api/match/:matchId/result

**Description**: This API endpoint allows an administrator to update the result of a specific match by its ID.

**Request**:

- **URL**: `/api/match/:matchId/result`
- **Method**: `PUT`
- **URL Parameter**:
  - `matchId`: The ID of the match whose result is to be updated.
- **Request Body**:
  ```json
  {
    "result": "string"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "message": "Match result updated successfully",
      "match": {
        "id": "number",
        "leagueId": "number",
        "team1Id": "number",
        "team2Id": "number",
        "start_time": "date-time",
        "end_time": "date-time",
        "result": "string",
        "createdAt": "date-time",
        "updatedAt": "date-time"
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid match ID format"
    }
    ```

    ```json
    {
      "message": "Validation error",
      "details": ["Validation error message"]
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Match not found"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  PUT /api/match/1/result
  {
    "result": "Team 1 Won"
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "Match result updated successfully",
    "match": {
      "id": 1,
      "leagueId": 1,
      "team1Id": 1,
      "team2Id": 2,
      "start_time": "2024-06-01T10:00:00Z",
      "end_time": "2024-06-01T12:00:00Z",
      "result": "Team 1 Won",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Invalid match ID format"
  }
  ```

  ```json
  {
    "message": "Validation error",
    "details": ["Result must be one of 'Team 1 Won', 'Team 2 Won', or 'Draw'."]
  }
  ```

  ```json
  {
    "message": "Match not found"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Request Validation**: The match ID is validated to ensure it is a number, and the request body is validated using `resultSchema` from `Joi` to ensure the result is valid. If validation fails, appropriate error responses are returned.
- **Check Match**: The match is checked to see if it exists by its ID using the `findByPk` method. If the match is not found, a `404 Not Found` response is returned with an appropriate message.
- **Update Match Result**: If the match is found and validation passes, the match result is updated with the new result from the request body.
- **Return Response**: If the match result is successfully updated, a `200 OK` response is returned with a success message and the updated match details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### Team API

### API documentation for the `createMatch` function:

#### POST /api/team/:leagueId/create-teams

**Description**: This API endpoint allows a user to create a new team within a specific league.

**Request**:

- **URL**: `/api/team/:leagueId/create-teams`
- **Method**: `POST`
- **URL Parameter**:
  - `leagueId`: The ID of the league in which the team is to be created.
- **Request Body**:
  ```json
  {
    "name": "string",
    "userId": "number"
  }
  ```

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "leagueId": "number",
      "userId": "number",
      "createdAt": "date-time",
      "updatedAt": "date-time"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation error",
      "details": "Validation error message"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "League not found"
    }
    ```

    ```json
    {
      "message": "User not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/leagues/1/teams
  {
    "name": "The Champions",
    "userId": 1
  }
  ```

- **Success Response**:

  ```json
  {
    "id": 1,
    "name": "The Champions",
    "leagueId": 1,
    "userId": 1,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation error",
    "details": "Validation error message"
  }
  ```

  ```json
  {
    "message": "League not found"
  }
  ```

  ```json
  {
    "message": "User not found"
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `validateCreateTeam` from `teamValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Check League and User**: The league and user are checked to see if they exist by their IDs using the `findByPk` method. If the league or user is not found, appropriate `404 Not Found` responses are returned.
- **Create Team**: If validation passes and the league and user exist, a new team is created in the `Team` model.
- **Return Response**: If the team is successfully created, a `201 Created` response is returned with the team details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `getTeamById` function:

#### GET /api/team/:teamId

**Description**: This API endpoint retrieves detailed information about a specific team by its ID, including its associated league and user.

**Request**:

- **URL**: `/api/team/:teamId`
- **Method**: `GET`
- **URL Parameter**:
  - `teamId`: The ID of the team to be retrieved.
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "id": "number",
      "name": "string",
      "leagueId": "number",
      "userId": "number",
      "league": {
        "id": "number",
        "name": "string",
        "start_time": "date-time",
        "end_time": "date-time",
        "entry_fee": "number"
      },
      "user": {
        "id": "number",
        "username": "string",
        "email": "string"
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid team ID. It must be a number."
    }
    ```

  - **Code**: `404 Not Found\*\*
  - **Content**:

    ```json
    {
      "message": "Team not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/team/1
  ```

- **Success Response**:

  ```json
  {
    "id": 1,
    "name": "The Champions",
    "leagueId": 1,
    "userId": 1,
    "league": {
      "id": 1,
      "name": "Summer League",
      "start_time": "2024-06-01T00:00:00Z",
      "end_time": "2024-08-31T23:59:59Z",
      "entry_fee": 100
    },
    "user": {
      "id": 1,
      "username": "JohnDoe",
      "email": "john.doe@example.com"
    }
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Invalid team ID. It must be a number."
  }
  ```

  ```json
  {
    "message": "Team not found."
  }
  ```

  ```json
  {
    "message": "Error message"
  }
  ```

### Explanation

- **Request Validation**: The team ID is validated to ensure it is a number. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Fetch Team**: The team is retrieved by its ID using the `findByPk` method, including its associated league and user. If the team is not found, a `404 Not Found` response is returned with an appropriate message.
- **Return Response**: If the team is successfully retrieved, a `200 OK` response is returned with the team details, including its associated league and user. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `getTeamsByLeagueId` function:

#### GET /api/team/:leagueId/get-teams

**Description**: This API endpoint retrieves a list of teams for a specific league by its ID, including their associated league and user details.

**Request**:

- **URL**: `/api/team/:leagueId/get-teams`
- **Method**: `GET`
- **URL Parameter**:
  - `leagueId`: The ID of the league whose teams are to be retrieved.
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": "number",
        "name": "string",
        "leagueId": "number",
        "userId": "number",
        "league": {
          "id": "number",
          "name": "string"
        },
        "user": {
          "userId": "number",
          "username": "string",
          "email": "string"
        }
      }
    ]
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid leagueId. It must be a number."
    }
    ```

  - **Code**: `404 Not Found\*\*
  - **Content**:

    ```json
    {
      "message": "No teams found for the given leagueId."
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "An error occurred while fetching teams."
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/team/1/get-teams
  ```

- **Success Response**:

  ```json
  [
    {
      "id": 1,
      "name": "The Champions",
      "leagueId": 1,
      "userId": 1,
      "league": {
        "id": 1,
        "name": "Summer League"
      },
      "user": {
        "userId": 1,
        "username": "JohnDoe",
        "email": "john.doe@example.com"
      }
    }
  ]
  ```

- **Error Responses**:

  ```json
  {
    "message": "Invalid leagueId. It must be a number."
  }
  ```

  ```json
  {
    "message": "No teams found for the given leagueId."
  }
  ```

  ```json
  {
    "message": "An error occurred while fetching teams."
  }
  ```

### Explanation

- **Request Validation**: The league ID is validated to ensure it is a number. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Fetch Teams**: The teams are retrieved by the league ID using the `findAll` method, including their associated league and user details. If no teams are found, a `404 Not Found` response is returned with an appropriate message.
- **Return Response**: If the teams are successfully retrieved, a `200 OK` response is returned with the list of teams, including their associated league and user details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `getTeamsByUserId` function:

#### GET /api/team/user/:userId

**Description**: This API endpoint retrieves a list of teams created by a specific user by their ID, including the associated league details.

**Request**:

- **URL**: `/api/team/user/:userId`
- **Method**: `GET`
- **URL Parameter**:
  - `userId`: The ID of the user whose teams are to be retrieved.
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": "number",
        "name": "string",
        "leagueId": "number",
        "userId": "number",
        "league": {
          "id": "number",
          "name": "string"
        }
      }
    ]
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid userId. It must be a number."
    }
    ```

  - **Code**: `404 Not Found\*\*
  - **Content**:

    ```json
    {
      "message": "No teams found for the given userId."
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "An error occurred while fetching teams."
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/team/user/1
  ```

- **Success Response**:

  ```json
  [
    {
      "id": 1,
      "name": "The Champions",
      "leagueId": 1,
      "userId": 1,
      "league": {
        "id": 1,
        "name": "Summer League"
      }
    }
  ]
  ```

- **Error Responses**:

  ```json
  {
    "message": "Invalid userId. It must be a number."
  }
  ```

  ```json
  {
    "message": "No teams found for the given userId."
  }
  ```

  ```json
  {
    "message": "An error occurred while fetching teams."
  }
  ```

### Explanation

- **Request Validation**: The user ID is validated to ensure it is a number. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Fetch Teams**: The teams are retrieved by the user ID using the `findAll` method, including their associated league details. If no teams are found, a `404 Not Found` response is returned with an appropriate message.
- **Return Response**: If the teams are successfully retrieved, a `200 OK` response is returned with the list of teams, including their associated league details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### Tournament Match API

### API documentation for the `createTournament` function:

### Tournament API

#### POST /api/tournaments/create-tournaments

**Description**: This API endpoint allows an administrator to create a new tournament.

**Request**:

- **URL**: `/api/tournaments/create-tournaments`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "string",
    "start_time": "date-time",
    "end_time": "date-time",
    "description": "string",
    "entry_fee": "number",
    "prize_distribution": "string"
  }
  ```
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "message": "Tournament created successfully",
      "tournament": {
        "id": "number",
        "name": "string",
        "start_time": "date-time",
        "end_time": "date-time",
        "description": "string",
        "entry_fee": "number",
        "prize_distribution": "string",
        "createdAt": "date-time",
        "updatedAt": "date-time"
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation errors",
      "details": "Validation error details"
    }
    ```

    ```json
    {
      "message": "Start time cannot be in the past"
    }
    ```

    ```json
    {
      "message": "End time cannot be in the past"
    }
    ```

    ```json
    {
      "message": "End time must be greater than start time"
    }
    ```

    ```json
    {
      "message": "A tournament named Summer Tournament is already scheduled from 2024-06-01T00:00:00Z to 2024-06-30T23:59:59Z."
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "An error occurred while creating the tournament"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/tournaments/create-tournaments
  {
    "name": "Summer Tournament",
    "start_time": "2024-06-01T00:00:00Z",
    "end_time": "2024-06-30T23:59:59Z",
    "description": "An exciting summer tournament.",
    "entry_fee": 100,
    "prize_distribution": "Top 3 teams win prizes"
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "Tournament created successfully",
    "tournament": {
      "id": 1,
      "name": "Summer Tournament",
      "start_time": "2024-06-01T00:00:00Z",
      "end_time": "2024-06-30T23:59:59Z",
      "description": "An exciting summer tournament.",
      "entry_fee": 100,
      "prize_distribution": "Top 3 teams win prizes",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation errors",
    "details": "Validation error details"
  }
  ```

  ```json
  {
    "message": "Start time cannot be in the past"
  }
  ```

  ```json
  {
    "message": "End time cannot be in the past"
  }
  ```

  ```json
  {
    "message": "End time must be greater than start time"
  }
  ```

  ```json
  {
    "message": "A tournament named Summer Tournament is already scheduled from 2024-06-01T00:00:00Z to 2024-06-30T23:59:59Z."
  }
  ```

  ```json
  {
    "message": "An error occurred while creating the tournament"
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `tournamentCreateValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Additional Validation**: Additional validation is performed to ensure the start time and end time are not in the past and the end time is greater than the start time. If validation fails, appropriate error responses are returned.
- **Check for Conflicting Tournaments**: It is checked whether there is an existing tournament with the same name that conflicts with the new tournament's schedule. If a conflict is found, a `400 Bad Request` response is returned with an appropriate message.
- **Create Tournament**: If validation passes and there are no conflicts, the tournament is created in the `Tournament` model.
- **Return Response**: If the tournament is successfully created, a `201 Created` response is returned with a success message and the created tournament details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `deleteTournament` function:

#### DELETE /api/tournaments/tournaments/:id

**Description**: This API endpoint allows an administrator to delete a tournament by its ID. Deleting a tournament also removes all associated entries and matches.

**Request**:

- **URL**: `/api/tournaments/:id`
- **Method**: `DELETE`
- **URL Parameter**:
  - `id`: The ID of the tournament to be deleted.
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `204 No Content`
  - **Content**: No content is returned upon successful deletion.

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid tournament ID"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Tournament not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "An error occurred while deleting the tournament"
    }
    ```

**Example**:

- **Request**:

  ```json
  DELETE /api/tournaments/1
  ```

- **Success Response**:
  No content is returned.

- **Error Responses**:

  ```json
  {
    "message": "Invalid tournament ID"
  }
  ```

  ```json
  {
    "message": "Tournament not found"
  }
  ```

  ```json
  {
    "message": "An error occurred while deleting the tournament"
  }
  ```

### Explanation

- **Request Validation**: The tournament ID is validated to ensure it is a number. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Delete Associated Entries and Matches**: If the tournament exists, all associated entries and matches are deleted using the `destroy` method on `Entry` and `MatchForTournament` with the tournament ID as the condition.
- **Delete Tournament**: The tournament is then deleted using the `destroy` method on the `Tournament` model. If the tournament is not found, a `404 Not Found` response is returned with an appropriate message.
- **Return Response**: If the tournament and its associated entities are successfully deleted, a `204 No Content` response is returned. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `getTournamentById` function:

#### GET /api/tournaments/:id

**Description**: This API endpoint retrieves detailed information about a specific tournament by its ID.

**Request**:

- **URL**: `/api/tournaments/:id`
- **Method**: `GET`
- **URL Parameter**:
  - `id`: The ID of the tournament to be retrieved.
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "message": "Tournament retrieved successfully",
      "data": {
        "id": "number",
        "name": "string",
        "start_date": "date",
        "end_date": "date",
        "createdAt": "date-time",
        "updatedAt": "date-time"
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Invalid tournament ID"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": `Tournament with ID ${tournamentId} not found`
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "An error occurred while fetching the tournament"
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/tournaments/1
  ```

- **Success Response**:

  ```json
  {
    "message": "Tournament retrieved successfully",
    "data": {
      "id": 1,
      "name": "Summer Tournament",
      "start_date": "2024-06-01",
      "end_date": "2024-06-30",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Invalid tournament ID"
  }
  ```

  ```json
  {
    "message": "Tournament with ID 1 not found"
  }
  ```

  ```json
  {
    "message": "An error occurred while fetching the tournament"
  }
  ```

### Explanation

- **Request Validation**: The tournament ID is validated to ensure it is a number. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Fetch Tournament**: The tournament is retrieved by its ID using the `findByPk` method. If the tournament is not found, a `404 Not Found` response is returned with an appropriate message.
- **Return Response**: If the tournament is successfully retrieved, a `200 OK` response is returned with the tournament details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `getTournaments` function:

#### GET /api/tournaments

**Description**: This API endpoint retrieves a list of tournaments with optional query parameters for pagination, sorting, and filtering by name, start time, and end time.

**Request**:

- **URL**: `/api/tournaments`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: The page number for pagination (default: `1`).
  - `limit`: The number of tournaments per page (default: `10`).
  - `sort`: The field to sort the tournaments by (default: `start_time`).
  - `order`: The order of sorting, either `ASC` (ascending) or `DESC` (descending) (default: `ASC`).
  - `name`: Optional filter to retrieve tournaments by name.
  - `start_time`: Optional filter to retrieve tournaments that start on or after a specific date.
  - `end_time`: Optional filter to retrieve tournaments that end on or before a specific date.
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "currentPage": "number",
      "totalPages": "number",
      "totalCount": "number",
      "tournaments": [
        {
          "id": "number",
          "name": "string",
          "start_date": "date",
          "end_date": "date",
          "createdAt": "date-time",
          "updatedAt": "date-time"
        }
      ]
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Error message"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "An error occurred while fetching tournaments."
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/tournaments?page=1&limit=10&sort=start_time&order=ASC&name=Summer%20Tournament&start_time=2024-06-01&end_time=2024-06-30
  ```

- **Success Response**:

  ```json
  {
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 1,
    "tournaments": [
      {
        "id": 1,
        "name": "Summer Tournament",
        "start_date": "2024-06-01",
        "end_date": "2024-06-30",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

- **Error Responses**:
  ```json
  {
    "message": "An error occurred while fetching tournaments."
  }
  ```

### Explanation

- **Request Validation**: The query parameters are validated to ensure they are numbers or valid dates. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Fetch Tournaments**: The tournaments are retrieved based on the query parameters, including pagination, sorting, and optional filtering by name, start time, and end time. If any errors occur during the process, appropriate error responses are returned.
- **Return Response**: If the tournaments are successfully retrieved, a `200 OK` response is returned with the list of tournaments and pagination details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `updateTournament` function:

### Tournament API

#### PUT /api/tournaments/:id

**Description**: This API endpoint allows an administrator to update an existing tournament by its ID.

**Request**:

- **URL**: `/api/tournaments/:id`
- **Method**: `PUT`
- **URL Parameter**:
  - `id`: The ID of the tournament to be updated.
- **Request Body**:
  ```json
  {
    "name": "string",
    "start_time": "date-time",
    "end_time": "date-time",
    "description": "string",
    "entry_fee": "number",
    "prize_distribution": "string"
  }
  ```
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "message": "Tournament updated successfully",
      "tournament": {
        "id": "number",
        "name": "string",
        "start_time": "date-time",
        "end_time": "date-time",
        "description": "string",
        "entry_fee": "number",
        "prize_distribution": "string",
        "createdAt": "date-time",
        "updatedAt": "date-time"
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation errors",
      "details": "Validation error messages"
    }
    ```

    ```json
    {
      "message": "Start time cannot be in the past"
    }
    ```

    ```json
    {
      "message": "End time cannot be in the past"
    }
    ```

    ```json
    {
      "message": "End time must be greater than start time"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": `Tournament with ID ${id} not found`
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "An error occurred while updating the tournament"
    }
    ```

**Example**:

- **Request**:

  ```json
  PUT /api/tournaments/1
  {
    "name": "Summer Tournament",
    "start_time": "2024-06-01T00:00:00Z",
    "end_time": "2024-06-30T23:59:59Z",
    "description": "An exciting summer tournament.",
    "entry_fee": 100,
    "prize_distribution": "Top 3 teams win prizes"
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "Tournament updated successfully",
    "tournament": {
      "id": 1,
      "name": "Summer Tournament",
      "start_time": "2024-06-01T00:00:00Z",
      "end_time": "2024-06-30T23:59:59Z",
      "description": "An exciting summer tournament.",
      "entry_fee": 100,
      "prize_distribution": "Top 3 teams win prizes",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation errors",
    "details": "Validation error messages"
  }
  ```

  ```json
  {
    "message": "Start time cannot be in the past"
  }
  ```

  ```json
  {
    "message": "End time cannot be in the past"
  }
  ```

  ```json
  {
    "message": "End time must be greater than start time"
  }
  ```

  ```json
  {
    "message": "Tournament with ID 1 not found"
  }
  ```

  ```json
  {
    "message": "An error occurred while updating the tournament"
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `tournamentUpdateValidator`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Additional Validation**: Additional validation is performed to ensure the start time and end time are not in the past and the end time is greater than the start time. If validation fails, appropriate error responses are returned.
- **Check Tournament**: The tournament is checked to see if it exists by its ID using the `findByPk` method. If the tournament is not found, a `404 Not Found` response is returned with an appropriate message.
- **Update Tournament**: If validation passes and the tournament exists, the tournament is updated with the new details provided in the request body.
- **Return Response**: If the tournament is successfully updated, a `200 OK` response is returned with a success message and the updated tournament details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### Entry API

### API documentation for the `enterTournament` function:

#### POST /api/tournament/:tournamentId/enter

**Description**: This API endpoint allows a user to enter a specific tournament.

**Request**:

- **URL**: `/api/tournament/:tournamentId/enter`
- **Method**: `POST`
- **URL Parameter**:
  - `tournamentId`: The ID of the tournament to enter.
- **Request Body**:
  ```json
  {
    "userId": "number"
  }
  ```
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "id": "number",
      "tournament_id": "number",
      "user_id": "number",
      "status": "Pending",
      "createdAt": "date-time",
      "updatedAt": "date-time"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation failed",
      "details": "Validation error details"
    }
    ```

    ```json
    {
      "message": "User is already entered in this tournament"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Tournament not found"
    }
    ```

    ```json
    {
      "message": "User not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "Error message"
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/tournament/1/enter
  {
    "userId": 1
  }
  ```

- **Success Response**:

  ```json
  {
    "id": 1,
    "tournament_id": 1,
    "user_id": 1,
    "status": "Pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation failed",
    "details": "User ID must be a number"
  }
  ```

  ```json
  {
    "message": "User is already entered in this tournament"
  }
  ```

  ```json
  {
    "message": "Tournament not found"
  }
  ```

  ```json
  {
    "message": "User not found"
  }
  ```

  ```json
  {
    "message": "An error occurred while creating the entry."
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `validateEntryInputs` from `entryValidators`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Check Tournament and User**: The tournament and user are checked to see if they exist by their IDs using the `findByPk` method. If the tournament or user is not found, appropriate `404 Not Found` responses are returned.
- **Check Existing Entry**: It is checked whether the user is already entered into the tournament. If an existing entry is found, a `400 Bad Request` response is returned with an appropriate message.
- **Create Entry**: If validation passes and the tournament and user exist, a new entry is created in the `Entry` model with the status set to "Pending".
- **Return Response**: If the entry is successfully created, a `201 Created` response is returned with the entry details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `getUserEntries` function:

#### GET /api/user/:userId/entries

**Description**: This API endpoint retrieves a list of tournament entries for a specific user by their ID, including the associated tournament details.

**Request**:

- **URL**: `/api/user/:userId/entries`
- **Method**: `GET`
- **URL Parameter**:
  - `userId`: The ID of the user whose entries are to be retrieved.
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    [
      {
        "id": "number",
        "tournament_id": "number",
        "user_id": "number",
        "status": "string",
        "createdAt": "date-time",
        "updatedAt": "date-time",
        "tournament": {
          "id": "number",
          "name": "string",
          "start_time": "date-time",
          "end_time": "date-time"
        }
      }
    ]
    ```

- **Error Responses**:

  - **Code**: `404 Not Found\*\*
  - **Content**:

    ```json
    {
      "message": "User not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "An error occurred while fetching the user entries."
    }
    ```

**Example**:

- **Request**:

  ```json
  GET /api/user/1/entries
  ```

- **Success Response**:

  ```json
  [
    {
      "id": 1,
      "tournament_id": 1,
      "user_id": 1,
      "status": "Granted",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "tournament": {
        "id": 1,
        "name": "Summer Tournament",
        "start_time": "2024-06-01T00:00:00Z",
        "end_time": "2024-06-30T23:59:59Z"
      }
    }
  ]
  ```

- **Error Responses**:

  ```json
  {
    "message": "User not found"
  }
  ```

  ```json
  {
    "message": "An error occurred while fetching the user entries."
  }
  ```

### Explanation

- **Check User**: The user is checked to see if they exist by their ID using the `findByPk` method. If the user is not found, a `404 Not Found` response is returned with an appropriate message.
- **Fetch Entries**: The entries for the user are retrieved by the user ID using the `findAll` method, including the associated tournament details. If no entries are found, a message is returned indicating that no entries were found for the user.
- **Return Response**: If the entries are successfully retrieved, a `200 OK` response is returned with the list of entries and associated tournament details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `updateEntryStatus` function:

#### PUT /api/entries/:entryId/status

**Description**: This API endpoint allows an administrator to update the status of a specific tournament entry by its ID.

**Request**:

- **URL**: `/api/entries/:entryId/status`
- **Method**: `PUT`
- **URL Parameter**:
  - `entryId`: The ID of the entry whose status is to be updated.
- **Request Body**:
  ```json
  {
    "status": "string"
  }
  ```
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "message": "Entry status updated successfully",
      "entry": {
        "id": "number",
        "tournament_id": "number",
        "user_id": "number",
        "status": "string",
        "createdAt": "date-time",
        "updatedAt": "date-time"
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation error message"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Entry not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "An error occurred while updating the entry status."
    }
    ```

**Example**:

- **Request**:

  ```json
  PUT /api/entries/1/status
  {
    "status": "Granted"
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "Entry status updated successfully",
    "entry": {
      "id": 1,
      "tournament_id": 1,
      "user_id": 1,
      "status": "Granted",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation error message"
  }
  ```

  ```json
  {
    "message": "Entry not found"
  }
  ```

  ```json
  {
    "message": "An error occurred while updating the entry status."
  }
  ```

### Explanation

- **Request Validation**: The entry ID and request body are validated using `entryIdValidationSchema` and `statusValidationSchema`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Check Entry**: The entry is checked to see if it exists by its ID using the `findByPk` method. If the entry is not found, a `404 Not Found` response is returned with an appropriate message.
- **Update Entry Status**: If the entry is found and validation passes, the entry status is updated with the new status from the request body.
- **Return Response**: If the entry status is successfully updated, a `200 OK` response is returned with a success message and the updated entry details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### Tournament Match API

### API documentation for the `createTournamentMatch` function:

#### POST /api/tournaments/:tournamentId/matches

**Description**: This API endpoint allows an administrator to create a new match within a specific tournament.

**Request**:

- **URL**: `/api/tournaments/:tournamentId/matches`
- **Method**: `POST`
- **URL Parameter**:
  - `tournamentId`: The ID of the tournament in which the match is to be created.
- **Request Body**:
  ```json
  {
    "team1Id": "number",
    "team2Id": "number",
    "start_time": "date-time",
    "end_time": "date-time"
  }
  ```
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    {
      "id": "number",
      "tournament_id": "number",
      "team1_id": "number",
      "team2_id": "number",
      "start_time": "date-time",
      "end_time": "date-time",
      "status": "Pending",
      "createdAt": "date-time",
      "updatedAt": "date-time"
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation error message"
    }
    ```

    ```json
    {
      "message": "Team 1 is not granted yet"
    }
    ```

    ```json
    {
      "message": "Team 2 is not granted yet"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Tournament not found"
    }
    ```

    ```json
    {
      "message": "Team 1 not found"
    }
    ```

    ```json
    {
      "message": "Team 2 not found"
    }
    ```

  - **Code**: `500 Internal Server Error`
  - **Content**:
    ```json
    {
      "message": "An error occurred while creating the match."
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/tournaments/1/matches
  {
    "team1Id": 1,
    "team2Id": 2,
    "start_time": "2024-06-01T10:00:00Z",
    "end_time": "2024-06-01T12:00:00Z"
  }
  ```

- **Success Response**:

  ```json
  {
    "id": 1,
    "tournament_id": 1,
    "team1_id": 1,
    "team2_id": 2,
    "start_time": "2024-06-01T10:00:00Z",
    "end_time": "2024-06-01T12:00:00Z",
    "status": "Pending",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation error message"
  }
  ```

  ```json
  {
    "message": "Team 1 is not granted yet"
  }
  ```

  ```json
  {
    "message": "Team 2 is not granted yet"
  }
  ```

  ```json
  {
    "message": "Tournament not found"
  }
  ```

  ```json
  {
    "message": "Team 1 not found"
  }
  ```

  ```json
  {
    "message": "Team 2 not found"
  }
  ```

  ```json
  {
    "message": "An error occurred while creating the match."
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `tournamentIdValidationSchema` and `matchValidationSchemaForTournament`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Check Tournament and Teams**: The tournament and teams are checked to see if they exist and if the teams are granted. If not, appropriate `404 Not Found` and `400 Bad Request` responses are returned.
- **Create Match**: If validation passes and the tournament and teams exist and are granted, a new match is created in the `MatchForTournament` model.
- **Return Response**: If the match is successfully created, a `201 Created` response is returned with the match details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `matchmake` function:

#### POST /api/tournaments/matchmake

**Description**: This API endpoint allows an administrator to perform matchmaking for a specific tournament, pairing teams and creating matches.

**Request**:

- **URL**: `/api/tournaments/matchmake`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "tournamentId": "number"
  }
  ```
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `201 Created`
  - **Content**:
    ```json
    [
      {
        "id": "number",
        "tournament_id": "number",
        "team1_id": "number",
        "team2_id": "number",
        "start_time": "date-time",
        "status": "Matched",
        "createdAt": "date-time",
        "updatedAt": "date-time"
      }
    ]
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation error message"
    }
    ```

    ```json
    {
      "message": "Not enough participants to matchmake."
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "An error occurred during matchmaking."
    }
    ```

**Example**:

- **Request**:

  ```json
  POST /api/tournaments/matchmake
  {
    "tournamentId": 1
  }
  ```

- **Success Response**:

  ```json
  [
    {
      "id": 1,
      "tournament_id": 1,
      "team1_id": 1,
      "team2_id": 2,
      "start_time": "2024-06-01T10:00:00Z",
      "status": "Matched",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation error message"
  }
  ```

  ```json
  {
    "message": "Not enough participants to matchmake."
  }
  ```

  ```json
  {
    "message": "An error occurred during matchmaking."
  }
  ```

### Explanation

- **Request Validation**: The input is validated using `matchmakeValidationSchema` from `Joi`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Check Participants**: The entries are checked to see if there are enough pending participants to matchmake. If not, a `400 Bad Request` response is returned with an appropriate message.
- **Perform Matchmaking**: If there are enough participants, they are grouped into pairs and matches are created. Entry statuses are updated to "Matched".
- **Transaction Handling**: The matchmaking process is handled within a transaction. If any errors occur during the process, the transaction is rolled back, and a `500 Internal Server Error` response is returned with the error message.
- **Return Response**: If the matchmaking is successfully completed, a `201 Created` response is returned with the created matches. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.

### API documentation for the `updateMatchResult` function:

#### PUT /api/tournaments/matches/:matchId/result

**Description**: This API endpoint allows an administrator to update the result of a specific match by its ID.

**Request**:

- **URL**: `/api/tournaments/matches/:matchId/result`
- **Method**: `PUT`
- **URL Parameter**:
  - `matchId`: The ID of the match whose result is to be updated.
- **Request Body**:
  ```json
  {
    "result": "string"
  }
  ```
- **Authorization**: JWT required.

**Response**:

- **Success Response**:

  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "message": "Match result updated successfully",
      "match": {
        "id": "number",
        "tournament_id": "number",
        "team1_id": "number",
        "team2_id": "number",
        "start_time": "date-time",
        "end_time": "date-time",
        "result": "string",
        "status": "Completed",
        "createdAt": "date-time",
        "updatedAt": "date-time"
      }
    }
    ```

- **Error Responses**:

  - **Code**: `400 Bad Request`
  - **Content**:

    ```json
    {
      "message": "Validation error message"
    }
    ```

  - **Code**: `404 Not Found`
  - **Content**:

    ```json
    {
      "message": "Match not found"
    }
    ```

  - **Code**: `500 Internal Server Error\*\*
  - **Content**:
    ```json
    {
      "message": "An error occurred while updating the match result."
    }
    ```

**Example**:

- **Request**:

  ```json
  PUT /api/tournaments/matches/1/result
  {
    "result": "Team 1 Won"
  }
  ```

- **Success Response**:

  ```json
  {
    "message": "Match result updated successfully",
    "match": {
      "id": 1,
      "tournament_id": 1,
      "team1_id": 1,
      "team2_id": 2,
      "start_time": "2024-06-01T10:00:00Z",
      "end_time": "2024-06-01T12:00:00Z",
      "result": "Team 1 Won",
      "status": "Completed",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

- **Error Responses**:

  ```json
  {
    "message": "Validation error message"
  }
  ```

  ```json
  {
    "message": "Match not found"
  }
  ```

  ```json
  {
    "message": "An error occurred while updating the match result."
  }
  ```

### Explanation

- **Request Validation**: The match ID and request body are validated using `matchIdValidationSchema` and `resultValidationSchema`. If validation fails, a `400 Bad Request` response is returned with the validation error details.
- **Check Match**: The match is checked to see if it exists by its ID using the `findByPk` method. If the match is not found, a `404 Not Found` response is returned with an appropriate message.
- **Update Match Result**: If the match is found and validation passes, the match result is updated with the new result from the request body, and the match status is set to "Completed".
- **Return Response**: If the match result is successfully updated, a `200 OK` response is returned with a success message and the updated match details. If any errors occur during the process, a `500 Internal Server Error` response is returned with the error message.
