// criação e verificação de login
//alteração de email e de senha 
//para a página de perfil => puxar o nome email e nivel para mostrar na tela depois 

import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import pool from "./database.js";

const pools = pool;

export async function createUser(name,email,password) {
    try {
        const passwordCrypt = await hashPassword(password);// aciona a função que criptografa a senha

        const [result] = await pools.query(`INSERT INTO users(name_user,password,email)VALUES
                                            (?,?,?) `,[name,passwordCrypt,email]);

        //retorna true se o query for executada com sucesso                                    
        return result.insertId && result.affectedRows>  0 ? true : false;

        
    } catch (error){
        console.log("Erro ao criar usuário no banco: ", error);
        return false;
    }
    
}

export async function loginU(email,password){
    try {
        //procura o usuário no banco
        const [result] = await pools.query(`SELECT * FROM users WHERE email =  ? `, [email]);

        //caso não retorne os dados esperados pelo banco
        if(result.length === 0)throw new Error("Usuario não encontrado na base de dados");

        //guarda as informações do usuário 
        const user = result[0];
        
        //verifica se a senha é a mesma senha que está no banco
        const verifyPassword = await comparePassword(password,user.password);        
        if(!verifyPassword)throw new Error("A senha do usuário está incorreta");       
        return user.id; 

        
    } catch (error) {
        console.log("Erro ao encontrar usuário no banco de dados: ", error.message);
        return false;
    }
}

export async function changeEmailU(email,newEmail){
   try {

    //query feita para buscar primeiramente o id do usuário
    const [row] =  await pools.query(`SELECT * from users WHERE email = ?`, [email]);
    if(!row.affectedRows === 0)throw new Error("Falha ao encontrar email");// se a query falhar
    const userId = row[0].id;//guarda o id de usuário
    //console.log("userId: ", userId);//teste para verificar se o id foi capturado
    if(!userId)throw new Error("o id do usuário não foi encontrado");


    const [rows] = await pools.query(`UPDATE users SET email = ? WHERE id=?`, [newEmail,userId]);
    if(!rows.affectedRows === 0)throw new Error("Falha ao fazer update no banco de dados");
    return true;

    
   } catch (error) {
        console.log("Erro ao alterar email de usuário: ", error.message);
        return false;
   }
}

export async function chagePasswordU(id,password) {
    
}

export async function getUser(id){

}

export async function deleteUser(id){
    
}

