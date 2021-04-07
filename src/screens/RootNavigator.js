import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '@/Header';
import Gallery from '%/Gallery';
import Photo from '%/Photo';

const Stack = createStackNavigator();

const RootNavigator = (props) => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        initialRouteName="Gallery"
        headerMode="screen"
        screenOptions={{
          animationEnabled: true,
          header: (nav) => {
            const { navigation, options } = nav.scene.descriptor;
            const title =
              options.headerTitle ?? options.title ?? nav.scene.route.name;

            return (
              <Header
                title={title}
                routeName={nav.scene.route.name}
                navigation={navigation}
                havePrevious={Boolean(nav.previous)}
              />
            );
          },
        }}
      >
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{ title: 'Галерея' }}
        />
        <Stack.Screen
          name="Photo"
          component={Photo}
          options={({ route }) => ({ title: route.params.name ?? 'Фото' })}
        />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default RootNavigator;
