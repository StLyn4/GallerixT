import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { UNSPLASH_TOKEN } from '@env';

import Loading from '@/Loading';
import PhotoBlock from '@/PhotoBlock';

class Gallery extends React.Component {
  state = {
    fetched: false,
    photos: null,
  };

  componentDidMount = () => {
    axios
      .get('https://api.unsplash.com/photos', {
        params: { client_id: UNSPLASH_TOKEN },
      })
      .then(({ data: photos }) => {
        this.setState({ fetched: true, photos });
      })
      .catch((err) => {
        console.error('Что-то пошло не так:', err);
      });
  };

  render() {
    const { navigation } = this.props;
    const { fetched, photos } = this.state;
    return (
      // Увы, FlatList немного коряво работает с подобными вещами...
      // Сделать можно, но стоит ли пока что игра свеч?
      // Даже один с разработчиков подталкивает использовать ScrollView:
      // https://github.com/facebook/react-native/issues/13939
      <ScrollView
        contentContainerStyle={
          fetched ? styles.containerFetched : styles.containerLoading
        }
      >
        {fetched ? (
          photos.map((photo) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Photo', { name: 'Test' })}
                key={photo.id}
              >
                <PhotoBlock url={photo.urls.thumb} style={styles.thumb} />
              </TouchableOpacity>
            );
          })
        ) : (
          <Loading />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerFetched: {
    flex: 1,
    minHeight: '100%',
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  thumb: {
    margin: 10,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Gallery;
