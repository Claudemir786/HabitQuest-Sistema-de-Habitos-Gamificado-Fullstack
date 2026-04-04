import {Text,View,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import Logo from '../components/logoTitleApp'
import Input from '../components/defaultInput'
import DefaultButton from '../components/defaultButton'
import Footer from '../components/footer'
import { useState } from 'react'
import { createU } from '../services/UserService'


export default function Register({navigation}){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [failureLogin, setFailureLogin] = useState(false);


    async function handleCreate(){
        try {
           
            if(!name || !email || !password || !passwordConfirm){                
                setFailureLogin(true);

            }else if(name <2 || !email.includes("@") || email < 9 
            || password < 6 || password !== passwordConfirm){
                
                setFailureLogin(true);
            }else{
               
                const result = await createU(name,email,password);

                if(result){
                    alert("Conta criada com sucesso");
                    navigation.navigate('login')
                }
                setFailureLogin(true);
            }

        } catch (error) {
            console.error("falha ao criar usuário");
        }
    }
    

    return(
        <ScrollView style={styles.container}>
            {/*Cabeçalho */}
          <View style={{marginTop:30,marginLeft:30, marginBottom:50}}>
             <Logo/>
          </View>

          {/*Corpo*/}
          <View style={styles.body}>

            {/*titulo */}
            <View style={styles.title}>
                <Text style={styles.mainTitle}>
                    Criar Conta
                </Text>

                <Text style={styles.subTitle}>
                    Comece sua jornada de transformação hoje
                </Text> 
               
            </View>

            {/*inputs*/}
            <View>
               
                <Input 
                name='Nome completo' placeholder='João Silva' 
                value={name} setValue={setName} />                                              
                <Input 
                name='Email' placeholder={'seu@email.com'} 
                value={email} setValue={setEmail}/>
                <Input 
                name='Senha' placeholder={"******"} secureText={true} 
                value={password} setValue={setPassword}/>               
                <Input 
                name='Confirmar senha' placeholder={"******"} secureText={true} 
                value={passwordConfirm} setValue={setPasswordConfirm}/>                               
               
            </View>
                {failureLogin &&(
                     <Text style={{color:'red', fontSize:20, textAlign:'center',fontWeight:'500'}}
                    >Falha ao criar conta, verifique se os campos foram digitados corretamente</Text>
                )}

            {/*Botão*/}
            <View>               

                <DefaultButton name='Criar conta' handle={handleCreate}/>

                <View style={styles.log}>
                    <Text style={{fontSize:20, color:'#5B7C99'}}>Já tem uma conta?  </Text>
                     <TouchableOpacity onPress={()=> navigation.navigate('login')}>
                        <Text style={{color:'#4A90E2', fontWeight:'700', fontSize:20}}>
                            Entrar
                        </Text>
                   </TouchableOpacity>
                </View>

            </View>

          </View>

            {/*rodapé */}
          <Footer/>
          
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F8FF'
    },
    body:{
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#989899',
        marginTop:75,
        width:'90%',
        alignSelf:'center',
        marginBottom:80
    },
    title:{
        width:'90%', 
        alignSelf:'center',
        marginTop:30,
        marginBottom:35

    },
    mainTitle:{
        textAlign:'center',
        fontSize:40,
        fontWeight:'bold',
        color:'#163751'
    },
    subTitle:{
        textAlign:'center',
        marginTop:15,
        fontSize:20,
        color:'#5B7C99'
    },
    log:{
        flexDirection:'row', 
        justifyContent:'center', 
        marginBottom:30,
        marginTop:40
    }
})
