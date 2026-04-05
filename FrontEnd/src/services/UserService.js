import { getToken, saveToken } from "./TokenService";



export const BASEURL = "http://192.168.3.24:3000";

export async function authHeader(){
    const token = await getToken('auth');
    return {"Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
    }
}



export async function loginU(email,password){
    try{
        const result = await fetch(`${BASEURL}/login`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({email,password})
        });

        if(!result.ok)throw new Error("Dados não retornaram corretamente da API");
        const res = await result.json();

        if(!res.token)throw new Error("Token não retornou da API corretamente");

        await saveToken(res.token);

        return true;

    }catch(error){
        console.error("falha ao buscar dados de login: ", error.message);
        return false;
    }
}


export async function createU(name,email,password){
    try {
        
        const result = await fetch(`${BASEURL}/create`,{
            method:"POST",
            headers: await authHeader(),
            body:JSON.stringify({name,email,password})           
        })
        if(!result.ok)throw new Error("Falha ao criar novo usuário na API");
        return true;
        
    } catch (error) {
        console.error("falha ao criar novo usuário: ", error);
        return false;
    }

}

export async function profileU(){


}