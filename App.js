import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Search from "./Components/Search";
import FilmDetail from "./Components/FilmDetail";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Rechercher des films">
        <Stack.Screen name="Rechercher des films" component={Search} />
        <Stack.Screen name="Détails d'un film" component={FilmDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
