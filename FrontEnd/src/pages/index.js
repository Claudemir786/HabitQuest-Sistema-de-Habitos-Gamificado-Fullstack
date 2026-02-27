import{View,Text,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import Logo from '../components/logoTitleApp'
import DefaultButton from '../components/defaultButton'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Index({navigation}){

    return(
        <View style={styles.container}>

            {/*Cabeçalho */}
           <View style={styles.header}>
                <Logo/>
                <View style={styles.button} >
                    <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                    <Text style={styles.textbutton}>Login</Text>
                </TouchableOpacity>
                </View>
               
                <View style={[styles.button, {backgroundColor:'#4A90E2'}]}>
                    <TouchableOpacity onPress={()=>navigation.navigate('register')} >
                    <Text style={[styles.textbutton, {color:"#fff"}]}>Cadastrar</Text>
                </TouchableOpacity>
                </View>
                 
           </View>

            {/*Corpo */}
            <ScrollView style={styles.body}>

                {/*titulo página */}
                <View style={{marginBottom:50}} >
                    {/*Titulo principal */}
                    <View style={styles.mainTitle}>
                        <Text style={{textAlign:'center', fontSize:45, fontWeight:'bold', color:'#1A3A52'}}>Transforme Hábitos em Conquistas</Text>
                    </View>
                    {/*subtitulo */}
                    <View style={styles.subTitle}>
                        <Text style={{textAlign:'center', fontSize:20, color:'#5B7C99', fontWeight:'500'}}>
                            Construa hábitos positivos de forma divertida com gamificação.Ganhe pontos,suba de nível e conquiste suas metas diárias</Text>
                    </View>
                    {/*botão um */}
                    <DefaultButton name='Começar Agora' handle={()=>navigation.navigate('register')}/>
                    {/*botão dois */}
                    <DefaultButton name='Já tenho conta' color='#F0F8FF' colorText='#4A90E2' handle={()=>navigation.navigate('login')}/>                 

                </View>

                {/*Cards*/}
                <View>
                    {/*card 1 */}
                    <View style={styles.card}>
                        {/*icone */}
                        <View style={styles.iconCard}>
                            <Feather name="target" size={50} color="#4A90E2" />
                        </View>

                        {/*titulo */}
                        <Text style={{textAlign:'center', fontSize:30, fontWeight:'600', color:'#1A3A52'}}
                        >Metas Personalidas</Text>
                        
                        {/*descrição*/ }
                        <Text style={{textAlign:'center', fontSize:20, marginBottom:35, marginTop:20, color:'#5B7C99', fontWeight:'500'}}
                        >Crie hábitos que fazem sentido para você e acompqanhe seu progresso diário</Text>
                    </View>

                    {/*card 2 */}
                    <View style={styles.card}>
                          {/*icone */}
                        <View style={styles.iconCard}>                            
                            <AntDesign name="thunderbolt" size={50} color="#4A90E2" />
                            
                        </View>

                        {/*titulo */}
                        <Text style={{textAlign:'center', fontSize:30, fontWeight:'600', color:'#1A3A52'}}
                        >Sistemas de Pontos</Text>
                        
                        {/*descrição*/ }
                        <Text style={{textAlign:'center', fontSize:20, marginBottom:35, marginTop:20, color:'#5B7C99', fontWeight:'500'}}
                        >Ganhe XP e recompensas ao completar suas tarefas e manter sequências</Text>
                    </View>

                    {/*card 3 */}
                    <View style={styles.card}>
                          {/*icone */}
                        <View style={styles.iconCard}>
                            <Feather name="star" size={50} color="#4A90E2" />
                        </View>

                        {/*titulo */}
                        <Text style={{textAlign:'center', fontSize:30, fontWeight:'600', color:'#1A3A52'}}
                        >Conquistas</Text>
                        
                        {/*descrição*/ }
                        <Text style={{textAlign:'center', fontSize:20, marginBottom:35, marginTop:20, color:'#5B7C99', fontWeight:'500'}}
                        >Desbloqueie badges e conquistas especiais conforme evolui</Text>
                    </View>
                </View>
                <View style={{width:'90%', alignSelf:'center', marginBottom:30}}>
                    <Text style={{fontSize:20, textAlign:'center', color:'#5B7C99'}}>©2026 HabitQuest - Transforme sua vida um hábito por vez</Text>
                </View>

            </ScrollView>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F8FF'
    },
    header:{
        marginLeft:15,
        marginTop:30,
        flexDirection:'row'    
    },
    body:{
        
    },
    button:{
        justifyContent:'center',
        borderRadius:8, 
        justifyContent:'center',
        padding:8,
        marginLeft:10
    },
    textbutton:{
        fontSize:18
    },
    mainTitle:{
        marginTop:60,
        marginBottom:25,
    },
    subTitle:{
        justifyContent:'center',
        alignItems:'center',
        width:'90%',
        alignSelf:'center'
    },
    card:{
        width:'90%',
        alignSelf:'center',
        backgroundColor:'#fff',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#989899',
        marginBottom:30,        
    },
    iconCard:{
        alignItems:'center',
        marginTop:25,
        marginBottom:25,
        backgroundColor:'#d5eafc',
        borderRadius:80,
        alignSelf:'center',
        padding:18

    }

})


