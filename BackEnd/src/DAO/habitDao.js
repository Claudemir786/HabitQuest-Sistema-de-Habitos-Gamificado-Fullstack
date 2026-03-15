//quando o habito for concluido
//criação de um novo habito
//buscar todos os habitos já cadastrados e quantidade

import pool from "./database.js";

const pools = pool;

export async function createH(name,user,xp){
    try {

        const [result] = await pools.query(
            `INSERT INTO habit(name_habit,user_id,xp_reward)
            VALUES(?,?,?)`, [name,user,xp]);

        if(result.affectedRows === 0)throw new Error("fallha ao fazer o insert de um novo hábito");
        
        return true;
        
    } catch (error) {
        console.log("erro ao criar novo hábito: ", error.message);
        return false;
    }
}

export async function readH(id){

    try {
        
        const [rows] = await pools.query(`SELECT * FROM habit WHERE user_id = ?`, [id]); 
              
        if(rows.length === 0)throw new Error("Dados não retornaram corretamente do banco de dados");
        //console.log("dados que retornaram do banco de dados: ", rows);
        return rows;
        
    } catch (error) {
        console.log("Erro ao buscar todos hábitos cadastrados do usuário");
        return false;
    }
}

export async function completedH(habit_id,user_id,date,xp_earned){
    try {

        const [result] = await pools.query(`INSERT INTO habit_logs(habit_id,user_id,completed_at,xp_earned)
                                            VALUES(?,?,?,?)`, [habit_id,user_id,date,xp_earned]);

        if(result.affectedRows === 0)throw new Error("Não foi possivel criar habit_log no banco de dados");
        
        return true;
        
    } catch (error) {
        console.log("Erro, não foi possível criar habit_log: ", error.message);
        return false;
    }
}

async function checkAchievements(id_user) {
    //criar as conquistas no banco
    //criar a regra de desbloqueio

}

async function sumXp(id_user) {
    //somar o xp e adicionar na tabela de usuário
   
}
async function streak(id_user) {
    //buscar dados do usuário
    //criar datas
    //calcular a streak
    //atualizar a maior streak
    //atualizar banco

}
async function levelup(xp){
    //recebe o xp e sobe o nivel do usuário 
    //criar regras de nivel e aumentar caso necessário
}
