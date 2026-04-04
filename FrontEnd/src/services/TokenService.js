import * as SecureStore from "expo-secure-store";

//salva o token
export async function saveToken(token){

    await SecureStore.setItemAsync('auth', token)
} 

//utilizado para buscar o token que foi salvo
export async function getToken(){
    return await SecureStore.getItemAsync('auth');
}

export async function logout(){

    await SecureStore.deleteItemAsync('auth');
}