import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../layout/Header';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

const ref = firestore().collection('users');

const plus=require('../../asset/icon/add-button.png')

const ChatList = ({navigation}: any) => {
  const [users, setUsers] = useState([]);
  const [currentUserData, setCurrentUserData] = useState('');
  const currentUser = auth().currentUser;


  const getDataList = () => {
    if (!currentUser) {
      return;
    } 
    ref.onSnapshot(querySnapshot => {
      const usersList: any = [];
      querySnapshot.forEach(doc => {
        if (doc.id !== currentUser.uid) {
          usersList.push({
            ...doc.data(),
            id: doc.id,
          });
        } else {
          setCurrentUserData(doc.data());
        }
      });
      setUsers(usersList);
    });
  };

  useEffect(() => {
    getDataList();
  }, [currentUser,users]);

  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={styles.listContainer}
        onPress={() => navigation.navigate('Chat', {c_user: item,})}>
        <View style={styles.listContainerInner}>
          <View style={styles.img}>
            <Image
              source={{uri: item.avatar}}
              style={styles.image}
              height={50}
              width={50}
            />
          </View>
          <View>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const handleLogOut = () => {
    auth()
      .signOut()
      .then(() => Alert.alert('User signed out!'));
  };

  return (
    <View style={styles.main}>
      <Header
        logOut={true}
        onPress={handleLogOut}
        c_user={currentUserData}
      />
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Pressable style={styles.addBtn}>
        <Image source={plus}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.secondaryColor,
  },
  container: {
    padding: 15,
    backgroundColor: colors.secondaryColor,
  },
  listContainer: {
    padding: 12,
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 20,
  },
  listContainerInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {},
  image: {
    borderRadius: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 20,
    fontFamily:fonts.bold,
    color: 'black',
  },
  msg: {
    overflow: 'hidden',
    color: 'black',
  },
  addBtn:{
    position:'absolute',
    bottom:30,
    right:20,
  }
});

export default ChatList;
