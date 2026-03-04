import { View, StyleSheet,Text, TouchableOpacity, ScrollView } from "react-native";
import Input from "../components/defaultInput";
import DefaultButton from "../components/defaultButton";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";


export default function Add({navigation}){

    const[title,setTitle] = useState("");
    
    function Options({title,xp}){
        return(
             <TouchableOpacity 
             style={styles.button} 
             onPress={()=>handleHabit(title,xp)}
             >
                   <Text style={styles.titleButton}>{title}</Text>
                    <Text style={styles.subTitleButton}>+{xp}XP</Text>
            </TouchableOpacity>
        )
    }

    function handleHabit(titleButton,xpButton){
        console.log(`hábito ${titleButton} e o XP foi ${xpButton}`);
        console.log("o Hábito manual é: ", title);
        alert("Hábito adicionado com sucesso");
        navigation.navigate("drawer");
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
               
                <Options title={"Beber 2L de água"} xp={10}/>
                <Options title={"Meditar 10 minutos"} xp={15}/>
                <Options title={"Ler 30 páginas"} xp={20}/>
                <Options title={"Exercícios físicos"} xp={25}/>
                <Options title={"Estudar inglês"} xp={20}/>
                <Options title={"Gratidão diária"} xp={10}/>
                <Options title={"Escrever no diário"} xp={15}/>
                <Options title={"Meditar 10 minutos"} xp={15}/>
                <Options title={"Comer frutas"} xp={10}/>
                <Options title={"Praticar violão"} xp={20}/>
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