import { View,Text,StyleSheet, ScrollView } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';



export default function Progress({navigation}){

    return(
        <ScrollView style={styles.container}>



            {/*Linha 1 */}
            <View style={[styles.row, {marginTop:60}]}>

                <View style={styles.card}>

                    <View style={styles.icon}><Octicons name="flame" size={35} color="#4A90E2"/></View>                    
                    <Text style={styles.title}>7</Text>
                    <Text style={styles.subTitle}>Sequência Atual</Text>

                </View>

                <View style={styles.card}>

                    <View style={styles.icon}><Octicons name="trophy" size={35} color="#4A90E2" /></View>
                    <Text style={styles.title}>15</Text>
                    <Text style={styles.subTitle}>Maior Sequência</Text>
                </View>
                
            </View>

            {/*Linha 2 */}
            <View style={styles.row}>
                 <View style={styles.card}>
                    
                    <View style={styles.icon}><Octicons name="graph" size={35} color="#4A90E2"/></View>
                    <Text style={styles.title}>92%</Text>
                    <Text style={styles.subTitle}>Taxa Conclusão</Text>
                </View>

                <View style={styles.card}>

                    <View style={styles.icon}><Octicons name="calendar" size={35} color="#4A90E2"/></View>
                    <Text style={styles.title}>1850</Text>
                    <Text style={styles.subTitle}>XP Total</Text>
                </View>
            </View>

            {/*Card resumo */}
            <View style={styles.resumeCard}>
                <Text style={styles.resume}>Resumo do Mês</Text>

                <View style={{flexDirection:'row'}}>
                    <View>
                        <Text style={styles.titleResumeCard}>20</Text>
                        <Text style={styles.subtitleResumeCard}>Dias completados</Text>
                    </View>
                    <View style={{marginLeft:45}}>
                        <Text style={styles.titleResumeCard}>1850</Text>
                        <Text style={styles.subtitleResumeCard}>XP ganho</Text>
                    </View>
                </View>
                <Text style={styles.description}>Você está indo muito bem! Continue assim para manter sua sequência e alcançar novos níveis</Text>
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
        padding:20
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
    }

})