import React from 'react';
import { StyleSheet } from 'react-native';

import FilmList from './FilmList';

import { useSelector } from 'react-redux';

export default () => {

  const {favoritesFilm} = useSelector((state) => state.favorite);

  const styles = StyleSheet.create({})
  
  return (
    <FilmList
      films={favoritesFilm}
      favoriteList={true}
    />
  )
}