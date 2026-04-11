import { View, StyleSheet,Text, TouchableOpacity, ScrollView } from "react-native";
import Input from "../components/defaultInput";
import DefaultButton from "../components/defaultButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import { create } from "../services/HabitService";


export default function Add({navigation}){

    const[title,setTitle] = useState("");
    const[xp,setXp] =useState(0);
    
    //componente utilizado para mostra sugestões de habitos
    function Options({titleE,xpE}){
        
        return(
             <TouchableOpacity 
             style={styles.button} 
             onPress={()=>{                         
                    handleHabit(titleE,xpE)
            }}
             
             >
                   <Text style={styles.titleButton}>{titleE}</Text>
                    <Text style={styles.subTitleButton}>+{xpE}XP</Text>
            </TouchableOpacity>
        )
    }

    //função que envia os dados identificados(titulo/xp) e retorna a resposta
    async function CreateHabit(titleC,xpC){
        try {
            const result = await create(titleC,xpC);
            if(!result){
                alert("falha ao criar novo hábito")
                
            }else{
                alert("Hábito adicionado com sucesso");
                navigation.navigate("drawer");
            }

        } catch (error) {
            console.error("erro na criação: ", error.message);

        }
    }

    //verifica se as descrições do hábito e xp vem do input padrão ou da opções 
   async function handleHabit(titleoption,xpOption){    
       
        let titleParam = "";
        let xpParam = 0;
        if(titleoption && xpOption){//se vier dos botões de opção
            titleParam = titleoption
            xpParam = xpOption
            await CreateHabit(titleParam,xpParam)

        }else{//se vier do input
            await CreateHabit(title,xp)
        }       
             
       
    }

    return(
       <ScrollView style={styles.container}>

            {/*Card de adição de hábito */}
            <View style={styles.card}>
                <Input 
                name="Nome do Hábito"
                placeholder={"Beber 2l de água"}
                paddingInput={18}
                value={title}
                setValue={setTitle}
                

                />
                <DefaultButton
                    name="Criar Hábito"
                    handle={handleHabit}
                />
                
            </View>

            {/*Sugestões de hábitos com seu respectivos botões */}
            <View style={styles.suggest}>

                {/*Titulo */}    
                <View style={styles.title}>
                    <MaterialCommunityIcons name="star-four-points-outline" size={30} color="#7BB3E0" />
                    <Text style={styles.titleSuggest}>Sugestões Populares</Text>
                </View>
                
                {/*Botões de sugestões*/}
               
                <Options titleE={"Beber 2L de água"} xpE={10}/>
                <Options titleE={"Meditar 10 minutos"} xpE={15}/>
                <Options titleE={"Ler 30 páginas"} xpE={20}/>
                <Options titleE={"Exercícios físicos"} xpE={25}/>
                <Options titleE={"Estudar inglês"} xpE={20}/>
                <Options titleE={"Gratidão diária"} xpE={10}/>
                <Options titleE={"Escrever no diário"} xpE={15}/>
                <Options titleE={"Comer frutas"} xpE={10}/>
                <Options titleE={"Praticar violão"} xpE={20}/>
            </View>

            <View style={{marginTop:50}}></View>

       </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F0F8FF',

    },
    card:{
        backgroundColor:'#fff',
        alignSelf:'center',
        width:'90%',
        marginTop:60,
        borderWidth:1,
        borderRadius:10,
        borderColor:'#c4e2fc',
        padding:10

    },
    suggest:{
        width:'90%',
        alignSelf:'center',
        marginTop:40,

    },
    title:{
        flexDirection:'row',  
        marginBottom:10    

    },
    titleSuggest:{
        fontSize:23,
        color:'#163751',
        fontWeight:'500',
        marginLeft:8

    },
    button:{
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#c4e2fc',
        padding:10,
        marginTop:20

    },
    titleButton:{
        fontSize:25,
        fontWeight:'500',
        color:'#163751'
    },
    subTitleButton:{
        fontSize:20,
        color:'#a2a4a7'
    }

})