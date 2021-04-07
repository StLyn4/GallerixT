import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appearance } from 'react-native';
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import RootNavigator from '%/RootNavigator';
import { changeTheme } from 'app/redux/actions';

class Main extends React.Component {
  state = {
    isDark: false,
  };

  toggleTheme = () => {
    this.setState((prevState) => {
      // Записываем состояние в постоянную память
      AsyncStorage.setItem(
        'isDarkTheme',
        JSON.stringify(!prevState.isDark),
      ).catch(() => null);
      // Обновляем state
      return { isDark: !prevState.isDark };
    });
  };

  isDarkTheme = async () => {
    const isDarkTheme = await AsyncStorage.getItem('isDarkTheme').catch(
      // если случилась ошибка, то используем значение по умолчанию
      () => null,
    );
    // значение по умолчанию - системная тема
    return isDarkTheme ?? Appearance.getColorScheme() === 'dark';
  };

  componentDidMount = () => {
    this.isDarkTheme().then((isDark) => {
      this.props.changeTheme({ isDark });
    });
  };

  render() {
    const { theme } = this.props;
    return (
      <PaperProvider
        theme={theme}
        settings={{ icon: (iconProps) => <Ionicons {...iconProps} /> }}
      >
        <NavigationContainer
          theme={theme}
          documentTitle={{
            formatter: (options, route) => {
              const routeName = options?.title ?? route?.name;
              return routeName ? `GallerixT: ${routeName}` : 'GallerixT';
            },
          }}
        >
          <View
            style={[
              styles.container,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <StatusBar
              style={theme.dark ? 'light' : 'dark'}
              networkActivityIndicatorVisible
            />
            <RootNavigator />
          </View>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Получаем с main редуктора состояние theme, также создаём действие changeTheme
export default connect(({ main }) => ({ theme: main.theme }), { changeTheme })(
  Main,
);
