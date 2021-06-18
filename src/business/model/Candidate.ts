export class Candidate {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly cpf: string,
        public readonly phoneNumber: string,
        public readonly skills: string
    ) { };

    static toCandidateModel(candidate: any): Candidate {
        return new Candidate(
            candidate.name,
            candidate.email,
            candidate.cpf,
            candidate.phoneNumber,
            candidate.skills
        )
    }
};

export interface RegisterInputDTO {
    name: string,
    email: string,
    cpf: string,
    phoneNumber?: string,
    skills: string
};