//quando o habito for concluido
//criação de um novo habito
//buscar todos os habitos já cadastrados e quantidade

import { checkAchievements } from "./achievement.js";
import pool from "./database.js";
import { readtUser } from "./userDao.js";

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

        const sumXpUser = await sumXp(user_id);
        if(sumXpUser){
           const streak = await streak(user_id);
           
           if(streak){
                await checkAchievements(user_id);
           }
            
        }
        return true;
        
    } catch (error) {
        console.log("Erro, não foi possível criar habit_log: ", error.message);
        return false;
    }
}




async function sumXp(id_user) {
    //somar o xp e adicionar na tabela de usuário
    
  try{
    const [result] = await pools.query(`UPDATE users u
                                        SET xp = (
                                        SELECT SUM(xp_earned)
                                        FROM habit_logs h
                                        WHERE h.user_id = u.id
                                        )WHERE u.id = ?`, [id_user]);

    if(result.affectedRows === 0)throw new Error("falha ao recalcular o xp no banco de dados");

    return true;

  }catch(error){
    console.log("falha na função se somar XP: ", error.message);
    return false;
  }
}
async function streak(id_user) {
    //buscar dados do usuário
    //criar datas
    //calcular a streak
    //atualizar a maior streak
    //atualizar banco

    try {
        //busca o usuário
        const user = await readtUser(id_user);

        //deixa a data no formato certo para adicionar no banco
        function formateDate(date){
            return date.toLocaleDateString('en-CA');
        }

        //pega a data de hoje
        const today = formateDate(new Date());

        //data de ontem
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate()-1);
        const yesterday = formateDate(yesterdayDate);

        //guarda a ultima data completada
        const lastDate = user.last_completed_date ? formateDate(new Date(user.last_completed_date)):null;
        
        //se a ultima data for null
        if(!lastDate){
            user.current_streak = 1;

        }else if(lastDate === today){
            //não fazer nada pois já contou hoje

        }else if(lastDate === yesterday){
            user.current_streak += 1;

        }else{
            user.current_streak = 1;
        }

        //se a sequencia atual for maior que a maior aequencia ja feita
        if(user.current_streak > user.longest_streak){

            user.longest_streak = user.current_streak;
        }

        user.last_completed_date = today;

        const update = await updateStreak(user.current_streak,user.longest_streak,user.last_completed_date,id_user);


    } catch (error) {

        console.log("Falha ao atualizar a streak: ", error.message);
        return false;
    }

}

async function updateStreak(current,longest,last,id){
    try {
    
        const [result] = await pools.query(`UPDATE users SET current_streak = ?, 
                                            longest_streak = ?, 
                                            last_completed_date = ?,
                                            WHERE id = ?`, [current,longest,last,id]);

        if(result.affectedRows === 0)throw new Error("Falha no banco ao fazer o update de streak");

        return true;
        
    } catch (error) {
        console.log("Falha ao fazer update de streak: ", error.message);
        return false;
    }

}

async function levelup(xp){
    //recebe o xp e sobe o nivel do usuário 
    //criar regras de nivel e aumentar caso necessário
}
