import React from 'react';
import { StyleSheet, FlatList } from 'react-native'

import { useSelector } from 'react-redux';

import FilmItem from './FilmItem'

export default ({ films, navigation, page, totalPage, loadFilms }) => {

  const {favoritesFilm} = useSelector((state) => state.favorite);

  const styles = StyleSheet.create({
    list: {
      flex: 1
    }
  })

  return (
    <FlatList
      style={styles.list}
      data={films}
      extraData={favoritesFilm}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) =>
        <FilmItem
          film={item}
          props={navigation}
          isFilmFavorite={
            (favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false
          }
        />}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (page < totalPage) {
          loadFilms()
        }
      }}

    />
  )
}