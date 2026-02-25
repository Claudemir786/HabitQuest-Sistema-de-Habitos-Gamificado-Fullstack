import {View,Text,StyleSheet} from "react-native"
import Octicons from '@expo/vector-icons/Octicons';

export default function Logo(){

    return(
        <View>
            <View style={styles.container}>
            <View style={styles.trophy}>
                <Octicons name="trophy" size={25} color="#fff" />
            </View>           
                <Text style={{alignContent:'center', marginLeft:8,fontSize:25,color:'#1A3D8F',fontWeight:'500'}}>
                    HabitQuest
                </Text>                     
            
        </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{    
        flexDirection:'row',
        
    },
    trophy:{
        backgroundColor:"#4A90E2",
        padding:10,
        borderRadius:12,
    }
})