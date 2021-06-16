import { Database } from './Database';
import { Candidate } from '../business/model/Candidate';

export class CandidatesDatabase extends Database {
    public async registerCandidate(candidate: Candidate): Promise<void> {
        try {
            await this.getConnection().raw(`
                INSERT INTO ${this.tableNames.candidatesTableName} (name, email, cpf, phoneNumber, skills)
                VALUES ('${candidate.name}', '${candidate.email}', '${candidate.cpf}', '${candidate.phoneNumber}', '${candidate.skills}')
            `)
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }
};