import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import { toggleTheme } from 'app/redux/actions';
import IconButton from '@/IconButton';

const Header = (props) => {
  const { title, route, navigation, havePrevious, theme } = props;

  const infoHandler = useCallback(() => {
    navigation.setParams({ showInfo: true });
  }, [navigation]);

  const downloadHandler = useCallback(async () => {
    const { info } = route.params;
    const { granted } = await MediaLibrary.requestPermissionsAsync();

    if (granted) {
      const { uri } = await FileSystem.downloadAsync(
        info.urls.full,
        FileSystem.documentDirectory + info.id + '.png',
      );

      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync('GallerixT Photos');

      if (album === null) {
        await MediaLibrary.createAlbumAsync('GallerixT Photos', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    }
  }, [route.params]);

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {havePrevious && (
        <IconButton
          name="chevron-back-outline"
          color={theme.colors.primary}
          onPress={navigation.goBack}
          style={styles.buttonLeft}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        />
      )}
      {route.name === 'Photo' && (
        <IconButton
          name="information-circle-outline"
          color={theme.colors.primary}
          onPress={infoHandler}
          style={styles.buttonLeft}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        />
      )}
      <Appbar.Content
        title={title}
        titleStyle={[styles.title, { color: theme.colors.primary }]}
      />
      {route.name === 'Photo' && (
        <IconButton
          name="cloud-download-outline"
          color={theme.colors.primary}
          onPress={downloadHandler}
          style={styles.buttonRight}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 10 }}
        />
      )}
      <IconButton
        name={theme.dark ? 'moon-outline' : 'sunny-outline'}
        color={theme.colors.primary}
        onPress={props.toggleTheme}
        style={styles.buttonRight}
        hitSlop={{ top: 20, bottom: 20, left: 10, right: 20 }}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRight: {
    marginRight: 10,
  },
  buttonLeft: {
    marginLeft: 10,
  },
});

export default connect(({ main }) => ({ theme: main.theme }), { toggleTheme })(
  Header,
);
