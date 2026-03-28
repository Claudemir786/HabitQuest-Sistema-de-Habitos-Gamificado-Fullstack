//buscar dados de a quantidade de habitos concluidos,xp total,taxa de sucesso em porcentagem e quantas conquistas desbloqueadas
//buscar quais conquistas foram desbloqueadas que vãoser mostardas na tela 

import pool from "./database.js";

const pools = pool;

export async function monthlyProgress(id) {
    try{
       if(!id)throw new Error("Id não fornecido");       
      
       // calcula o xp do ultimos 30 dias
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);


        const [row] = await pools.query( `
            SELECT SUM(xp_earned) as total_xp 
            FROM Habit_logs 
            WHERE user_id = ? AND completed_at >= ?
        `,[id,thirtyDaysAgo]);

        if(row.length === 0)throw new Error("Erro ao fazer soma de xp de 30 dias atrás");

        const totalXp = row[0].total_xp;

        //calcula dados da streak
        const [rows] = await pools.query(`
            SELECT DISTINCT completed_at 
            FROM Habit_logs 
            WHERE user_id = ? AND completed_at >= ?
            ORDER BY completed_at DESC
        `, [id, thirtyDaysAgo]);


        // extrair apenas as strings de data para facilitar
        const logDates = rows.map(r => new Date(r.completed_at).toISOString().split('T')[0]);

        const streaks = getStreakStats(logDates);
    
         const result = {totalXp: totalXp, longest: streaks.longestStreak, totalDays:streaks.totalDaysActive }   
        return result;
        
    } catch (error) {
        console.log("Falha na funcção ao buscar dados: ", error.message);
        return false;
    }
}

function getStreakStats(dates) {
    if (dates.length === 0) return { longest: 0, totalDays: 0 };

    let longest = 0;
    let currentCount = 1;

    for (let i = 0; i < dates.length - 1; i++) {
        const current = new Date(dates[i]);
        const next = new Date(dates[i + 1]);

        // Calcula a diferença de dias entre uma entrada e a próxima
        const diff = (current - next) / (1000 * 60 * 60 * 24);

        if (diff === 1) {
            // Se a diferença for de exatamente 1 dia, a sequência continua
            currentCount++;
        } else {
            // Se pulou um dia, a sequência quebrou. 
            // Verificamos se essa que acabou foi a maior até agora.
            if (currentCount > longest) longest = currentCount;
            currentCount = 1; // Reseta para começar a contar a próxima
        }
    }

    // Compara uma última vez para o caso da maior sequência ser a última do loop
    longest = Math.max(longest, currentCount);

    return {
        longestStreak: longest,
        totalDaysActive: dates.length // Quantos dias ele cumpriu hábitos no mês
    };
}


  