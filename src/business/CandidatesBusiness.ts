import { CandidatesDatabase } from '../data/CandidatesDatabase';
import { Candidate, RegisterInputDTO } from './model/Candidate';
import { ExpectationFailedError } from './error/ExpectationFailedError';

export class CandidatesBusiness {
    constructor(
        private candidatesDatabase: CandidatesDatabase
    ) { };

    async registerCandidate(candidate: RegisterInputDTO) {
        if (!candidate.name || !candidate.email || !candidate.cpf || !candidate.skills) {
            throw new ExpectationFailedError('Preencha todos os campos obrigatórios!')
        }

        if (candidate.email.indexOf('@') === -1) {
            throw new ExpectationFailedError('O e-mail deve conter "@"!')
        }

        if (candidate.cpf.length < 14) {
            throw new ExpectationFailedError('Preencha o CPF corretamente!')
        }

        if (candidate.phoneNumber && candidate.phoneNumber.length < 15) {
            throw new ExpectationFailedError('Preencha o número de telefone corretamente!')
        }

        await this.candidatesDatabase.registerCandidate(
            Candidate.toCandidateModel({
                ...candidate
            })
        )
    };

    async getAllCandidates() {
        const result = await this.candidatesDatabase.selectAllCandidates()

        return result
    };

    async getCandidateByCpf(cpf: string) {
        const result = await this.candidatesDatabase.selectCandidateByCpf(cpf)

        return result
    };

    async validateCandidate(cpf: string, validation: boolean, validationTime: Date) {
        await this.candidatesDatabase.validateCandidate(cpf, validation, validationTime)
    };
};