import { TOGGLE_FAVORITE } from '../Actions/actions';

const initialState = {
  favoritesFilm: []
};

export default (state = initialState, action) => {
  let nextState
  switch(action.type) {
    case TOGGLE_FAVORITE:
      
      const filmID = action.film.id;
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === filmID);
      // ça renvoie l'indice qui correspond au filmID, sinon ça renvoie -1
      if (favoriteFilmIndex == -1) {
        // -1 ? Alors on rajoute le film dans le state
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.film]
        }
      } else {
        // sinon on l'enléve
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter( (index) => index == favoriteFilmIndex)
        }
      }
      console.log('nextState : ', nextState);
      return nextState || state

    default: {
      return state;
    }
  }
}