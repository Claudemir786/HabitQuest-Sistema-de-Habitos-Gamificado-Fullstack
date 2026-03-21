import pool from "./database.js";
import { readtUser } from "./userDao.js";

const pools = pool;

export async function checkAchievements(id_user) {
   
    //criar a regra de desbloqueio
    try {
       const user = await readtUser(id_user);//busca o usuário
       const achievements = await getAchievements(id_user);//busca todas as conquistas
       
       if(!achievements)return false;
        

        //verifica as o xp e a streak antes de acessar o banco 
        for(let achievement of achievements){

            let unlocked = false;

            //xp
            if(user.xp && achievement.xp_required >= achievement.xp_required){
                unlocked  = true;
            }

            //streak
            if(user.current_streak && achievement.streak_required >= achievement.streak_required){
                unlocked=true;
            }

            //se desbloqueou
            if(unlocked){
               const result = await unlockedAchievement(id_user,achievement.id);
               if(!result)return false;
               
            }         
        }
        
    } catch (error) {
        console.log("fallha ao verificar as conquistas do usuário: ", error.message);
        return false;
    }

}

//verifica os acheievements que não foram desbloqueados ainda
export async function getAchievements(id) {
    try{

        const [rows] = await pools.query(`SELECT * FROM achievement a WHERE NOT EXISTS(
                                            SELECT 1
                                            FROM user_achievement ua
                                            WHERE ua.user_id = ?
                                            AND ua.achievement_id = a.id)`,[id]);

        if(!rows.length === 0 )throw new Error("Falha: o banco não encontrou os dados da tabela");
        
        return rows;
        
    }catch(error){
        console.log("Erro ao buscar todos os achievements: ", error.message);
        return false;
    }
    
}

export async function unlockedAchievement(id_user, achievement_id){

    try {

        const [result] = await pools.query(`INSERT INTO user_achievement (user_id, achievement_id)VALUE(
                                            ?,?)`, [id_user, achievement_id]);

        if(result.affectedRows === 0 )throw new Error("Falha ao criar conquista de usuário no banco de dados");

        return true;
        
        
    } catch (error) {
        console.log("falha ao criar conquista desbloqeuada de usuário: ", error.message);
        return false;
    }

} 