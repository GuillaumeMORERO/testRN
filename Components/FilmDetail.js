import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { toggle_favorite } from '../Store/Actions/actions'

import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';

export default (filmId) => {
  
  // afiche la page détail d'un film

  const idFilm = filmId.route.params.filmId;

  const dispatch = useDispatch();
  const {favoritesFilm} = useSelector((state) => state.favorite);

  const [isLoading, setIsLoading] = useState(true);
  const [film, setFilm] = useState('');

  useEffect(() => {
    const favoriteFilmIndex = favoritesFilm.findIndex(item => item.id === idFilm)
    if (favoriteFilmIndex !== -1) {
      getOneFilm(favoriteFilmIndex);
    } else {
      getFilm();
    }
    
  }, []);

  const displayFavoriteImage = () => {
    var sourceImage = require('../Images/ic_favorite_border.png')
    // console.log('favoritesFilm : ', favoritesFilm);
    if (favoritesFilm.findIndex(item => item.id === film.id) !== -1) {
   
      sourceImage = require('../Images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  const favoriteMaker = (film) => {
    dispatch(toggle_favorite(film));
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

  const getFilm = () => {
    getFilmDetailFromApi(idFilm).then(data => {
      setFilm(data);
      setIsLoading(false);
    })
  }

  const getOneFilm = (index) => {
    setFilm(favoritesFilm[index]);
  }

  const displayFilm = () => {
    if (!isLoading) {
      return (
        <ScrollView style={styles.scrollview_container} >
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => favoriteMaker(film)}>
            {displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }  

  const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    scrollview_container: {
      flex: 1
    },
    image: {
      height: 169,
      margin: 5
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 35,
      flex: 1,
      flexWrap: 'wrap',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 10,
      color: '#000000',
      textAlign: 'center'
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 15
    },
    default_text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    },
    favorite_container: {
      alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
    },
    favorite_image: {
      width: 40,
      height: 40,
    }
  })
  
  return (
    <View style={styles.main_container}>
      {displayLoading()}
      {displayFilm()}
    </View>
  )

};