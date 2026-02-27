import{View,Text,StyleSheet} from 'react-native'


export default function Footer(){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>© 2026 HabitQuest</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        marginBottom:30
    },
    text:{
        fontSize:20,
        color:'#5B7C99'
    }
})