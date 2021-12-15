import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express()


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)
    const bmi = calculateBmi({ weight, height })

    res.send({ weight, height, bmi })
})

const PORT = 4003

app.listen(PORT, () => {
    console.log(`Server running on ${ PORT }`)
})