import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const Loading = ({ theme, style: userStyle }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.border,
          shadowColor: theme.colors.onBackground,
        },
        userStyle,
      ]}
    >
      <ActivityIndicator size="large" color={theme.dark ? 'white' : 'grey'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default connect(({ main }) => ({ theme: main.theme }))(Loading);
