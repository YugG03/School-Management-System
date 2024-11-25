School Management System
A robust School Management System built with Node.js, Express.js, and MongoDB, designed to manage students, teachers, and classes efficiently. This system supports user authentication, image uploads, and proper API documentation.

Table of Contents

Features
User Authentication:

Role-based access control for admin.
JWT-based authentication.
Secure login/logout mechanisms.
Student and Teacher Management:

Add, update, delete, and view students and teachers.
Custom IDs for students, teachers, and classes.
Profile picture upload to Cloudinary for both students and teachers.
Class Management:

Associate students and teachers with specific classes.
Manual management of studentCount in each class.
File Uploads:

Separate endpoints for uploading profile pictures to Cloudinary for students and teachers.
Cloudinary folder structure for better organization.
Error Handling and Validation:

Centralized error handling with proper HTTP status codes.
Validation for required fields in requests.
JSON Data Usage:

Certain datasets stored in JSON format for quick access and frontend comparison.
Optimized Folder Structure:

Organized folders for routes, controllers, models, middleware, and utils.
Technologies Used
Backend: Node.js, Express.js
Database: MongoDB (Mongoose)
Authentication: JSON Web Tokens (JWT)
File Uploads: Cloudinary
Validation: Joi
Version Control: Git
Folder Structure
.
├── controllers/         # API endpoint logic  
├── middleware/          # Authentication and validation logic  
├── models/              # MongoDB schemas  
├── routes/              # API routes  
├── utils/               # Utility functions (Cloudinary configuration, JSON handling, etc.)  
├── .env.example         # Sample environment variables  
├── README.md            # Documentation  
├── package.json         # Node.js dependencies  
Installation and Setup
Clone the Repository:

git clone https://github.com/your-username/your-repository-name.git  
cd your-repository-name  
Install Dependencies:  

npm install  
Set Up Environment Variables: Create a .env file in the root directory and configure the following variables:  

DATABASE_URL=<Your MongoDB Connection String>  
JWT_SECRET=<Your JWT Secret>  
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>  
CLOUDINARY_API_KEY=<Your Cloudinary API Key>  
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>  
Run the Application:  
node server.js  
Access the API:  
Open http://localhost:5000 to access the API.  
Environment Variables  
The .env.example file contains the following variables that must be configured before running the application:  

DATABASE_URL=<MongoDB Connection String>  
JWT_SECRET=<JWT Secret>  
CLOUDINARY_CLOUD_NAME=<Cloudinary Cloud Name>  
CLOUDINARY_API_KEY=<Cloudinary API Key>  
CLOUDINARY_API_SECRET=<Cloudinary API Secret>  
API Endpoints  
User Authentication  
Method	Endpoint	Description  
POST	/auth/login	User login  
POST	/auth/logout	User logout  
Student Management  
Method	Endpoint	Description  
POST	/students	Add a new student  
GET	/students/:id	Get student by ID  
PUT	/students/:id	Update student details  
DELETE	/students/:id	Delete a student  
POST	/students/upload	Upload student profile picture  
Teacher Management  
Method	Endpoint	Description  
POST	/teachers	Add a new teacher  
GET	/teachers/:id	Get teacher by ID  
PUT	/teachers/:id	Update teacher details  
DELETE	/teachers/:id	Delete a teacher  
POST	/teachers/upload	Upload teacher profile picture  
Class Management  
Method	Endpoint	Description  
POST	/classes	Add a new class  
GET	/classes/:id	Get class by ID  
PUT	/classes/:id	Update class details  
DELETE	/classes/:id	Delete a class  
Error Handling  
Centralized Error Handling:  

All routes are wrapped in error-handling middleware for consistency.  
Custom Error Pages:  

Invalid endpoints return a 404 JSON message.  
Validation Errors:  

Missing or invalid fields return a 400 status code.  
Additional Features  
Custom ID Implementation:  

Unique custom IDs for students, teachers, and classes.  
Cloudinary Integration:  

Secure image uploads with separate folders for teachers and students.  
Environment Configuration:  

Use of .env.example for ease of setup and maintenance.  
Contribution Guidelines  
Fork the repository.  
Create a new branch for your feature or bug fix.  
Submit a pull request with detailed explanation.  
