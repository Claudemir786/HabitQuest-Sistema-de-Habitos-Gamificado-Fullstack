import {View,Text,ScrollView,TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { useCallback,useEffect, useState } from 'react';
import Fontisto from '@expo/vector-icons/Fontisto';
import DefaultButton from '../components/defaultButton';
import { useFocusEffect } from "@react-navigation/native";

import { changeEmail, changePasswor, changePassword, profileU } from '../services/UserService';



export default function Profile({navigation}){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const[level,setLevel] = useState("");
    const[xp,setXp] = useState("");
    const[currentStreak, setCurrentStreak] = useState(0);
    const[newPassword,setNewPassword] = useState("");
    const[newEmail,setNewEmail] = useState("");
    const[selectEmail, setSelectEmail] = useState(false);
    const[selectPassword, setSelectPassword] = useState(false);
    const[errorLoading, setErrorLoading] = useState(false);
    const[emailError,setEmailError]= useState(false)
    const[passwordError,setPasswordError]= useState(false)

     //sempre recarrega os dados da pagina para manter sempre atualizados
    useFocusEffect(
        useCallback(()=>{
        getUser() //renderiza a tela trazendo os dados do usuário
        },[])
    )

   

    async function getUser(){
        try {
            const user = await profileU()

            if(!user){
                setErrorLoading(true)
            }else{
                //seta os valores vindos nas variaveis de estado
                setName(user.name_user)
                setEmail(user.email)
                setLevel(user.level)
                setXp(user.xp)
                setCurrentStreak(user.current_streak)
            }
            
        } catch (error) {
            console.error("Falha ao carregar dados do usuário")
        }
        
    }

    async function handlenewEmail(){
       if(!newEmail.includes("@") || newEmail.length<9){
       
            setEmailError(true)
       }else{
        
        try {
            const result = await changeEmail(email,newEmail)
               if(result){
                    alert("email alterado com sucesso")
                }else{
                    alert("falha ao criar novo e-mail")
                }
            
        } catch (error) {
            console.error("falha ao criar novo email: ", error.message)
        }
       }
     }

    async function handlenewPassword(){
        
       const haslyrics = /[A-za-z]/.test(newPassword);//pelo menos uma letra
       const hasNumber = /\d/.test(newPassword);//pelo menos um numero
       const hasSimbol = /[@$!%*#?&]/.test(newPassword)//caracter especial

        if(haslyrics && hasNumber && hasSimbol && newPassword.length >=6){
            console.log("entrei")
            try {
                const result = await changePassword(email,newPassword)

                if(result){
                    alert("senha alterada com sucesso")
                }else{
                    alert("falha ao criar nova senha")
                }
                
            } catch (error) {
                console.error("Falha ao alterar a senha: ", error.message)
            }
        }else{
             
            setPasswordError(true);
        }

     }

     //componente caso os dados não carregem corretamente
     function LoadingFailure(){
        return(
            <View>
                <Text style={{color:"#f80707", fontSize:25}}>Dados do perfil não foram carregados corretamente</Text>
            </View>
        )
     }
      //componente usado quando o email for invalido
     function ErrorEmail(){

        return(
         <View>
                <Text style={{color:"#f70909", fontSize:20 }}>
                    Email incorreto, insira um email válido
                </Text>
            </View>
        )

     }
      //componente usado quando a senha for invalida
     function ErrorPassword(){
        return(
            <View>
                <Text style={{color:"#f70909", fontSize:20 }}>
                    Falha, senha deve ter no mínimo 6 caracteres conter letras e numeros e caracter especial
                </Text>
            </View>
        )
     }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.icon}>{/*icone */}
                    <Feather name="user" size={60} color="#fff" />
                </View>
              
                <View>{/*nome e e-mail */}
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>{email}</Text>

                </View>
                <View style={styles.levelXp}>{/*nivel e xp */}
                    <Text style={styles.level}>Nível {level}</Text>
                    <Text style={styles.level}>Xp {xp}</Text>
                </View>
                <View style={styles.streak}>{/*sequência */}
                    <Text style={styles.streakNumber}>{currentStreak}</Text>
                    <Text style={styles.streakTitle}>Sequência Atual em Dias</Text>
                </View>
                  {/*Se os dados não forem carregados */}
                {errorLoading &&(
                    <LoadingFailure/>
                )}
            </View>
            <View style={styles.card2}>{/*card 2 */}
                <Text style={styles.configText}>Configurações da conta</Text>
               
                <TouchableOpacity style={[styles.button, {marginBottom:20}]}
                onPress={()=>setSelectEmail(true)}>

                    <View style={{justifyContent:'center', marginRight:25, marginLeft:20}}>
                        <Fontisto name="email" size={24} color="#5698E1" /> 
                    </View>
                   <View>
                        <Text style={styles.textButton}>Alterar Email</Text>
                        <Text style={styles.textButton}>{email}</Text>
                    </View>
                </TouchableOpacity>
                {selectEmail && (
                    <>
                     <TextInput placeholder='Digite o novo email' 
                       value={newEmail}
                       onChangeText={setNewEmail}
                       style={styles.input}
                    />              
                    <DefaultButton name='Alterar' handle={() =>handlenewEmail()} />
                    {/*se o email for incorreto*/}
                    {emailError &&(
                        <ErrorEmail/>
                    )}
                    <View style={{marginBottom:15}}></View>
                  
                    </>            

                )}

                <TouchableOpacity style={[styles.button, {marginBottom:20}]}
                onPress={()=>setSelectPassword(true)}
                >
                    <View style={{justifyContent:'center', marginRight:25, marginLeft:20}}>
                        <Feather name="lock" size={24} color="#5698E1" />
                    </View>                  

                    <View>
                        <Text style={styles.textButton}>Alterar Senha</Text>
                        <Text style={styles.textButton}>********</Text>
                    </View>
                </TouchableOpacity>
                {selectPassword &&(
                    <>
                    <TextInput placeholder='Digite a nova senha' 
                       value={newPassword}
                       onChangeText={setNewPassword}
                       style={styles.input}
                       secureTextEntry={true}
                    />
                    <DefaultButton name='Alterar' handle={()=>handlenewPassword()}/>
                    {/*se a senha for incorreta */}
                    {passwordError &&(
                        <ErrorPassword/>
                    )}
                    </>
                )}
                
             
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#F0F8FF",
        flex:1,

    },
    card:{
        backgroundColor:"#5698E1",
        padding:30,
        width:"90%",
        alignSelf:'center',
        marginTop:50,
        borderRadius:15
    },
    icon:{
        backgroundColor:'#7DB0E7',
        borderRadius:80,     
        alignItems:'center',
        width:'50%',
        alignSelf:'center',
        paddingBottom:40,
        paddingTop:40

    },
    name:{
        textAlign:'center',
        marginTop:10,
        color:"#fff",
        fontSize:30,
        fontWeight:'bold'
    },
    email:{
        textAlign:'center',
        marginTop:5,
        color:"#fff",
        fontSize:20,

    },
    level:{
        color:"#fff",
        marginTop:25,
        fontSize:25,
        fontWeight:'600'
    },
    levelXp:{
        flexDirection:'row',
        justifyContent:'space-between',

    },
    streak:{
        backgroundColor:"#81B5E4",
        borderRadius:15,
        width:'50%',
        alignSelf:'center',
        marginTop:30,
        padding:15,       

    },
    streakNumber:{
        fontSize:30,
        color:"#fff",
        fontWeight:'700',
        textAlign:'center',
        
    },
    streakTitle:{
        color:'#fff',
        textAlign:'center',
        fontSize:20

    },
    button:{
        backgroundColor:'#F0F8FF',
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#94b5d3',
        borderRadius:15,        
        
    },
    card2:{
        backgroundColor:'#fff',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#94b5d3',
        width:'90%',
        alignSelf:'center',
        marginTop:40,
        padding:20,
        marginBottom:50,

    },
    configText:{
        fontSize:22,
        fontWeight:'700',
        marginBottom:30,
        color:'#163751'
    },
    textButton:{
        color:'#163751', 
        fontWeight:'600',
        fontSize:18,
        marginTop:5
    },
    input:{
        borderWidth:1,
        padding:15,
        borderRadius:15,
        borderColor:'#94b5d3'

    }
   
    //#788087
})