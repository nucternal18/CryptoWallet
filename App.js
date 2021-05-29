import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./src/stores/rootReducer";

import Tabs from './src/navigation/tabs';

const Stack = createStackNavigator();


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'MainLayout'}>
          <Stack.Screen name='MainLayout' component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
