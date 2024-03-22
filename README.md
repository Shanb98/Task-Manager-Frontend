# Task Management Application

## Introduction
This application is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It includes CRUD functionality for tasks, JWT token authentication, user roles (admin and regular user), MongoDB integration for backend data storage, and a calendar component for task visualization.

## Features
- JWT token authentication.
- User roles (admin and regular user) for authorization.
- CRUD operations for tasks, with restricted access based on user roles.
- Integration with MongoDB for storing task and user data.
- Implementation of a resource calendar for task visualization.
- Dynamic navigation system based on user roles.
- Synchronization of the calendar component with the backend for adding tasks.

## Significant Technologies Used
### Backend:
- Node.js
- Express.js
- MongoDB
- Bcrypt

### Frontend:
- React.js
- Axios for API requests
- JWT for authentication
- Tailwind CSS

## Installation
1. Clone the repository from GitHub: `git clone <repository-url>`
2. Navigate to the backend folder and install dependencies: `cd backend && npm install`
3. Set up the MongoDB database and configure the connection in the .env file.
4. Run the backend server: `npm start`
5. Navigate to the frontend folder and install dependencies: `cd ../frontend && npm install`
6. Run the frontend application: `npm start`

## Backend Setup
### JWT Token Authentication:
- Implemented using Passport.js middleware.
- Routes for user registration, login, and logout.
- Middleware for authentication and authorization.

### User Roles:
- Two user roles: admin and regular user.
- Admins have full access to CRUD operations for tasks.
- Regular users can only modify their tasks.

### Task Model:
- Enhanced to include a relationship with users.
- Tasks can be assigned to specific users.

### CRUD Operations for Tasks:
- Implemented API routes and controllers for CRUD operations.
- Users can only modify their tasks, while admins can modify any task.

### MongoDB Integration:
- MongoDB used for storing task and user data.
- Database connection configured in the .env file.

## Frontend Setup
### User Authentication:
- User registration, login, and logout components implemented.

### Navigation System:
- Dynamically changes based on user roles (admin or regular user).
- JWT tokens used for authenticating and authorizing API requests.

### Task Components:
- Modified to allow only authorized users to perform CRUD operations.
- UI components updated based on user roles.

### Calendar Integration:
- Synchronized with the backend for adding tasks.

## UI Screenshots

### Login Page
<img src="https://github.com/Shanb98/Task-Manager-Frontend/assets/130221905/eb749fcc-c4ee-4433-8329-fef77e501a6c" width="750" height="400">

### Registration Page
<img src="https://github.com/Shanb98/Task-Manager-Frontend/assets/130221905/57f52f72-0b66-4145-ba5b-1c92eb93d81c" width="750" height="550">

### Task Dashboard - Regular User
<img src="https://github.com/Shanb98/Task-Manager-Frontend/assets/130221905/96e0e84c-15dc-4065-95c2-a6fea2cd3435" width="750" height="400">

### Add Tasks Modal
<img src="https://github.com/Shanb98/Task-Manager-Frontend/assets/130221905/08b904e8-1201-4609-8daa-97932c734947" width="750" height="400">

### Task Details
<img src="https://github.com/Shanb98/Task-Manager-Frontend/assets/130221905/7f334b8e-08ee-4732-ba4e-63eed505ae78" width="750" height="400">

### Admin Profile
<img src="https://github.com/Shanb98/Task-Manager-Frontend/assets/130221905/2eaff9ce-c879-4132-a4d0-21376d6d35fd" width="750" height="400">



## Conclusion
The Task Management Application built using the MERN stack provides comprehensive functionality for managing tasks, user authentication, and role-based access control. The integration with MySQL and the implementation of a resource calendar enhance the user experience and productivity. For any issues or further assistance, please refer to the documentation or contact the developers.
