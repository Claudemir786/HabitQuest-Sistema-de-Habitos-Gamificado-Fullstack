import bcrypt, { hash } from 'bcrypt'

const salRounds = 10; //quantas vezes o algoritmo vai embaralhar a senha 

export async function hashPassword(password) {
    return await bcrypt.hash(password,salRounds);
}

export async function comparePassword(password,hashPassword) {
    return await bcrypt.compare(password,hashPassword);
}
