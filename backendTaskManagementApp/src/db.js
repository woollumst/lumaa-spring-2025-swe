import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL from .env
});

client.connect().then(() => console.log('Connected to PostgreSQL')).catch((err) => console.error('Database connection error:', err.stack));

export default client;