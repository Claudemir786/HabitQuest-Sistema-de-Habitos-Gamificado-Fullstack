import{View,Text,StyleSheet, TouchableOpacity}from 'react-native'

export default function DefaultButton({name='default',handle,color='#4A90E2',colorText='#fff',magincolor="#4A90E2"}){

    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, {backgroundColor:color, borderColor:magincolor}]}
                onPress={()=>handle}
            >
                <Text style={[styles.text, {color:colorText}]}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20
    },
    text:{
        textAlign:'center',
        fontSize:25

    },
    button:{
        width:'90%',
        alignSelf:'center',
        padding:10,
        borderRadius:10,
        borderWidth:2
    }
})