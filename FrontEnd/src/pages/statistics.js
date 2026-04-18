import { View,Text, StyleSheet, ScrollView, FlatList } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import {useCallback, useEffect, useState } from "react";
import { StatisticsUser } from "../services/HabitService";
import { useFocusEffect } from "@react-navigation/native";


export default function Statistics({navigation}){

    
    const[totalXp,setTotalXp] = useState(0);
    const[currentStreak, setCurrentStreak] = useState("");
    const[habitCount, setHabitCount] = useState("");
    const[achiCount,setAchiCount] = useState("");
    const[achievements,setAchievements] = useState([]);


    useFocusEffect(
        useCallback(()=>{
        getStatistics()
        },[])
    )
    async function getStatistics(){
        try{
            const result = await StatisticsUser()

            if(result){
                setAchievements(result.achievements)
                setTotalXp(result.data.total_xp)
                setCurrentStreak(result.data.current_streak)
                setHabitCount(result.data.habits_count)
                setAchiCount(result.data.achievements_count)

            }else{
                alert("não foi possivel buscar informações referente a pagina")
            }

        }catch(error){
            console.error("error ao buscar dados: ", error.message)
        }
    } 

    function ShowAchievement({achievement}){

        return(
            <View style={styles.sAchivements}>

                {/*emoji */}
                <View>
                    <Text style={styles.emoji}>{achievement?.badge_icon}</Text>
                </View>

                {/*texto */}
                <View style={styles.textAchievements}>
                    <Text style={styles.nameAchievement}>{achievement?.title}</Text>

                    <Text style={styles.description}>{achievement?.description}</Text>

                    {achievement.is_unlocked == 1 &&(
                        <Text style={styles.unlocked}>Desbloqueado</Text>
                    )}                            
                </View>



                </View>    

        )
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.body}>
                
                {/*Seções */}
                <View style={styles.section}>

                    {/*icone */}
                    <View style={styles.icon}>
                        <Foundation name="target" size={50} color="#4A90E2" />
                    </View>

                    {/*Dados */}
                    <View>
                        <Text style={styles.title}>{habitCount}</Text>
                        <Text style={styles.subTitle}>Hábitos Concluídos</Text>
                    </View>
                </View>

                <View style={styles.section}>
                     {/*icone */}
                    <View style={styles.icon}>
                       <Octicons name="zap" size={40} color="#4A90E2" />
                    </View>

                    {/*Dados */}
                    <View>
                        <Text style={styles.title}>{totalXp}</Text>
                        <Text style={styles.subTitle}>XP total</Text>
                    </View>
                </View>

                <View style={styles.section}>
                     {/*icone */}
                    <View style={styles.icon}>
                        <Octicons name="graph" size={40} color="#4a90e2" />
                    </View>

                    {/*Dados */}
                    <View>
                        <Text style={styles.title}>{currentStreak}</Text>
                        <Text style={styles.subTitle}>Sequencia Atual</Text>
                    </View>
                </View>

                <View style={styles.section}>
                     {/*icone */}
                    <View style={styles.icon}>
                        <Feather name="award" size={40} color="#4a90e2" />
                    </View>

                    {/*Dados */}
                    <View>
                        <Text style={styles.title}>{achiCount}/6</Text>
                        <Text style={styles.subTitle}>Conquistas</Text>
                    </View>
                </View>

                {/*Conquistas */}
                <View style={styles.card}>
                    <Text style={styles.tAchievements}>Conquistas</Text>
                    <FlatList
                        data={achievements}
                        keyExtractor={(item)=> item.title}
                        renderItem={({item})=> <ShowAchievement achievement={item} />}
                    />
                   
                   
                    
                </View>

            </View>
            

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F8FF',      
        
    },
    body:{
        alignSelf:'center', 
        width:'90%',
        marginTop:50
    },
    section:{
        flexDirection:'row',        
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#c4e2fc',
        marginBottom:25,
        padding:15,
        

    },
    icon:{
        backgroundColor:'#92b9e9',
        marginLeft:10,
        borderRadius:15,
        padding:10,
        marginEnd:16,
        paddingInline:15,
    },
    title:{
        color:'#163751',
        fontSize:30,
        fontWeight:'700'
    },
    subTitle:{
        color:'#163751',
    },
    card:{
        backgroundColor:'#fff',
        marginTop:30,
        borderWidth:1,
        borderColor:'#c4e2fc',
        borderRadius:10,
        marginBottom:50,
        paddingBottom:30
    },
    tAchievements:{
        fontSize:25,
        color:'#163751',
        fontWeight:'500',
        marginTop:20,
        marginStart:15,
    },
    sAchivements:{
        marginTop:35,
        flexDirection:'row',
        borderRadius:10,
        backgroundColor:"#F0F8FF",
        borderWidth:1,
        borderColor:'#c4e2fc',
        width:'90%',
        alignSelf:'center',
        padding:10,
        

    },
    emoji:{
        fontSize:40
    },
    textAchievements:{

    },
    description:{
        fontSize:15,
        color:'#a2a4a7',
        fontWeight:'500',
        marginBottom:15
    },
    nameAchievement:{
        fontSize:25,
        fontWeight:'500',
        color:'#163751',
        marginBottom:5,
    },
    unlocked:{
        color:'#306baf',
        fontWeight:'500'
    }
})