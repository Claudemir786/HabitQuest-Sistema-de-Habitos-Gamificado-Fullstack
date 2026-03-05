import { View,Text, StyleSheet, ScrollView } from "react-native";
import Foundation from '@expo/vector-icons/Foundation';


export default function Statistics({navigation}){

    return(
        <ScrollView style={styles.container}>
            <View style={styles.body}>
                
                {/*Seções */}
                <View style={styles.section}>

                    {/*icone */}
                    <View style={styles.icon}>
                        <Foundation name="target" size={40} color="#4A90E2" />
                    </View>

                    {/*Dados */}
                    <View>
                        <Text style={styles.title}>156</Text>
                        <Text style={styles.subTitle}>Hábitos Concluídos</Text>
                    </View>
                </View>
                <View style={styles.section}></View>
                <View style={styles.section}></View>
                <View style={styles.section}></View>

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
        padding:10
    },
    title:{
        color:'#163751',
    },
    subTitle:{
        color:'#163751',
    }
})