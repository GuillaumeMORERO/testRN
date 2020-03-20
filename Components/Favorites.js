import React from 'react';
import { StyleSheet } from 'react-native';

import FilmList from './FilmList';

import { useSelector } from 'react-redux';

export default ({ navigation }) => {

  const {favoritesFilm} = useSelector((state) => state.favorite);

  const styles = StyleSheet.create({})

  const displayDetailForFilm = (filmId) => {
    navigation.navigate("Détails d'un film", {filmId: filmId});
  }
  
  return (
    <FilmList
      films={favoritesFilm}
      favoriteList={true}
      navigation={displayDetailForFilm}
    />
  )
}