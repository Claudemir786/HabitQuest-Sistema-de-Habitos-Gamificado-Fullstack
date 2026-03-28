//buscar dados de a quantidade de habitos concluidos,xp total,taxa de sucesso em porcentagem e quantas conquistas desbloqueadas
//buscar quais conquistas foram desbloqueadas que vãoser mostardas na tela 

import { monthlyProgress } from "../DAO/statistcsDao.js";
import { message } from "../utils/messageError.js";

export class Statistic{
    
    async getMonthlyProgress(req,res){
        try {
            const{id} = req.body;

            const result = await monthlyProgress(id)
            if(!result)return message(res,"Erro, foi possivel retornar os dados estatisticos do mês");

            return res.status(200).json({success:true, result});
            
        } catch (error) {
            console.log("Falha ao buscar dados do mês atual: ", error.message);
            return message(res,"não foi possivel encontrar dados do mês atual");

        }
    }
}
