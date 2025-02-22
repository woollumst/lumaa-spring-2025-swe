import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import client from "./repository/db.js";
import authRoutes from "./controllers/authController.js";
import taskRoutes from "./controllers/taskController.js";

dotenv.config(); //env variables
const app = express(); //load express
const PORT = process.env.PORT || 5000; //grab port variable from env if available
app.use(express.json()); // load json compatibility
app.use(cors()); // load cors obj

app.use("/auth", authRoutes); // login, register routing and token dispersal handled in auth.js
app.use("/tasks", taskRoutes);

app.get('/', async (req, res) => { //home page
    try{ // test database connection?
        const result = await client.query('SELECT NOW()'); //test
        res.send(`Database connected! Server time: ${result.rows[0].now}`);
    } catch (error) {
        res.status(500).send('Database connection failed');
    }
});

/*app.get('/api/protected', authenticate, (req, res) => { // Test endpoint to test JWT authentication
    res.json({ message: ' you have access to this protected route', user: req.user });
});*/

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});