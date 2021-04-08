import React from 'react';
import { StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import Image from 'react-native-image-progress';

import Modal from '@/Modal';
import Loading from '@/Loading';

const Photo = ({ navigation, route }) => {
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const { info, showInfo } = route.params;
  let imgWidth, imgHeight;

  // если ширина меньше, то подстраиваемся под высоту и наоборот
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
          indicator={() => <Loading />}
          source={{ uri: info.urls.full }}
          resizeMode="contain"
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
