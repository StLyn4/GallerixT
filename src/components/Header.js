import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';

import { toggleTheme } from 'app/redux/actions';
import IconButton from '@/IconButton';

const Header = (props) => {
  const { title, routeName, navigation, havePrevious, theme } = props;

  const infoHandler = useCallback(() => {
    navigation.setParams({ showInfo: true });
  }, [navigation]);

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {havePrevious && (
        <IconButton
          name="chevron-back-outline"
          color={theme.colors.primary}
          onPress={navigation.goBack}
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        />
      )}
      {routeName === 'Photo' && (
        <IconButton
          name="information-circle-outline"
          color={theme.colors.primary}
          onPress={infoHandler}
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        />
      )}
      <Appbar.Content
        title={title}
        titleStyle={[styles.title, { color: theme.colors.primary }]}
      />
      <IconButton
        name={theme.dark ? 'moon-outline' : 'sunny-outline'}
        color={theme.colors.primary}
        onPress={props.toggleTheme}
        style={styles.themeChangeButton}
        hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
      />
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
