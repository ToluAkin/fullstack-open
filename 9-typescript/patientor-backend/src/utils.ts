import { Patient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown, key: string): string => {
    if (!value || !isString(value)) {
        throw new Error(`Incorrect or missing ${ key }`);
    }

    return value;
}

const toNewPatientEntry = ({ id, name, ssn, dateOfBirth, gender, occupation }: Patient): Patient => {
    return {
        id: parseString(id, 'id'),
        name: parseString(name, 'name'),
        ssn: parseString(ssn, 'ssn'),
        dateOfBirth: parseString(dateOfBirth, 'date of birth'),
        gender: parseString(gender, 'gender'),
        occupation: parseString(occupation, 'occupation')
    }
};

export default toNewPatientEntry
