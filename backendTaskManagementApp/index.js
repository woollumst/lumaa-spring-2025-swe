const express = require('express');
const app = express();

const PORT = process.env.PORT || 30000;

app.get('/', (req, res) => {
    res.send('Task Management App');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});