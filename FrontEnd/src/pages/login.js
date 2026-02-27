import {Text,View,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import Logo from '../components/logoTitleApp'
import Input from '../components/defaultInput'
import DefaultButton from '../components/defaultButton'
import Footer from '../components/footer'


export default function Login({navigation}){

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
                    Bem-vindo de volta!
                </Text>
                <Text style={styles.subTitle}>
                    Entre para continuar sua jornada
                </Text>
            </View>

            {/*inputs*/}
            <View style={{marginBottom:20}}>
               
                <Input name='Email' placeholder='seu@email.com' />                         
                <Input name='Senha' placeholder={'*******'} secureText={true}/>                              
            </View>

            {/*Botão*/}
            <View>
                <View style={{alignItems:'flex-end', width:'95%'}}>
                   <TouchableOpacity>
                        <Text style={{color:'#4A90E2', fontWeight:'500', fontSize:20}}
                        >Esqueceu a senha?
                        </Text>
                   </TouchableOpacity>
                </View>

                <DefaultButton name='Entrar'/>

                <View style={{flexDirection:'row', justifyContent:'center', marginTop:30, marginBottom:30}}>
                    <Text style={{fontSize:20, color:'#5B7C99'}}>Não tem uma conta?</Text>
                     <TouchableOpacity onPress={()=> navigation.navigate('register') }>
                        <Text style={{color:'#4A90E2', fontWeight:'700', fontSize:20}}>
                            Cadastre-se
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
    }
})
