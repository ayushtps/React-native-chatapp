import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import {TextInput} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const handWave = require('../../asset/icon/waving-hand.png');

type errorObj = {
  email?: string | undefined;
  password?: string | undefined;
};

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [formError, setFormError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const loginData = async () => {
    const error: errorObj = {};
    if (!email) {
      error.email = 'Please Enter Email';
    } else if (!pass) {
      error.password = 'Please Enter Password';
    }

    setFormError(error);
    if (Object.keys(error).length === 0) {
      try {
        await auth().signInWithEmailAndPassword(email, pass);
        setEmail('');
        setPass('');
        Alert.alert('Login Successfully');
      } catch (error) {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert('Invalid Email or Password');
        }
        console.error(error);
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
          <Text style={styles.title}>Welcome Back</Text>
          <Image source={handWave} />
        </Animatable.View>
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            value={email}
            style={styles.input}
            onChangeText={setEmail}
            activeUnderlineColor={colors.PrimaryColor}
            underlineColor={colors.secondaryColor}
            textColor={colors.blackColor}
          />
          {formError.email && (
            <Text style={styles.error}>{formError.email}</Text>
          )}
          <TextInput
            onChangeText={setPass}
            value={pass}
            label="Password"
            style={styles.input}
            secureTextEntry={true}
            activeUnderlineColor={colors.PrimaryColor}
            underlineColor={colors.secondaryColor}
            textColor={colors.blackColor}
          />
          {formError.password && (
            <Text style={styles.error}>
              {formError.password}
            </Text>
          )}
        </View>
        <Pressable style={styles.btn} onPress={loginData}>
          <Text style={styles.btnText}>SIGN IN</Text>
        </Pressable>
      </View>
      <View style={styles.navigationContainer}>
        <Text style={styles.text1}>Don’t have account ?</Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}> Register</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: colors.whiteColor,
  },
  input: {
    marginVertical: 10,
    backgroundColor:colors.secondaryColor,
    color:colors.blackColor,
    fontFamily:fonts.medium
  },
  form: {
    marginTop: 150,
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
    fontFamily:fonts.bold,
    color: colors.blackColor,
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
    color:colors.blackColor,
    fontFamily: fonts.regular,
  },
  linkText: {
    textAlign: 'center',
    color: colors.linkColor,
    fontFamily: fonts.regular,
  },
  error:{
    color:colors.redColor
  }
});

export default Login;
