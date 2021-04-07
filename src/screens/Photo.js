import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';

import Modal from '@/Modal';

const Photo = ({ navigation, route }) => {
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const { info, showInfo } = route.params;
  let imgWidth, imgHeight;

  if (info.width < info.height) {
    imgHeight = winHeight - 10;
    imgWidth = (info.height / imgHeight) * info.width;
  } else {
    imgWidth = winWidth - 10;
    imgHeight = (info.width / imgWidth) * info.height;
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={{ width: imgWidth, height: imgHeight }}
          resizeMode="contain"
          source={{ uri: info.urls.full }}
        />
      </ScrollView>
      <Modal
        visible={showInfo ?? false}
        onClose={() => {
          navigation.setParams({ showInfo: false });
        }}
        info={info}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Photo;
