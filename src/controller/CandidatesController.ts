import { Request, Response } from 'express';
import { CandidatesBusiness } from '../business/CandidatesBusiness';
import { CandidatesDatabase } from '../data/CandidatesDatabase';
import { RegisterInputDTO } from '../business/model/Candidate';

const candidateBusiness = new CandidatesBusiness(
    new CandidatesDatabase
)

export class CandidateController {
    async register(req: Request, res: Response) {
        try {
            const input: RegisterInputDTO = {
                name: req.body.name,
                email: req.body.email,
                cpf: req.body.cpf,
                phoneNumber: req.body.phoneNumber,
                skills: req.body.skills
            }

            await candidateBusiness.registerCandidate(input)

            res.status(200).send(req.body.name)
        } catch (error) {
            if (error.message.includes('Duplicate')) {
                res.status(409).send('CPF já registrado!')
            } else {
                res.status(error.statusCode || 400).send({ error: error.message })
            }
        }
    }

    async getAllCandidates(req: Request, res: Response) {
        try {
            const result = await candidateBusiness.getAllCandidates()

            res.status(200).send(result)
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }

    async getCandidateByCpf(req: Request, res: Response) {
        try {
            const cpf = req.params.cpf

            const result = await candidateBusiness.getCandidateByCpf(cpf)

            res.status(200).send(result)
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }

    async validateCandidate(req: Request, res: Response) {
        try {
            const candidateCpf = req.params.cpf
            const validation = req.body.validation
            const validationTime = req.body.validationTime

            await candidateBusiness.validateCandidate(candidateCpf, validation, validationTime)

            res.status(200).send('Validado!')
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
}