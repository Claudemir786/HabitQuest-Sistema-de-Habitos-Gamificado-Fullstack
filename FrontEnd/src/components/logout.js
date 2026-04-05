import { logout } from "../services/TokenService";



export default async function Logout({navigation}){

    await logout('auth')//encerra seção
    navigation.popToTop()//volta a tela inicial de navegação
}