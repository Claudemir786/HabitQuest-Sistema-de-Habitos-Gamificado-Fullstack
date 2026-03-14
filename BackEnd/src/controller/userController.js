// criação e verificação de login (feito)
//alteração de email e de senha 
//para a página de perfil => puxar o nome, email e nível para mostrar na tela depois 
import { changeEmailU, createUser, loginU } from "../DAO/userDao.js";
import { message } from "../utils/messageError.js";


export class User{

    async create(req,res){
        try {
            const{name,email,password} = req.body;
            //verifica se os dados foram enviados corretamente 
            if(!name || !email || !password)return message(res,"dados enviados incorretamente");
            
            const result = await createUser(name,email,password);           
            if(!result)return message(res,"não foi possível criar novo usuário");     
            
            return res.status(201).json({
                success:true, 
                message:"usuário criado com sucesso"                
            });
            
        } catch (error) {
            console.log("falha ao criar novo usuário: ", error);
            return message(res,"falha ao criar novo usuário");
        }
       

    }

    async login(req,res){
        try {
            const{email,password} = req.body;

            if(!email || !password)return message(res,"Dados enviados incorretamente");

            const result = await loginU(email,password)
            if(!result)return message(res,"login incorreto");

            return res.status(200).json({success:true, id:result});
            
        } catch (error) {
            console.log("falha ao fazer login de usuário: ", error);
            return message(res,"falha ao criar novo usuário");
        }
    }

    
    async chageEmail(req,res){
        try {

            const{email, newEmail} = req.body;
            if(!email || !newEmail)return message(res,"dados enviados incorretamente");
            
            const result = await changeEmailU(email, newEmail);
            if(!result)return message(res,"falha ao alterar email");

            res.status(200).json({success:"true", message:"Email alterado com sucesso"});
        
        } catch (error) {
            console.log("Erro ao alterar email: ", error.message);
            return false; 
        }
    }

    async changePassword(req,res){

    }

    //trás os dados do usuario, nome,email e nivel
    async getUser(req,res){

    }

    async deleteUser(req,res){

    }

}