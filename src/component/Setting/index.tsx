import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

const arrow = require('../../asset/icon/Arrow.png');
const user = require('../../asset/icon/user.png');
const phone = require('../../asset/icon/phone-call.png');

const Setting = ({route, navigation}: any) => {
  const {c_user} = route.params;
  console.log('C_user', c_user);

  return (
    <View style={styles.settingContainer}>
      <View style={styles.settingHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={arrow} style={{marginRight: 20}} />
        </Pressable>
        <Text style={styles.headerText}>Setting</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileCover}>
          <Image
            source={{
              uri: c_user.avatar,
            }}
            height={200}
            width={200}
            resizeMode="cover"
          />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Image source={user} resizeMode="cover" />
            <Text style={styles.userName}>{c_user.name}</Text>
          </View>
          <View style={styles.details}>
            <Image source={phone} resizeMode="cover" />
            <Text style={styles.userName}>9632587412</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingContainer: {
    flex: 1,
    backgroundColor: colors.secondaryColor,
  },
  settingHeader: {
    padding: 10,
    backgroundColor: colors.PrimaryColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.blackColor,
  },
  profileCover: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
    borderWidth: 3,
    borderColor: colors.PrimaryColor,
  },
  profileContainer: {
    marginVertical: 20,
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  userName: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.blackColor,
    marginVertical: 10,
    marginLeft: 40,
  },
  details: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer:{
    marginVertical:20,
    justifyContent: 'center',
  }
});

export default Setting;
