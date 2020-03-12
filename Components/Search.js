import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Button, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';

import FilmItem from './FilmItem'

export default () => {

  const [filmList, setFilmList] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);


  useEffect(() => {
    if (isFetching) {
      console.log('useEffect triggered :', isFetching);
        if (page < totalPage) {
          // console.log('page : ', page);
          // console.log('totalPage : ', totalPage);
          // console.log('message saisi :', typedText);
          // console.log('ok ça reload !');
          loadFilms();
        }
    }
  }, [isFetching]);

  const textHandler = (text) => {
    setTypedText(text);
  }

  const loadFilms = () => {
    
    if (typedText.length > 0) {

      setIsLoading(true);

      getFilmsFromApiWithSearchedText(typedText, page+1).then(data => {
       
        setPage(data.page);
        setTotalPage(data.total_pages);
        const newList = filmList.concat(data.results);
        console.log('newList : ', newList);
        setFilmList(newList);
        setIsLoading(false);

      });
    }
  }


  const fetcherer = (value) => {
    setIsFetching(value);
  }

  const searchFilms = () => {
    setPage(0);
    setTotalPage(0);
    setFilmList([]);
    console.log('nouveau texte saisi : ', typedText);
    console.log('nouvelle recherche : ', filmList);
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


  const styles = StyleSheet.create({
    main_container : {
      marginTop: 30,
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
      <FlatList
        /* https://reactnative.dev/docs/flatlist */
        data={filmList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <FilmItem film={item}/>}
        onEndReachedThreshold={0.5}
        onEndReached={() => fetcherer(true)}
      />
      {displayLoading()}
    </View>
  )
}

