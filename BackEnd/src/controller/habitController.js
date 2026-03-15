//quando o habito for concluido
//criação de um novo habito (feito)
//buscar todos os habitos já cadastrados e quantidade

import { completedH, createH, readH } from "../DAO/habitDao.js";
import { message } from "../utils/messageError.js";

export class Habit{
    
    async create(req,res){
        try {
          //o user é seu Id, que vai ser pego depois pelo token;
            const{name_habit,user,xp_reward} = req.body;
            if(!name_habit || !user)return message(res,"dados enviados incorretamente");
            
            //hábitos padrão sempre serão 10 de xp
            let xp = xp_reward;
            if(xp === 0) xp = 10;               
           
           const result = await createH(name_habit,user,xp);

            if(!result)return message(res,"não foi possivel criar novo hábito");

            return res.status(201).json({success:true, message:"hábito criado com sucesso"});
            
        } catch (error) {
            console.log("Erro ao criar hábito: ", error);
            return message(res,"falha ao criar hábito");
        }
    }

    async getHabit(req,res){
        try {
            const {id} = req.body;
            if(!id)return message(res,"dados enviados incorretamente");

            const result = await readH(id);
            if(!result)return message(res,"não foi possivel lêr todos os hábitos");

            return res.status(200).json({success:true, habits:result});

        } catch (error) {
            console.log("Falha ao buscar os hábitos")
            return message(res,"Erro ao buscar usuários");
        }
     
    }

    async completed(req,res){
        try {
            const{habit_id,user_id,date,xp_earned} = req.body
            if(!habit_id || !user_id || !date || !xp_earned)return message(res,"dados enviados incorretamente");

            const result = await completedH(habit_id,user_id,date,xp_earned);
            if(!result)return message(res,"não foi possivel criar habit log");

            return res.status(201).json({success:true, message:"habito completado com sucesso"});

            
        } catch (error) {
            console.log("Falha na criação de habit log")
            return message(res,"Erro, não foi possivel realizar conslusão de hábito");
        }

    }

    
}