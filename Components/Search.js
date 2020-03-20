import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';

import FilmList from './FilmList';

export default ({ navigation }) => {

  const [filmList, setFilmList] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);


  useEffect(() => {
    if ( page < totalPage) {
      loadFilms();
    }
  }, []);

  const textHandler = (text) => {
    setTypedText(text);
  }

  const loadFilms = () => {
    if (typedText.length > 0) {

      setIsLoading(true);

      getFilmsFromApiWithSearchedText(typedText, page+1).then(data => {
        // setPage(data.page);
        // setTotalPage(data.total_pages);
        const newList = filmList.concat(data.results);
        pageSetter(data.page, data.total_pages);
        listSetter(newList);
        // setFilmList(newList);
        // setIsLoading(false);
      });
    }
  }

  const pageSetter = (newPage, newTotalPge) => {
    setPage(newPage);
    setTotalPage(newTotalPge);
  }
  const listSetter = (newList) => {
    setFilmList(newList);
    setIsLoading(false);
  }

  // const fetcherer = (value) => {
  //   setIsFetching(value);
  // }

  const searchFilms = () => {
    setPage(0);
    setTotalPage(0);
    setFilmList([]);
    loadFilms();
  }

  const displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  const displayDetailForFilm = (filmId) => {
    navigation.navigate("Détails d'un film", {filmId: filmId});
  }

  const styles = StyleSheet.create({
    main_container : {
      // marginTop: 30,
      flex: 1
    },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }

  })

  return (
    <View style={styles.main_container}>
      <TextInput
        placeholder='Titre du film'
        style={styles.textinput}
        onChangeText={(text) => textHandler(text)}
        onSubmitEditing={() => searchFilms()}
        />
      <Button
        title="Rechercher"
        onPress={() => searchFilms()}
        style={{ height: 50 }}
        />
      <FilmList
        films={filmList}
        navigation={displayDetailForFilm}
        page={page}
        totalPage={totalPage}
        loadFilms={loadFilms}
        favoriteList={false}
      />
      {displayLoading()}
    </View>
  )
}

