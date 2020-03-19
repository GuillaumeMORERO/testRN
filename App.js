import * as React from 'react';

import { Provider } from 'react-redux';
import Store from './Store/configureStore';

import Navigation from "./Navigation/Navigation";

function App() {

  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
    
  );
}

export default App;
