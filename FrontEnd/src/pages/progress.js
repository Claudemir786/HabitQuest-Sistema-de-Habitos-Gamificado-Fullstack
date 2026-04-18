import { View,Text,StyleSheet, ScrollView } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import { useCallback, useEffect, useState } from "react";
import { getStatisticMonthly } from "../services/HabitService";
import { useFocusEffect } from "@react-navigation/native";

const ErrorLooding = ()=>{
    <View style={{flex:1,alignItems:'center'}}>
        <Text style={{color:"#5f0101", fontSize:30}}>
            Não foi possível carregar os dados do usuário 😑
        </Text>

    </View>
}



export default function Progress({navigation}){

   const[dataMonthly,setDataMonthly] = useState("")//guarda os dados que retornarem
   const[errLoading,setErrLoading] = useState(false)//guarda o resultado caso o valor retornado seja false
   const[message,setMessage]=useState("")//mostra uma menssagem de acordo com os dados
   
   //sempre recarrega os dados da pagina para manter sempre atualizados
   useFocusEffect(
        useCallback(()=>{
        getProgress()
        },[])
    )

   async function getProgress(){
     const result = await getStatisticMonthly()
     if(result){
        setDataMonthly(result)
        messagesP(result)

     }else{
        setErrLoading(true)
     }
   }


   function messagesP(result){
        const xp = parseInt(result.totalXp)
        if(xp >=500){
            setMessage("🚀 Incrível! Você acumulou muito XP. Seu esforço está valendo a pena, continue nesse ritmo!")

        }else if(result.current_streak > 10){
            setMessage("🔥 Sequência forte! Você já está há vários dias consistente. Não quebre esse ritmo!")

        }else if(result.totalDays >=15){
            setMessage("👏 Ótimo progresso! Você está mantendo seus hábitos com frequência. Continue assim!")

        }else if(result.totalDays > 0){
            setMessage("💪 Você já começou, e isso é o mais importante. Continue firme nos seus objetivos!")
        
        }else{
            setMessage("📊 Aqui estão seus dados dos últimos 30 dias. Bora começar a evoluir!")
        }
   }
    return(
        <ScrollView style={styles.container}>
            {errLoading &&(
                <ErrorLooding/>
            )}
            {/*Linha 1 */}
            <View style={[styles.row, {marginTop:60}]}>

                <View style={styles.cardStreak}>

                    <View style={styles.icon}><Octicons name="flame" size={35} color="#4A90E2"/></View>                    
                    <Text style={styles.title}>{dataMonthly.current_streak}</Text>
                    <Text style={styles.subTitle}>Sequência Atual</Text>
                </View>               
                
            </View>

            {/*Linha 2 */}
            <View style={styles.row}>
                <View style={styles.card}>

                    <View style={styles.icon}><Octicons name="trophy" size={35} color="#4A90E2" /></View>
                    <Text style={styles.title}>{dataMonthly.longest}</Text>
                    <Text style={styles.subTitle}>Maior Sequência</Text>
                </View>

                <View style={styles.card}>

                    <View style={styles.icon}><Octicons name="calendar" size={35} color="#4A90E2"/></View>
                    <Text style={styles.title}>{dataMonthly.totalXp}</Text>
                    <Text style={styles.subTitle}>XP Total</Text>
                </View>
            </View>

            {/*Card resumo */}
            <View style={styles.resumeCard}>
                <Text style={styles.resume}>Resumo dos ultimos 30 dias</Text>

                <View style={{flexDirection:'row'}}>
                    <View>
                        <Text style={styles.titleResumeCard}>{dataMonthly.totalDays}</Text>
                        <Text style={styles.subtitleResumeCard}>Dias completados</Text>
                    </View>
                    <View style={{marginLeft:45}}>
                        <Text style={styles.titleResumeCard}>{dataMonthly.totalXp}</Text>
                        <Text style={styles.subtitleResumeCard}>XP ganho</Text>
                    </View>
                </View>
                <Text style={styles.description}>{message}</Text>
            </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F8FF',

    },
    row:{
        alignSelf:'center',
        width:'90%',
        flexDirection:'row',
        marginTop:35,
        justifyContent:'space-between'
        
    },
    card:{
        backgroundColor:'#fff',
        borderRadius:15,
        borderWidth:1,
        borderColor:'#c4e2fc',
        width:'45%',       
        
        
    },
    title:{
        fontSize:50,
        textAlign:'center',
        fontWeight:'600',
        color:'#163751',
        //padding:30,
       
        
    },
    subTitle:{
        textAlign:'center',
        marginBottom:25,
        color:'#a2a4a7',
        fontSize:20
    },
    icon:{
        alignItems:'center',
        marginTop:25
    },
    resumeCard:{
        backgroundColor:'#4A90E2',
        width:'90%',
        borderRadius:10,
        alignSelf:'center',
        marginTop:50,
        padding:20,
        marginBottom:70
    },
    titleResumeCard:{
        color:'#fff',
        fontWeight:'600',
        fontSize:35
    },
    subtitleResumeCard:{
        color:'#fff',
        fontSize:18

    },
    resume:{
        fontWeight:'500',
        color:'#fff',
        fontSize:30,
        
    },
    description:{
        fontSize:18,
        color:'#fff',
        marginTop:30,
    },
    cardStreak:{
        backgroundColor:'#fff',
        width:'100%',
         borderRadius:15,
        borderWidth:1,
        borderColor:'#c4e2fc'
    }

})