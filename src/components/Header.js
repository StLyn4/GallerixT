import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { toggleTheme } from 'app/redux/actions';

const Header = (props) => {
  const { title, routeName, navigation, havePrevious, theme } = props;
  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {havePrevious && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={navigation.goBack}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={32}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      )}
      {routeName === 'Photo' && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={navigation.openDrawer}
          hitSlop={{ top: 20, bottom: 20, left: 10, right: 20 }}
        >
          <Ionicons
            name="information-circle-outline"
            size={32}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={title}
        titleStyle={[styles.title, { color: theme.colors.primary }]}
      />
      <TouchableOpacity
        style={styles.themeChangeButton}
        onPress={props.toggleTheme}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
      >
        <Ionicons
          name={theme.dark ? 'moon-outline' : 'sunny-outline'}
          size={32}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  themeChangeButton: {
    marginRight: 10,
  },
  backButton: {
    marginLeft: 10,
  },
});

export default connect(({ main }) => ({ theme: main.theme }), { toggleTheme })(
  Header,
);
