import { TOGGLE_FAVORITE } from '../Actions/actions';

const initialState = {
  favoritesFilm: []
};

export default (state = initialState, action) => {
  let nextState
  console.log('contenu de l\'action : ', action);
  switch(action.type) {
    case TOGGLE_FAVORITE:
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
      if (favoriteFilmIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        }
      }
      return nextState || state

    default: {
      return state;
    }
  }
}