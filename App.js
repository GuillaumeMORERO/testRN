import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import Store from './Store/configureStore';

import Search from "./Components/Search";
import FilmDetail from "./Components/FilmDetail";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Rechercher des films">
          <Stack.Screen name="Rechercher des films" component={Search} />
          <Stack.Screen name="Détails d'un film" component={FilmDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
