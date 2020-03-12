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
  // const [isFetching, setIsFetching] = useState(false);


  // useEffect(() => {
  //   if (isFetching) {
  //     console.log('ça va fetcher :', isFetching);
  //     pageSetter(false);
  //     loadFilms();
  //   }
  // }, [isFetching]);

  // console.log('pagetest : ', page);
  // console.log('pagetest +1 : ', page+1);

  // console.log('page de départ :', page);
  // console.log('liste de films :', filmList.length);

  const textHandler = (text) => {
    setTypedText(text);
  }

  const loadFilms = () => {
    
    if (typedText.length > 0) {
      setIsLoading(true);
      // console.log('page dans fonction avant :', page);
      // setPage(page + 1);
      // console.log('page dans fonction après :', page);
      // setPage(page + 1);
      getFilmsFromApiWithSearchedText(typedText, page+1).then(data => {
        // console.log('data :', data);
        // console.log('page dans fonction après :', page);
        // console.log('data.page :', data.page);
        // console.log('data.total_pages :', data.total_pages);
        setPage(data.page);
        setTotalPage(data.total_pages);
        setFilmList(...filmList, data.results);
        // setFilmList(data.results);
        setIsLoading(false);
      });
    }
  }

  const loadMoreFilms = () => {
    console.log('page de loadMore :', page);
    console.log('totalPage de loadMore :', totalPage);
    if (page < totalPage) {
      loadFilms();
      console.log('ok ça reload !');
    }
  }

  // const pageSetter = (value) => {
  //   console.log('scroll ?')
  //   setIsFetching(value);
  // }

  const searchFilms = () => {
    setPage(0);
    setTotalPage(0);
    setFilmList([]);
    setTypedText('');
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
        onEndReachedThreshold={1}
        onEndReached={() => loadMoreFilms()}
      />
      {displayLoading()}
    </View>
  )
}

