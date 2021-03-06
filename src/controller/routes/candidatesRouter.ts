import express from 'express';
import { CandidateController } from '../CandidatesController';

export const candidatesRouter = express.Router();

const candidatesController = new CandidateController()

candidatesRouter.post('/register', candidatesController.register)
candidatesRouter.get('/getAllCandidates', candidatesController.getAllCandidates)
candidatesRouter.get('/getCandidate/:cpf', candidatesController.getCandidateByCpf)
candidatesRouter.post('/validate/:cpf', candidatesController.validateCandidate)