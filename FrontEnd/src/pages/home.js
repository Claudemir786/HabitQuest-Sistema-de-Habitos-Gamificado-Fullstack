import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, FlatList } from "react-native";
import DefaultButton from "../components/defaultButton";
import { getHabit } from "../services/HabitService";

//simulando dados que vão retornar do banco através de um array
/*const arrayHabits = [
    {name:'Beber 2l de água', xp:10},
    {name:'Meditar 10 minutos', xp:15},
    {name:'Ler 30 páginas', xp:20},
    {name:'Exercícios fisícos', xp:25},
    {name:'Estudar inglês', xp:20},

]*/

export default function Home({navigation}){    

    const [habitsUser, setHabitsUser] = useState([]);

    useEffect(()=>{
        habits();
    },[])

    async function habits() {
        try {
            const result = await getHabit();

            if(!result){
                alert("não foram entrados habitos cadastrados")
            }
            setHabitsUser(result);
        } catch (error) {
            console.error("Falha ao buscar os hábitos cadastrados");
        }
    }


    const LIST = ({habit})=>{

    const[buttonClick,serButtonClick] = useState(false)//usado quando clicado no botão

    //função que marca a opção de hábito e recebe o habito e o xp ganhado
     function completedHabit(habitNameXp){
       serButtonClick(true);
        console.log("o que veio de resposta: ", habitNameXp);
    }

    return(
        <View>
            {!buttonClick  &&(
                <TouchableOpacity
                style={styles.button}
                onPress={()=> completedHabit(habit)}
            >
                    <Text style={{color:'#163751', fontSize:25, fontWeight:'500'}}>{habit?.name}</Text>
                    <Text style={{color:'#a2a4a7', fontSize:20, marginBottom:5}}>+{habit?.xp_reward} Xp</Text>
            </TouchableOpacity>
            )}
            {buttonClick &&(
                <View >
                 
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor:'#E2F1FB', flexDirection:'row', justifyContent:'space-between'}]}>
                          
                            
                            <View style={{flexDirection:'column'}}>
                                <Text style={{color:'#163751', fontSize:25, fontWeight:'500'}}>{habit?.name}</Text>
                                <Text style={{color:'#163751', fontSize:20, marginBottom:5}}>+{habit?.xp_reward} Xp</Text>
                            </View>
                            <View style={styles.buttonCompleted}>
                                <Text style={{fontSize:20,color:'#4A90E2'}}>Concluído!</Text>
                            </View>
                            

                        </TouchableOpacity>
                    </View>
                
            )}
            
         
        </View>
    )
    }

   


    return(
        <ScrollView style={styles.container}>
            {/*Card */}
            <View style={styles.card}>

                <Text style={{fontSize:30, color:'#fff', fontWeight:'700', textAlign:'center'}}>
                    Progresso de Hoje
                </Text>

                {/* se os dados de hábitos a serem concluídos estiverem presentes*/}
                {status === true &&(
                    <Text style={{fontSize:20, color:'#ffffffa4', marginTop:5, textAlign:'center'}}>

                        {completedHabits} de {numHabits}  hábitos concluídos 
                    </Text>
                )}

            </View>

            {/*corpo com os botões de hábito */}
            <View style={styles.body}>
                <Text style={{fontSize:25, fontWeight:'500', color:'#163751'}}>Hábitos de Hoje</Text>

                {/*Se os dados não forem carregados ou o usuário não tiver hábitos cadastrados */}
                {habits === false &&(
                    <Text 
                    style={{fontSize:25, 
                            color:'#163751', 
                            fontWeight:'500', 
                            textAlign:'center',
                            marginTop:20}}
                    >Usuário não possui hábitos ainda 😔</Text>
                )}
                
                <FlatList
                data={habitsUser}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=> <LIST habit={item} />}
                />

            </View>

            {/*Adiciona novo hábito */}
            <View>
                <DefaultButton 
                name="+ Adicionar Novo Hábito"
                handle={()=> navigation.navigate("addHabit")}
                />
            </View>
            <View style={{marginTop:70}}>

            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F8FF'
    },
    card:{
        width:'90%',
        alignSelf:'center',
        backgroundColor:'#4A90E2',
        marginTop:40,
        borderRadius:10,
        padding:15,
        marginBottom:30

        
    },
    body:{
        width:'90%',       
        alignSelf:'center'

    },
    button:{
        backgroundColor:'#fff',
        borderRadius:10,
        padding:10,
        marginTop:15,
        borderWidth:1,
        borderColor:'#c4e2fc',
        marginBottom:10
    },
    buttonCompleted:{
        justifyContent:'center',
        backgroundColor:'#D2E6F8',
        borderRadius:15,
        padding:8
        
    
    }

})