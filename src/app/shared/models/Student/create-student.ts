export class CreateStudent {
    universityId : number;
    facultyId : number;
    specialityByFacultyId : number;
    specializationId : number;
    name : string;
    lastname : string;
    course : number;
    telegram : string;
    instagram : string;
    canHelp : boolean; 
}

export class Mentor{
    name: string;
    telegram: string;
    university: string;
    speciality: string;
    course: number;
    canHelp: boolean;    
}
