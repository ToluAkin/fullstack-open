export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type PatientPreview = Omit<Patient, 'ssn'>

export enum Gender { male, female, other}
