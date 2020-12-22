export interface IIncidents {
    instances: Incident[]
}

export interface Incident {
    id: String;
    lat: number;
    lon: number;
    numberOfPeople: number;
    medicalNeeded: boolean;
    victimName: String;
    victimPhoneNumber: String;
    timestamp?: number;
    status: String;
    missionId?: String;
}
