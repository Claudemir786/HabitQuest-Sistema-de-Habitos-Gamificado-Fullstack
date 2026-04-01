import { message } from "../utils/messageError.js";
import { verifyToken } from "../utils/tokenJwt.js";



export async function Auth(req,res,next){

   try {
    //pega o cabeçalho da requisição
    const header = req.headers.authorization;
    if(!header)return message(res,"header da requisição não foi enviado ")
    
    const [type,token] = header.split(" ");//divide o conteudo que veio em duas partes o tipo e o token
    if(type !== "Bearer" || !token)return message(res,"token ou tipo enviados incorretamente");
    
    const verify = verifyToken(token);//chama a função que verifica o token
    if(!verify)return message(res, "Token invalido");
    
    req.user = verify;

    next();    
   
    
   } catch (error) {
        console.log("Falha ao autenticar o token :", error.message);
        return messageFalse(res,"Falha ao autenticar o token");
   }
    


}