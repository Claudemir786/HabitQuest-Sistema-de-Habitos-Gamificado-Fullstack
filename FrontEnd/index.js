import { registerRootComponent } from 'expo';
import App from './App';
import Add from './src/pages/addHabit';
import Home from './src/pages/home';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
