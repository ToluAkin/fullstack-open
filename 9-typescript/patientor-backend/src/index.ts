import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'

import diagnosesRouter from '../routes/diagnoses'
import patientsRouter from '../routes/patients'

const app = express();

// to use and allow for requests from all origins
app.use(cors())

// setup request body for JSON parsing
app.use(express.json());

app.use(bodyParser.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter)
app.use('/api/patients', patientsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});