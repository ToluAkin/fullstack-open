import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi = calculateBmi({ weight, height });

    if (!weight || !height) {
        return res.status(404).json({ error: "malformatted parameters" });
    } else {
        return res.status(200).json({ weight, height, bmi });
    }
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body

    if (Array.isArray(daily_exercises) && !isNaN(target)) {
        const responseBody = calculateExercises(daily_exercises, target)
        return res.status(200).json(responseBody)
    } else if (!daily_exercises || !target) {
        return res.status(404).json({ error: "parameters missing" })
    } else {
        return res.status(404).json({ error: "malformatted parameters" })
    }
});

const PORT = 4003;

app.listen(PORT, () => {
    console.log(`Server running on ${ PORT }`);
});