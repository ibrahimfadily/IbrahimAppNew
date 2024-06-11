// App.js
import React from 'react';
import { View } from 'react-native';
import MainNavigation from './rout/nav';
import { Provider, ThemeProvider } from 'react-native-paper';

const App = () => {
  return (
    <Provider>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <MainNavigation />
        </View>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
