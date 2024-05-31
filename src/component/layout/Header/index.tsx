import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Divider, Menu, Modal, Portal} from 'react-native-paper';
import {colors} from '../../../constants/colors';
import {fonts} from '../../../constants/fonts';

const arrow = require('../../../asset/icon/Arrow.png');
const logOutBtn = require('../../../asset/icon/logout.png');
const menu = require('../../../asset/icon/dots.png');
const setting = require('../../../asset/icon/setting.png');
const text = require('../../../asset/image/Group.png');

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

  const [visible1, setVisible1] = React.useState(false);

  const showModal = () => setVisible1(true);
  const hideModal = () => setVisible1(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin:20,
    borderRadius:20
  };
  return (
    <View>
      {isShow && (
        <View style={styles.headerContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={arrow} style={{marginRight: 20}} />
          </Pressable>
          {image && (
            <Pressable onPress={showModal}>
              <Image
                source={{uri: image}}
                style={{marginRight: 20, borderRadius: 50}}
                height={35}
                width={35}
              />
            </Pressable>
          )}
          <Text style={styles.text}>{title}</Text>
          <Portal>
            <Modal
              visible={visible1}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image
                  source={{uri: image}}
                  style={{marginRight: 20, borderRadius: 50}}
                  height={150}
                  width={150}
                />
                <Text style={{fontFamily:fonts.bold,fontSize:18,color:colors.blackColor}}>{title}</Text>
              </View>
            </Modal>
          </Portal>
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
              titleStyle={{color: colors.blackColor}}
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                navigation.navigate('Setting', {c_user: c_user});
                setVisible(false);
              }}
              title="Setting"
              leadingIcon={setting}
              titleStyle={{color: colors.blackColor}}
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
