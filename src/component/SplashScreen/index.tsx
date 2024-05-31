import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { colors } from '../../constants/colors';

const themeLogo = require('../../asset/image/theam-logo.png');

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Animatable.View animation="pulse" iterationCount={2} direction="alternate">
        <Image source={themeLogo} resizeMode='cover'/>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SplashScreen;
