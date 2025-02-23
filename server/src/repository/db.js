import pkg from 'pg'; //postgresql connectivity import
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg; 

const client = new Client({ // create database connection object
  connectionString: process.env.DATABASE_URL, // use env variables to connect
});

// Attempt to connect to database automatically, log to console on success or failure
client.connect().then(() => console.log('Connected to Database')).catch((err) => console.error('Database connection error:', err.stack)); 

async function initializeDB(){
  await client.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    username UNIQUE VARCHAR(50) NOT NULL,
    password TEXT NOT NULL
  `); // set up users table
  
  await client.query(`CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255) UNIQUE NOT NULL, 
    description TEXT, 
    isComplete BOOLEAN, 
    userId INT NOT NULL, 
    CONSTRAINT fk_user FOREIGN KEY userId REFERENCES users(id) ON DELETE CASCADE
  `};
    
  console.log("Tables created/exist");
}

initializeDB().catch(console.error);

export default client;