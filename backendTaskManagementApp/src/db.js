import pkg from 'pg'; //postgresql connectivity import
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pkg; 

const client = new Client({ // create database connection object
  connectionString: process.env.DATABASE_URL, // use env variables to connect
});

// Attempt to connect to database automatically, log to console on success or failure
client.connect().then(() => console.log('Connected to Database')).catch((err) => console.error('Database connection error:', err.stack)); 

export default client;