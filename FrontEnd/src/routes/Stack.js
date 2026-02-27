import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../pages";
import Login from "../pages/login";
import Register from "../pages/register";
import Drawer from "./Drawer";

const STACK = createNativeStackNavigator();


export default function Stack(){

    return(
        <STACK.Navigator 
        initialRouteName="index"
        screenOptions={{headerShown:false}}
        >
            <STACK.Screen name="index" component={Index} />
            <STACK.Screen name="login" component={Login} />
            <STACK.Screen name="register" component={Register}/>
            <STACK.Screen name="drawer" component={Drawer}/>

        </STACK.Navigator>

    )
}