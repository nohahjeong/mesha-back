import { Database } from './Database';
import { Candidate } from '../business/model/Candidate';

export class CandidatesDatabase extends Database {
    public async registerCandidate(candidate: Candidate): Promise<void> {
        try {
            await this.getConnection().raw(`
                INSERT INTO ${this.tableNames.candidates} (name, email, cpf, phoneNumber, skills)
                VALUES ('${candidate.name}', '${candidate.email}', '${candidate.cpf}', '${candidate.phoneNumber}', '${candidate.skills}')
            `)
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }

    public async selectAllCandidates(): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
                SELECT * FROM ${this.tableNames.candidates}
                ORDER BY name ASC
            `)

            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }

    public async selectCandidateByCpf(cpf: string): Promise<any> {
        try {
            const result = await this.getConnection().raw(`
                SELECT * FROM ${this.tableNames.candidates}
                WHERE cpf = '${cpf}'
            `)

            return result[0]
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }

    public async validateCandidate(cpf: string, validation: boolean, validationTime: Date): Promise<void> {
        try {
            await this.getConnection().raw(`
                UPDATE ${this.tableNames.candidates}
                SET validation = ${validation}, validationTime = "${validationTime}"
                WHERE cpf = "${cpf}";
            `)
        } catch (error) {
            throw new Error(error.sqlMessage)
        } finally {
            await Database.destroyConnection()
        }
    }
};