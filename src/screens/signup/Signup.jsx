
// SignUp.js
import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Dimensions,
  Image,
  Pressable,
} from 'react-native'
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import CustomInput from '../custom';
import AsyncStorage from '@react-native-async-storage/async-storage';


const signUpValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, ({ min }) => `Names must be at least ${min} characters`)
    .required('Full name is required'),
  phoneNumber: yup
    .string()
    .max(10)
    .matches(/[7-9](\d){9}\b/, 'Enter a valid phone number')
    .required('Phone number is required'),
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})



const SignUp = ({navigation}) => {
  const [ShowP, setShowP] = useState(true); 
  const SigninValidations = async (vls) => {
      const n = {name: vls.fullName, email: vls.email, password: vls.password, phoneNumber:vls.phoneNumber, Adress:vls.Adress};
      let res = await JSON.stringify(n);
      await AsyncStorage.clear()
      await AsyncStorage.setItem('user', res);
      console.log(vls);
      navigation.navigate('Login');
    
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Image
        source={require('../../asets/images/signup.png')}
        style={styles.img}
      />
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
              Adress:''
            }}
            validationSchema={signUpValidationSchema}
            onSubmit={values => SigninValidations(values)}
          >
            {({ handleSubmit, isValid, errors }) => (
              <>
                <Field
                  component={CustomInput}
                  name="fullName"
                  placeholder="Full Name"
                />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="numeric"
                />
                <Field
                  component={CustomInput}
                  name="Adress"
                  placeholder="Adress"
                  multiline
                  numberOfLines={2}
                  />
                  <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry={ShowP}
                  />
                <View style={styles.passwordfild}>
                     <View style={styles.passwordtext}>
                        <Field
                          // style={{flex:1}}
                          component={CustomInput}
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          secureTextEntry={ShowP}
                        />
                     </View>
                      <Pressable style={{height:30, width:30}}
                           onPress={() => (ShowP ? setShowP(false) : setShowP(true))}>
                        <Image source={ShowP ? require('../../asets/images/hide.png'): require('../../asets/images/unhide.png')}  
                           style={{height:25, width:25}} />
                    </Pressable>
                </View>

               <View style={styles.btns}>
                  <Button
                     onPress={handleSubmit}
                     title="SIGN UP"
                     disabled={!isValid}
                   />
                   <Pressable onPress={()=>navigation.navigate('Login')}>
                    <Text style={{color:'blue'}}>already have an acount?</Text>
                   </Pressable>
               </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
     width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',

  },
  signupContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
  },
  img: {
        height: 100,
        width: 100,
      },
      inputText: {
        borderWidth: 1,
        borderColor: '#123',
        width: '80%',
      },
      passwordfild: {
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
      },
      passwordtext:{
        flex:1, paddingRight:10, justifyContent:'center', alignItems:'center', paddingTop:20
      },
      btns:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:10,
        padding:10

      }

})
export default SignUp