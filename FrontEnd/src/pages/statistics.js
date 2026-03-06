import { View,Text, StyleSheet, ScrollView } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';
import Octicons from '@expo/vector-icons/Octicons';
import Feather from '@expo/vector-icons/Feather';
import { useState } from "react";


export default function Statistics({navigation}){

    const[unlocked,setUnlocked]= useState(false);//usado para as conquistas quando forem desbloqueadas

    function Emoji({emoji,title,subTitle}){

        return(
            <View style={styles.sAchivements}>

                {/*emoji */}
                <View>
                    <Text style={styles.emoji}>{emoji}</Text>
                </View>

                {/*texto */}
                <View style={styles.textAchievements}>
                    <Text style={styles.nameAchievement}>{title}</Text>

                    <Text style={styles.description}>{subTitle}</Text>

                    {unlocked &&(
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
                        <Text style={styles.title}>156</Text>
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
                        <Text style={styles.title}>1850</Text>
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
                        <Text style={styles.title}>87%</Text>
                        <Text style={styles.subTitle}>Taxa de sucesso</Text>
                    </View>
                </View>

                <View style={styles.section}>
                     {/*icone */}
                    <View style={styles.icon}>
                        <Feather name="award" size={40} color="#4a90e2" />
                    </View>

                    {/*Dados */}
                    <View>
                        <Text style={styles.title}>3/6</Text>
                        <Text style={styles.subTitle}>Conquistas</Text>
                    </View>
                </View>

                {/*Conquistas */}
                <View style={styles.card}>
                    <Text style={styles.tAchievements}>Conquistas</Text>
                    
                   <Emoji emoji={"🏆"} title={"Primeira Vitória"} subTitle={"Complete seu primeiro hábito"}/>
                   <Emoji emoji={"🔥"} title={"Sequência de 7"} subTitle={"Mantenha 7 dias seguidos"}/>
                   <Emoji emoji={"⭐"} title={"Nivel 10"} subTitle={"Alcance o nivel 10"}/>
                   <Emoji emoji={"💧"} title={"Mestre de Água"} subTitle={"complete 30 dias de hidratação"}/>
                   <Emoji emoji={"🎯"} title={"Sequência de 30"} subTitle={"Mantenha 30 dias seguidos"}/>
                   <Emoji emoji={"👑"} title={"Nivel 25"} subTitle={"Alcance o nivel 25"}/>
                    
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