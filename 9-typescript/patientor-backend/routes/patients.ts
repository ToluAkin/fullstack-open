import express from 'express';
import { v1 as uuid } from 'uuid';
import patients from '../data/patients.json';
import { Patient, PatientPreview } from "../src/types";
import toNewPatientEntry from "../src/utils";

const router = express.Router();

router.get('/', (_req, res) => {
    const patientsData: PatientPreview[] = patients.map(patient => {
        const { ssn, ...restObject } = patient
        return restObject
    })
    res.json(patientsData);
});

router.post('/', (req, res) => {
    const { name, ssn, dateOfBirth, gender, occupation } = req.body
    const id = uuid()

    try {
        const newPatient: Patient = toNewPatientEntry({ id, name, ssn, dateOfBirth, gender, occupation })
        patients.push(newPatient)
        res.json(newPatient)
    } catch (e: unknown) {
        let errorMessage = 'Something went wrong.';
        if (e instanceof Error) {
            errorMessage += ' Error: ' + e.message;
        }
        res.status(400).send(errorMessage);
    }
})

export default router;