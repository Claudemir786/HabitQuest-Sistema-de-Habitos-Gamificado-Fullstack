
//mensagem simples que se repete várias vezes no código
export function message(res,messageError){
    return res.status(401).json({success:false, message:messageError});
}