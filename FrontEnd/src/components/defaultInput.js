import{View,Text,StyleSheet,TextInput} from "react-native"

export default function Input({name='default',placeholder,value,setValue,secureText}){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <View style={styles.viewInput}>
                <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                secureTextEntry={secureText}
                style={styles.input}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,  
        marginBottom:20      
    },
    text:{
        fontSize:20,
        color:'#1A3A52',
        marginLeft:30,
        fontWeight:'500'
    },
    input:{
        borderWidth:1,
        borderColor:'#b8b1b1',
        borderRadius:8,
        padding:8,
        marginTop:5,
        

    },
    viewInput:{
        width:'90%',
        alignSelf:'center'
        
    }
})

