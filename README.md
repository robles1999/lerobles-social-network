# Social Network API

This is a console application that provides a Social Network API. It allows you to interact with various routes to manage users, thoughts, reactions, and friend lists.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository to your local machine:
2. Navigate to the project directory:
3. Install the dependencies:
4. Configure the database connection by updating the `config.js` file with your MongoDB connection details.

## Usage

To start the server and sync the Mongoose models with the MongoDB database, follow these steps:

1. Open a terminal or command prompt.

2. Navigate to the project directory if you're not already there.

3. Run the following command:npm start

This will start the server and display a message indicating that the server is running.

## Testing the API

You can use a tool like [Insomnia](https://insomnia.rest/) to test the API routes. Follow the steps below to test each type of route:

### GET Routes

To view data for GET routes in a formatted JSON, follow these steps:

1. Open Insomnia.

2. Set the request method to GET.

3. Enter the URL for the desired route:

- Users: `http://localhost:3000/api/users`
- Thoughts: `http://localhost:3000/api/thoughts`

4. Send the request.

The response will contain the data for the specified route in a formatted JSON.

### POST Routes

To create new users, thoughts, reactions, or friend lists, follow these steps:

1. Open Insomnia.

2. Set the request method to POST.

3. Enter the URL for the desired route:

- Users: `http://localhost:3000/api/users`
- Thoughts: `http://localhost:3000/api/thoughts`
- Reactions: `http://localhost:3000/api/thoughts/:thoughtID/reactions`
- Friend Lists: `http://localhost:3000/api/users/:userID/friends/:friendID`

4. In the request body, provide the necessary data in JSON format.

5. Send the request.

The response will indicate whether the creation was successful.

### PUT Routes

To update users or thoughts, follow these steps:

1. Open Insomnia.

2. Set the request method to PUT.

3. Enter the URL for the desired route:

- Users: `http://localhost:3000/api/users/:userId`
- Thoughts: `http://localhost:3000/api/thoughts/:thoughtId`

4. In the request body, provide the updated data in JSON format.

5. Send the request.

The response will indicate whether the update was successful.

### DELETE Routes

To delete users, thoughts, reactions, or friend lists, follow these steps:

1. Open Insomnia.

2. Set the request method to DELETE.

3. Enter the URL for the desired route:

- Users: `http://localhost:3000/api/users/:userId`
- Thoughts: `http://localhost:3000/api/thoughts/:thoughtId`
- Reactions: `http://localhost:3000/api/thoughts/:thoughtId/reactions/:reactionId`
- Friend Lists: `http://localhost:3000/api/users/:userId/friends/:friendId`

4. Send the request.

The response will indicate whether the deletion was successful.