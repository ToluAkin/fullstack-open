import express from 'express';
import patients from '../data/patients.json';

const router = express.Router();

interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}
type PatientPreview = Omit<Patient, 'ssn'>

router.get('/', (_req, res) => {
    const patientsData: PatientPreview[] = patients
    res.json(patientsData);
});

export default router;