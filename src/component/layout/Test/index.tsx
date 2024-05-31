// src/CurvedLogin.js
import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { LinearGradient as Gradient } from 'react-native-linear-gradient';

const CurvedForm = () => {
  return (
    <View style={styles.container}>
      <Svg
        height="40%"
        width="100%"
        viewBox="0 0 1440 320"
        style={styles.curve}
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#0099ff" stopOpacity="1" />
            <Stop offset="100%" stopColor="#00ccff" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          fill="url(#grad)"
          d="M0,224L60,224C120,224,240,224,360,224C480,224,600,224,720,213.3C840,203,960,181,1080,176C1200,171,1320,181,1380,186.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </Svg>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TouchableOpacity style={styles.button}>
          <Gradient colors={['#0099ff', '#00ccff']} style={styles.gradient}>
            <Text style={styles.buttonText}>Login</Text>
          </Gradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  curve: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  form: {
    marginTop: '50%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 5,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CurvedForm;
