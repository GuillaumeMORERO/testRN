import * as React from 'react';
import { StyleSheet, Image, TabBarIOS } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";


export default () => {

  const FilmStack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
  });

  const barIcon = (route) => {
    switch(route.name) {
      case 'Recherche': {
        var sourceImage = require('../Images/ic_search.png');
        return sourceImage
      }
      case 'Mes films favoris': {
        var sourceImage = require('../Images/ic_favorite.png');
        return sourceImage
      }
      default: {
        var sourceImage = require('../Images/ic_favorite.png');
        return sourceImage
      }
    }
  }
  

  const FilmStackScreen = () => {
    return (
      <FilmStack.Navigator initialRouteName="Rechercher des films">
        <FilmStack.Screen name="Rechercher des films" component={Search} />
        <FilmStack.Screen name="Détails d'un film" component={FilmDetail} />
      </FilmStack.Navigator>
    )
  }

  return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Recherche"
          screenOptions={({route}) => ({
            tabBarIcon: () => {
              return <Image
                source={barIcon(route)}
                style={styles.icon}/>
            }
          })}
          tabBarOptions= {{
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
          }} 
        >

          <Tab.Screen name="Mes films favoris" component={Favorites} />
          <Tab.Screen name="Recherche" component={FilmStackScreen} />

        </Tab.Navigator>
      </NavigationContainer>
  );
};
