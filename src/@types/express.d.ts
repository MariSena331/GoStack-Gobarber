//Aqui estou adicionando mais um tipo para o Request e
//não subscrevendo
declare namespace Express {
    export interface Request {
        user: {
            id: string;
        }
    }
}