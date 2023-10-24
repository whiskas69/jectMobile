import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Alert, TouchableHighlight, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/core';
import { Input } from 'react-native-elements';

import { AntDesign, Fontisto } from '@expo/vector-icons';
import iconfood from '../../assets/pic/iconfood.png';
import { auth, firebase, firestore } from '../../database/firebaseDB';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Formik } from 'formik';
import * as Yup from 'yup';

const RegistrationScreen = () => {

  // console.log(firebase.firestore().collection("users"))

  const navigation = useNavigation()
  const [isChecked1, setIsChecked1] = useState(false);
  const handleCheck1 = () => {
    console.log(isChecked1)
  };

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Main")

      }
    })

    return unsubscribe
  }, [])


  const handleSignUp = (email, password, username, values) => {

    // const {name} = values
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);

        // Now, let's add user data to Firestore
        const userData = {
          email: user.email,
          username: username,
          password: password,
          profile: "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",

          // Add other user data fields as needed
        };

        // Add the user data to Firestore
        addDoc(collection(firestore, 'user'), userData)
          .then(() => {
            console.log('User data added to Firestore');

            // alert("Correct")
          })
          .catch(error => {
            console.error('Error adding user data to Firestore:', error);
          });
      })
      .catch(error => {
        alert(error.message);
      });

  }

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please Enter your name'),
    email: Yup.string().email('Invalid email').required('Please Enter your email address'),
    password: Yup.string().min(6).required('Please enter your password').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%_^&~*-]).{8,}$/, "Must contain minimum 8 char"),
    ConfirmPassword: Yup.string().min(8).oneOf([Yup.ref('password')], "Your Password do not match").required("Confrim Password is required"),
  });
  return (

    <Formik
      initialValues={{
        email: '',
        username: '',
        password: '',
        ConfirmPassword: ''
      }}
      validationSchema={SignupSchema}>



      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (


        <View style={styles.container}>
          <Image source={{ uri: 'https://media.discordapp.net/attachments/1133043763456000071/1151545256026849290/logo2.png' }} 
          style={styles.logo} />

          <Text style={styles.title}> Registration {'\n'}</Text>



          <TextInput style={styles.input} placeholder='Full Name' value={values.username} onChangeText={handleChange('username')} onBlur={() => setFieldTouched('username')} />
          {touched.username && errors.username && (
            <Text style={{ color: 'red' }}>{errors.username}</Text>
          )}


          <TextInput style={styles.input} placeholder='E-mail' keyboardType='email-address' value={values.email} onChangeText={handleChange('email')} onBlur={() => setFieldTouched('email')} />
          {touched.email && errors.email && (
            <Text style={{ color: 'red' }}>{errors.email}</Text>
          )}

          <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} value={values.password} onChangeText={handleChange('password')} onBlur={() => setFieldTouched('password')} />
          {touched.password && errors.password && (
            <Text style={{ color: 'red' }}>{errors.password}</Text>
          )}
          <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry={true} value={values.ConfirmPassword} onChangeText={handleChange('ConfirmPassword')} onBlur={() => setFieldTouched('ConfirmPassword')} />

          {touched.ConfirmPassword && errors.ConfirmPassword && (
            <Text style={{ color: 'red' }}>{errors.ConfirmPassword}</Text>
          )}
          <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center', justifyContent: 'center' }}>


            <Text style={{
              color: 'red', marginStart: 10,
              fontFamily: 'Anuphan'
            }}>agree that our app does not
              cover money fraud. (require) </Text>

          </View>

          <TouchableOpacity style={[styles.button, { marginTop: 20, marginBottom: 10, width: '40%', backgroundColor: !isValid || isChecked1 == false || values.username == "" || values.password == "" || values.ConfirmPassword == "" || values.email == "" ? '#666' : '#8667F2', }]} onPress={() => handleSignUp(values.email, values.password, values.username)}>
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', fontSize: 12, }}>
            <Text style={{
              color: '#000',
              fontFamily: 'Anuphan'
            }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text style={{
                color: 'blue',
                fontFamily: 'Anuphan'
              }} Í> login</Text>

            </TouchableOpacity>
          </View>
        </View>
      )}

    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 5,
  },
  logo: {
    // width: responsiveWidth(40),
    // height: responsiveHeight(20),
    borderRadius: 100,
  },
  input: {
    fontSize: 16,
    borderBottomColor: "#262B46",
    backgroundColor: '#F6F7F9',
    width: "80%",
    borderBottomWidth: 2,
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    fontFamily: 'Anuphan'
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: '400',
    fontFamily: 'Anuphan'
  },
  button: {

    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Anuphan'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Anuphan'
  },
});


export default RegistrationScreen;