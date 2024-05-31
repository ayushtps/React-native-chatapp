import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import ChatComponent from './src/component/ChatComponent';
import ChatList from './src/component/ChatComponent/ChatList';
import Home from './src/component/Home';
import Login from './src/component/Login';
import Register from './src/component/Register';
import CurvedForm from './src/component/layout/Test';
import { colors } from './src/constants/colors';
import SplashScreen from './src/component/SplashScreen';
import Setting from './src/component/Setting';

const Stack = createStackNavigator();
export const AuthenticatedUserContext = createContext({});

const AuthenticatedProvider = ({children}: any) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Chat" component={ChatComponent} />
      <Stack.Screen name="List" component={ChatList} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const {user, setUser}: any = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(authUser => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  const [splash, setSplash] = useState(true);

  setTimeout(() => {
    setSplash(false);
  }, 2000);

  return (
    <PaperProvider>
       <StatusBar
        backgroundColor={colors.PrimaryColor}
      />
      <AuthenticatedProvider>
        {splash ? <SplashScreen /> : <RootNavigation />}
        {/* <CurvedForm/> */}
      </AuthenticatedProvider>
    </PaperProvider>
  );
};

export default App;
