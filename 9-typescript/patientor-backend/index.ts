import express from 'express';
const app = express();
const cors = require('cors')

// to use and allow for requests from all origins
app.use(cors())

// setup request body for JSON parsing
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});