import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../constants/colors';
import {Button, Divider, Menu} from 'react-native-paper';
import {fonts} from '../../../constants/fonts';

const arrow = require('../../../asset/icon/Arrow.png');
const logOutBtn = require('../../../asset/icon/logout.png');
const menu = require('../../../asset/icon/dots.png');
const setting = require('../../../asset/icon/setting.png');
const text = require('../../../asset/image/small.png');

interface headerProps {
  title?: string;
  image?: any;
  isShow?: boolean;
  logOut?: boolean;
  onPress?: () => void;
  c_user?: any;
}

const Header = (props: headerProps) => {
  const navigation = useNavigation();
  const {title, image, isShow, logOut, onPress, c_user} = props;
  
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <View>
      {isShow && (
        <View style={styles.headerContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={arrow} style={{marginRight: 20}} />
          </Pressable>
          {image && (
            <Image
              source={{uri: image}}
              style={{marginRight: 20}}
              height={30}
              width={30}
            />
          )}
          <Text style={styles.text}>{title}</Text>
        </View>
      )}
      {logOut && (
        <View style={styles.logoutContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={text} style={{marginRight: 20}} resizeMode="cover" />
            <Text style={styles.text}>Message Forest</Text>
          </View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Pressable onPress={openMenu}>
                <Image source={menu} />
              </Pressable>
            }
            contentStyle={{
              backgroundColor: colors.whiteColor,
              borderRadius: 20,
            }}>
            <Menu.Item
              onPress={onPress}
              title="Loge Out"
              leadingIcon={logOutBtn}
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                navigation.navigate('Setting', {c_user: c_user});
                setVisible(false)
              }}
              title="Setting"
              leadingIcon={setting}
            />
          </Menu>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.PrimaryColor,
    padding: 20,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutContainer: {
    backgroundColor: colors.PrimaryColor,
    padding: 20,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontFamily: fonts.bold,
  },
});

export default Header;
