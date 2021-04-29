# Vidly Frontend
This is the frontend component of the Vidly application. Vidly is a demo API/web application that allows users to sign up and manage their movie rentals with a fake movie database.

The main page features a grid of movies that are paginated on the client side. Has CRUD operations to add, delete, edit, and read movies. The movies are filterable by genre and/or name and are also sortable by title, genre, stock, and rate.
![image](https://user-images.githubusercontent.com/43410999/116594073-d474b300-a8ef-11eb-9f0b-94cf75bb1aaf.png)

Users can register for an account. Usernames and password are stored with bcrypt hashing and salting in a MongoDB database. Logging in generates a JWT and stores it on the client for future protected API accesses.
![Screenshot from 2021-04-29 13-38-30](https://user-images.githubusercontent.com/43410999/116594802-9fb52b80-a8f0-11eb-9b49-47e91aef40f0.png)

## Running
Requires `node v14`. At the root of the project, run `npm start`.
