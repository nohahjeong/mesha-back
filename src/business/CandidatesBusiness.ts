import { CandidatesDatabase } from '../data/CandidatesDatabase';
import { ExpectationFailedError } from './error/ExpectationFailedError';
import { Candidate, RegisterInputDTO } from './model/Candidate';

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
    }
};