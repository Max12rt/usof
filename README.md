usof_backend
create an API for a future question and answer service for professional and enthusiast programmers

Requirements and Dependencies
List all the requirements and dependencies needed to build and run your project. This helps users set up their environment correctly.

Node.js
MongoDB

How to Run
Provide detailed steps on how users can set up and run your solution on their local machine. Include any necessary configurations.

1. Clone the Repository
bash
Copy code
git clone https://github.com/Max12rt/usof-backend.git
2. Install Dependencies
bash
Copy code
cd your-project
npm install
3. Configure Environment Variables
If your project requires any environment variables, specify them and how to set them up.

bash
Copy code
cp .env.example .env
Update the .env file with your configuration.

4. Start the Application
bash
Copy code
npm start
Your application should now be running at http://localhost:3000.

Registration:
Register:
Fill in your desired "Login," "Email," "Password," and "Full Name."
Click the "Register" button.
Check the result in the "Registration Outcome" section.
Login:
Login:
Enter your registered "Email" and "Password."
Click the "Login" button.
Review the login status in the "Login Outcome" area.
Account Confirmation:
Confirm Email:
Input the "Activation Token," your "Login," "Email," "Password," "Full Name," and "Role" (if required).
Hit the "Confirm Email" button.
Examine the confirmation outcome in the "Activation Result" section.
User Management:
Delete User:
Provide the "User ID" you wish to delete.
Click the "Delete User" button.
See the deletion result in the "Deletion Outcome" area.
Token Management:
Refresh Token:
Press the "Refresh Token" button.
Check the result in the "Token Refresh Outcome" section.
Password Reset:
Reset Password:
Enter the provided "Reset Password Token" (e.g., 'asdasdasdasd').
Specify your new password.
Click "Reset Password."
View the outcome in the "Password Reset Result" section.
Admin Test Panel:
Admin Functionalities:
Utilize various buttons to test functionalities like getting account details, all users, a user by ID, creating a new user, etc.
Examine the outcomes displayed in the respective sections.
Note: Ensure the backend server is active at http://localhost:3000. If any issues occur, check the console for potential errors.

Authentication Endpoints (authentificateController):
Register:

Endpoint: POST http://localhost:3000/auth/register
Body: JSON with login, email, password, and full_name.
Activate Email:

Endpoint: POST http://localhost:3000/auth/activation
Body: JSON with activation_token.
Login:

Endpoint: POST http://localhost:3000/auth/login
Body: JSON with email and password.
Refresh Token:

Endpoint: POST http://localhost:3000/auth/refresh_token
No body is needed; the refresh token is sent in the cookies.
Reset Password:

Endpoint: POST http://localhost:3000/auth/resetPassword
Body: JSON with email.
Reset Password Confirmation:

Endpoint: POST http://localhost:3000/auth/resetPassword/{confirmToken}
Params: {confirmToken} is the token received in the email.
Body: JSON with the new password.
Logout:

Endpoint: POST http://localhost:3000/auth/logout
No body is needed; it clears the refresh token cookie.
Category Endpoints (categoryController):
Get All Categories with Pagination:

Endpoint: GET http://localhost:3000/categories
Query Parameters: page (e.g., ?page=1).
Get All Categories:

Endpoint: GET http://localhost:3000/categories/all
Get Category by ID:

Endpoint: GET http://localhost:3000/categories/{categoryId}
Params: {categoryId} is the ID of the category.
Get Posts by Category ID:

Endpoint: GET http://localhost:3000/categories/{categoryId}/posts
Params: {categoryId} is the ID of the category.
Query Parameters: page (e.g., ?page=1).
Update Category by ID:

Endpoint: PATCH http://localhost:3000/categories/{categoryId}
Params: {categoryId} is the ID of the category.
Body: JSON with title and/or description.
Delete Category by ID:

Endpoint: DELETE http://localhost:3000/categories/{categoryId}
Params: {categoryId} is the ID of the category.
Comment Endpoints (commentController):
Get Comment by ID:

Endpoint: GET http://localhost:3000/comments/{commentId}
Params: {commentId} is the ID of the comment.
Get Likes by Comment ID:

Endpoint: GET http://localhost:3000/comments/{commentId}/like
Params: {commentId} is the ID of the comment.
Create Like for Comment:

Endpoint: POST http://localhost:3000/comments/{commentId}/like
Params: {commentId} is the ID of the comment.
Body: JSON with likeType.
Update Comment by ID:

Endpoint: PATCH http://localhost:3000/comments/{commentId}
Params: {commentId} is the ID of the comment.
Body: JSON with content.
Delete Comment by ID:

Endpoint: DELETE http://localhost:3000/comments/{commentId}
Params: {commentId} is the ID of the comment.
Delete Like for Comment:

Endpoint: DELETE http://localhost:3000/comments/{commentId}/like
Params: {commentId} is the ID of the comment.
User Endpoints (userController):
Get Current User Account:

Endpoint: GET http://localhost:3000/users/myAccount
Get All Users:

Endpoint: GET http://localhost:3000/users
Get User by ID:

Endpoint: GET http://localhost:3000/users/{userId}
Params: {userId} is the ID of the user.
Create New User:

Endpoint: POST http://localhost:3000/users
Body: JSON with user details.
Change Avatar:

Endpoint: POST http://localhost:3000/users/avatar
Body: Form data with the avatar file.
Update User by ID:

Endpoint: PATCH http://localhost:3000/users/{userId}
Params: {userId} is the ID of the user.
Body: JSON with user details.
Delete User by ID:

Endpoint: DELETE http://localhost:3000/users/{userId}
Params: {userId} is the ID of the user.

For postController
1. Get All Posts
Request Type: GET
URL: http://localhost:5000/posts
Headers: No specific headers required
Params:
page: Number (e.g., page=1)
2. Get Post by ID
Request Type: GET
URL: http://localhost:5000/posts/:post_id
Headers: No specific headers required
Params:
post_id: Number (replace :post_id with the actual post ID)
3. Get Comments by Post ID
Request Type: GET
URL: http://localhost:5000/posts/:post_id/comments
Headers: No specific headers required
Params:
post_id: Number (replace :post_id with the actual post ID)
4. Create Comment for Post by ID
Request Type: POST
URL: http://localhost:5000/posts/:post_id/comments
Headers:
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
Body:
json
{
    "content": "Your comment content"
}
5. Get Categories by Post ID
Request Type: GET
URL: http://localhost:5000/posts/:post_id/categories
Headers: No specific headers required
Params:
post_id: Number (replace :post_id with the actual post ID)
6. Get All Likes by Post ID
Request Type: GET
URL: http://localhost:5000/posts/:post_id/likes
Headers: No specific headers required
Params:
post_id: Number (replace :post_id with the actual post ID)
7. Create Post
Request Type: POST
URL: http://localhost:5000/posts
Headers:
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
Body:
json

{
    "title": "Your post title",
    "content": "Your post content",
    "categories": [1, 2, 3]  // Replace with actual category IDs
}
8. Create New Like for Post by ID
Request Type: POST
URL: http://localhost:5000/posts/:post_id/likes
Headers:
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
Body:
json

{
    "likeType": "like"  // or "dislike"
}
9. Update Post by ID
Request Type: PUT
URL: http://localhost:5000/posts/:post_id
Headers:
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
Body:
json

{
    "title": "Updated post title",
    "content": "Updated post content"
}
10. Delete Post by ID
Request Type: DELETE
URL: http://localhost:5000/posts/:post_id
Headers:
Authorization: Bearer YOUR_ACCESS_TOKEN
11. Delete Like for Post by ID
Request Type: DELETE
URL: http://localhost:5000/posts/:post_id/likes
Headers:
Authorization: Bearer YOUR_ACCESS_TOKEN
For userController
1. Get My Account
Request Type: GET
URL: http://localhost:5000/users/me
Headers:
Authorization: Bearer YOUR_ACCESS_TOKEN
2. Get All Users
Request Type: GET
URL: http://localhost:5000/users
Headers:
Authorization: Bearer YOUR_ACCESS_TOKEN
Params:
page: Number (e.g., page=1)
3. Get User by ID
Request Type: GET
URL: http://localhost:5000/users/:user_id
Headers:
Authorization: Bearer YOUR_ACCESS_TOKEN
Params:
user_id: Number (replace :user_id with the actual user ID)
4. Create New User
Request Type: POST
URL: http://localhost:5000/users
Headers:
Content-Type: application/json
Body:
json

{
    "login": "newuser",
    "email": "newuser@example.com",
    "password": "password123",
    "full_name": "New User"
}
5. Change Avatar
Request Type: POST
URL: http://localhost:5000/users/avatar
Headers:
Authorization: Bearer YOUR_ACCESS_TOKEN
Body: Use form-data and include a file with the key avatar.
6. Update User by ID
Request Type: PUT
URL: http://localhost:5000/users/:user_id
Headers:
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
Body:
json

{
    "full_name": "Updated User",
    "password": "newpassword",
    "role": "admin"
}
7. Delete User by ID
Request Type: DELETE
URL: http://localhost:5000/users/:user_id
Headers:
Authorization: Bearer YOUR_ACCESS_TOKEN