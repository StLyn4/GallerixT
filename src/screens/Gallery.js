import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';
import { UNSPLASH_TOKEN } from '@env';

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
        console.log(photos);
        this.setState({ fetched: true, photos });
      })
      .catch((err) => {
        console.error('Что-то пошло не так:', err);
      });
  };

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('Photo', { name: 'Test' })}
        >
          <Text>
            {this.state.fetched
              ? JSON.stringify(this.state.photos, null, '\t')
              : 'Fetching...'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default Gallery;
