# MERN To-Do List App

A simple and modern to-do list application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js).

## Tech Stack

* **MongoDB**: The database used to store your tasks.
* **Express.js**: The backend framework that handles requests from the frontend.
* **React.js**: The frontend library used to build the user interface.
* **Node.js**: The environment that runs the backend server code.

## Directory Structure

2025201036
|___backend/
    ├── controllers/
    │   └── todoController.js   # Logic for handling requests
    ├── models/
    │   └── todoModel.js        # Database schema for a to-do
    ├── routes/
    │   └── todoRoutes.js       # API endpoints
    ├── .env                    # Environment variables (secrets)
    ├── package.json
    └── server.js               # Main server entry point

|---frontend/
    ├── src/
    │   ├── components/         # Reusable React components
    │   │   ├── AddTodoForm.jsx
    │   │   ├── TodoItem.jsx
    │   │   └── TodoList.jsx
    │   ├── App.jsx             # Main app component
    │   ├── index.css           # Global styles
    │   └── main.jsx            # React entry point
    └── package.json



## What it does

This application allows you to keep track of your tasks. You can:
* Add a new task to your list.
* View all of your current tasks.
* Mark a task as "complete".
* Delete a task you no longer need.


## Project Structure

Here is an overview of the project's folder structure.


## Prerequisites

Before you begin, make sure you have the following installed on your computer:
* Node.js and npm
* A MongoDB Atlas account (for a cloud database) or MongoDB installed locally.

## How to Get Started

Follow these steps to get the application running on your local machine.

### 1. Backend Setup

This will start the server that connects to your database and handles the app's logic.

1.  **Go to the `backend` folder:**
    ```sh
    cd backend
    ```
2.  **Create an environment file:**
    Create a new file named `.env` in the `backend` folder and add the following lines. You must add your own MongoDB connection string.
    ```
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    ```
3.  **Install the necessary packages:**
    ```sh
    npm install
    ```
4.  **Start the server:**
    ```sh
    npm run dev
    ```
    The server should now be running. Keep this terminal open!

### 2. Frontend Setup

This will start the user interface that you see and interact with in your browser.

1.  **Open a new terminal window.**
2.  **Go to the `frontend` folder:**
    ```sh
    cd frontend
    ```
3.  **Install the necessary packages:**
    ```sh
    npm install
    ```
4.  **Start the application:**
    ```sh
    npm run dev
    ```
    Your web browser should automatically open to the to-do list application.

## How to Use the App

Once both the backend and frontend are running:
1.  Browser will show the to-do list.
2.  Type a task into the input box and click "Add To-Do".
3.  Click the checkbox next to a task to mark it as complete.
4.  Click the "Delete" button to remove a task.
