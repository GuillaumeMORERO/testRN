// Store/configureStore.js

import { createStore } from 'redux';
// import toggleFavorite from './Reducers/favoriteReducer';

import reducer from './reducer';

export default createStore(reducer);