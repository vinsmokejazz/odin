// Import the dotenv module to load environment variables from the .env file
require("dotenv").config();

// Import express for building the web server and mongoose for MongoDB interaction
const express=require("express");
const mongoose=require("mongoose");


// Import the route handlers for user, course, and admin functionality from the routes folder
const {userRouter}=require("./routes/user");
const {todoRouter}=require("./routes/todo");
const {MONGODB_URL}=require("./config");

// Initialize the express application
const app =express();

// Middleware to automatically parse incoming JSON requests and make it available in req.body
app.use(express.json());

const PORT= process.env.PORT || 3000;
// Use the imported routers for handling specific routes
// All user-related requests will go to /api/v1/user
app.use("/api/v1/user",userRouter);
app.use("/api/v1/todo", todoRouter);
 
// Main function to handle database connection and server start
async function main(){
  try{
    await mongoose.connect(MONGODB_URL);

    console.log("connected to db");

    app.listen(PORT,()=>{
      // Log a message to indicate that the server is running and listening for requests
      console.log(`Server is running on port ${PORT}`);
    });
  } catch(error){
    console.error("failed to connect db");
  }
}

// Invoke the main function to initiate the server and database connection
main();