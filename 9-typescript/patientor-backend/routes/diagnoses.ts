import express from 'express';
import diagnoses from '../data/diagnoses.json';

const router = express.Router();

interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

router.get('/', (_req, res) => {
    let diagnosesData: Diagnose[] = diagnoses
    res.json(diagnosesData);
});

export default router;