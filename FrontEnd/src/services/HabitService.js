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
        console.error("Falha ao buscar dados");
        return false;
    }
}