import { authHeader, BASEURL } from "./UserService";



export async function getHabit(){
    try {

        const result = await fetch(`${BASEURL}/read/habit`,{
            method:'GET',
            headers:await authHeader()            
        })

        if(!result.ok)throw new Error("dados não retornaram corretamente da API");

        const res = await result.json();
        return res.habits;
        
    } catch (error) {
        console.error("Falha ao buscar dados: ", error.message);
        return false;
    }
}

export async function completed(habit_id,xp_earned){
    try {
        console.log(`o que retornou ${habit_id} e ${xp_earned}`);
        const today = new Date();

        const date = today.toISOString().split('T')[0];
        console.log("data formatada: ", date)
        const result = await fetch(`${BASEURL}/completed/habit`,{
            method:"POST",
            headers:await authHeader(),
            body:JSON.stringify({habit_id,date,xp_earned})
        })

        if(!result.ok)throw new Error("Dados não retornaram corretamente da API")
            return true;

    } catch (error) {
        console.error("Falha ao buscar dados", error.message);
        return false;
    }
}

export async function create(title,xp){
    try {

        const result = await fetch(`${BASEURL}/create/habit`,{
            method:'POST',
            headers:await authHeader(),
            body:JSON.stringify({title,xp})
        })

        if(!result.ok)throw new Error("os dados não retornaram corretamente da API");

        return true;
        
    } catch (error) {
        console.error("Falha ao criar hábito: ", error.message);
        return false;
    }
}