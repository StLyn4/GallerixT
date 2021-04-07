import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import reduxStore from 'app/redux';
import Main from 'app/Main';

const App = () => (
  <ReduxProvider store={reduxStore}>
    <Main />
  </ReduxProvider>
);

export default App;
