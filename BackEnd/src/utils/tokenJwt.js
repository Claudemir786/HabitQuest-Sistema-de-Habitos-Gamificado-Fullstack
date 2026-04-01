import jwt from "jsonwebtoken";
const TOKEN = "9fA7kL2xQ8mZpR4vT1bH6nW3cY5uE0sD";


//cria o token
export function createToken(user){

    const token = jwt.sign({email: user.email, id:user.id}, TOKEN, {expiresIn:"1h"});//usa informações do usuário junto com o token padrão para gerar um token novo

    if(!token)return false;
    console.log("token criado com sucesso");
    return token;
}

//verifica se o Token enviado é valido
export function verifyToken(token){
    try {
        const verify = jwt.verify(token, TOKEN);
        return  verify;
        
    } catch (error) {
        return false;
    }
}