import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from '../pages/home';
import Add from '../pages/addHabit';

import Progress from '../pages/progress';
import {Text} from 'react-native'
import Profile from '../pages/profile';
import Statistics from '../pages/statistics';
const DRAWER = createDrawerNavigator();


export default function Drawer(){
    
    return(
        <DRAWER.Navigator initialRouteName='Home'>

            <DRAWER.Screen name='Home' component={Home}/>              
            <DRAWER.Screen name='Add' component={Add} />
            <DRAWER.Screen name='Perfil' component={Profile}/>
            <DRAWER.Screen name='Status' component={Statistics}/>
            <DRAWER.Screen name='Progresso' component={Progress}/>
           

        </DRAWER.Navigator>
    )
}