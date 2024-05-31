import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../constants/colors';
import {TextInput} from 'react-native-paper';
import {fonts} from '../../constants/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

GoogleSignin.configure({
  webClientId:
    '912943788269-o2ieqru43usllc2au2bnktlt8da6n03v.apps.googleusercontent.com',
});

type errorObj = {
  email?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
};

const handWave = require('../../asset/icon/create.png');
const Google = require('../../asset/icon/Google.png');

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [formError, setFormError] = useState<errorObj>({});
  const ref = firestore().collection('users');

  const RegisterData = () => {
    const error: errorObj = {};
    if (!email) {
      error.email = 'Please Enter Email';
    } else if (!pass) {
      error.password = 'Please Enter Password';
    } else if (!name) {
      error.password = 'Please Enter Name';
    }

    setFormError(error);
    if (Object.keys(error).length === 0) {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(userCredential => {
          const {user} = userCredential;
          if (user) {
            ref.doc(user.uid).set({
              name: name,
              email: email,
              password: pass,
              uid: user.uid,
            });
          }
          setEmail('');
          setPass('');
          Alert.alert('Register Successfully');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }
          if (error.code === 'auth/weak-password') {
            Alert.alert('Password should be at least 6 characters');
          }
          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
          console.error(error);
        });
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential).then(userCredential => {
        const {user} = userCredential;
        if (user) {
          ref.doc(user.uid).set({
            name: name,
            email: email,
            password: pass,
            uid: user.uid,
          });
        }
        Alert.alert('Signed in with Google!');
      })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('User cancelled the login process');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available or outdated');
      } else {
        Alert.alert('Something went wrong with Google Sign In');
        console.error('Google Sign In Error:', error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.form}>
        <Animatable.View
          style={styles.titleBox}
          animation="fadeInDownBig"
          duration={1200}>
          <Text style={styles.title}>Create Account</Text>
          <Image source={handWave} />
        </Animatable.View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setName}
            value={name}
            label={'Name'}
            style={styles.input}
            activeUnderlineColor={colors.PrimaryColor}
            underlineColor={colors.secondaryColor}
          />
          {formError.name && (
            <Text style={styles.error}>{formError.name}</Text>
          )}
          <TextInput
            onChangeText={setEmail}
            value={email}
            label={'Email'}
            style={styles.input}
            activeUnderlineColor={colors.PrimaryColor}
            underlineColor={colors.secondaryColor}
          />
          {formError.email && (
            <Text style={styles.error}>{formError.email}</Text>
          )}
          <TextInput
            onChangeText={setPass}
            value={pass}
            label={'Password'}
            style={styles.input}
            secureTextEntry={true}
            activeUnderlineColor={colors.PrimaryColor}
            underlineColor={colors.secondaryColor}
          />
          {formError.password && (
            <Text style={styles.error}>{formError.password}</Text>
          )}
        </View>
        <View style={styles.signUpContainer}>
          <Pressable style={styles.btn} onPress={RegisterData}>
            <Text style={styles.btnText}>SIGN UP</Text>
          </Pressable>
          <Text style={styles.option}>Or</Text>
          <Pressable style={styles.googleContainer} onPress={googleSignIn}>
            <Animatable.Image source={Google} animation="swing" />
          </Pressable>
        </View>
      </View>
      <View style={styles.navigationContainer}>
        <Text style={styles.text1}>Do You have account ?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}> Login</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  googleContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: colors.redColor,
  },
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: colors.whiteColor,
  },
  input: {
    marginVertical: 10,
    backgroundColor: colors.secondaryColor,
    color: colors.blackColor,
    fontFamily: fonts.medium,
  },
  form: {
    marginTop: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    color: colors.blackColor,
    fontFamily: fonts.bold,
    marginRight: 11,
  },
  titleBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.016,
  },
  inputContainer: {
    marginTop: 40,
  },
  button: {
    marginTop: 67,
  },
  btnText: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    color: colors.blackColor,
  },
  signUpContainer: {
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  btn: {
    marginTop: 24,
    padding: 14,
    borderRadius: 17,
    backgroundColor: colors.PrimaryColor,
  },
  inputs: {
    marginVertical: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text1: {
    fontFamily: fonts.regular,
  },
  option: {
    color: colors.blackColor,
    marginVertical: 20,
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
  linkText: {
    textAlign: 'center',
    color: colors.linkColor,
    fontFamily: fonts.regular,
  },
});

export default Register;
