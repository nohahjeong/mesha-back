# Avaliação técnica FullStack NodeJS - `MESHA` - Back End

Desenvolvido em TypeScript com Express e Knex.

## Instruções

### `Script`

Execute o script `'$ npm run start'` para rodar o servidor.

OBS: Os dados de configuração do servidor foram omitidos por questão de segurança e privacidade.

### `Requisições`

A API possui 4 requisições:
- `Registrar usuário`

POST http://localhost:3003/candidates/register

Body


    {
        "name": "João",
        "email": "joao@email.com",
        "cpf": "000.000.000-00",
        "phoneNumber": "",
        "skills": "{\"git\":true,\"react\":true,\"php\":false,\"nodejs\":false,\"devops\":false,\"bancoDeDados\":true,\"typescript\":false}"
    }

- `Pegar todos os registros`

GET http://localhost:3003/candidates/getAllCandidates

- `Pegar informações de um registro pelo CPF`

GET http://localhost:3003/candidates/getCandidate/000.000.000-01

- `Validar ou não um registro pelo CPF`

POST http://localhost:3003/candidates/validate/000.000.000-01

Body


    {
        "validation": 0,
        "validationTime": "2020-01-20 12:33:23"
    }