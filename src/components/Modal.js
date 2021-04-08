import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Modal as RNModal,
} from 'react-native';
import { Text, Avatar, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const TimeFormater = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const Modal = ({ visible, onClose, info, theme }) => {
  return (
    <RNModal animationType="slide" transparent visible={visible}>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={[
            styles.modal,
            {
              backgroundColor: theme.colors.surface,
              shadowColor: theme.colors.onBackground,
            },
          ]}
        >
          <TouchableOpacity
            onPress={onClose}
            style={styles.close}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons
              name="close-circle-outline"
              size={28}
              color={theme.colors.primary}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Основная информация</Text>
          <Divider />
          <Text>
            <Text style={styles.bold}>Описание:</Text>{' '}
            {info.description ?? info.alt_description}
          </Text>
          <Text>
            <Text style={styles.bold}>Загружено:</Text>{' '}
            {TimeFormater.format(new Date(info.created_at))}
          </Text>
          <Text>
            <Text style={styles.bold}>Количество лайков:</Text> {info.likes}
          </Text>

          <Text style={styles.title}>Автор</Text>
          <Divider />
          <View style={styles.author}>
            <Avatar.Image
              source={{ uri: info.user.profile_image.large }}
              size={128}
              style={styles.avatar}
            />
            <Text style={styles.bold}>{info.user.name}</Text>
            <Text>{info.user.bio}</Text>

            <View style={[styles.vertical, styles.stats]}>
              <View style={styles.vertical}>
                <Ionicons
                  name="images-outline"
                  style={styles.icon}
                  size={18}
                  color={theme.colors.primary}
                />
                <Text style={styles.bold}>{info.user.total_photos}</Text>
              </View>
              <View style={styles.vertical}>
                <Ionicons
                  name="heart-outline"
                  style={styles.icon}
                  size={18}
                  color={theme.colors.primary}
                />
                <Text style={styles.bold}>{info.likes}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.2)',
  },
  modal: {
    padding: 10,
    width: '80%',
    minHeight: 450,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  close: {
    zIndex: 1000,
    position: 'absolute',
    top: 5,
    right: 5,
  },
  author: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 10,
  },
  vertical: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  stats: {
    marginTop: 5,
  },
  icon: {
    marginRight: 5,
  },
  title: {
    color: 'grey',
    fontWeight: '500',
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default connect(({ main }) => ({ theme: main.theme }))(Modal);
