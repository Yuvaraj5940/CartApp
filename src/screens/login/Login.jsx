import { View, Text,StyleSheet,Dimensions,Button, SafeAreaView,Image, Pressable,Alert } from 'react-native'
import React ,{useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik, Field } from 'formik';
import CustomInput from '../custom';
import * as yup from 'yup';


const signUpValidationSchema = yup.object().shape({
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
})

const Login = ({navigation}) => {
  const [ShowP, setShowP] = useState(true); 
  const [err, seterr] = useState(null); 

const Forgotp= async()=>{
  const res = await AsyncStorage.getItem('user');
    const newres = await JSON.parse(res);
    Alert.alert(`Email :-  ${newres.email}`, `Password :-  ${newres.password}`, [
      {text: 'got it'},
    ]);
}
  const Loginvalidations= async(vls)=>{
    const res = await AsyncStorage.getItem('user');
    const newres = await JSON.parse(res);
    // console.log(newres)
    // console.log(vls)
    if(newres.email===vls.email){
      if(newres.password===vls.password){
        navigation.navigate('home')
      }else{
        seterr('Invalid password')
      }
    }else{
      seterr('Invalid user name')
    }
  }

  return (

    <>
    <SafeAreaView style={styles.container}>
        <View style={styles.signupContainer}>
          <Image
        source={require('../../asets/images/login-.png')}
        style={styles.img}
      />
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={signUpValidationSchema}
            onSubmit={values => Loginvalidations(values)}
          >
            {({ handleSubmit, isValid, errors }) => (
              <>
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <View style={styles.passwordfild}>
                     <View style={styles.passwordtext}>
                        <Field
                          // style={{flex:1}}
                          component={CustomInput}
                          name="password"
                          placeholder="password"
                          secureTextEntry={ShowP}
                        />
                     </View>
                      <Pressable style={{height:30, width:30}}
                           onPress={() => (ShowP ? setShowP(false) : setShowP(true))}>
                        <Image source={ShowP ? require('../../asets/images/hide.png'): require('../../asets/images/unhide.png')}  
                           style={{height:25, width:25}} />
                    </Pressable>
                </View>
                {
                  err?<Text style={{color:'red',padding:10}}>{err}</Text>:null
                }
                <Pressable onPress={()=>Forgotp()} style={{width:'100%'}}>
                      <Text style={{color:'blue', textAlign:'left'}}>forgot password?</Text>
                </Pressable>
                <View style={{display:'flex', flexDirection:'row', paddingTop:15}}>
                  <Text style={{color:'#123'}}>dont have an acount?</Text>
                  <Pressable>
                    <Text style={{color:'blue'}}>Sign up</Text>
                    </Pressable>
                </View>
    
                 <View style={styles.btns}>
                    <Button
                      onPress={handleSubmit}
                      title="Log in"
                      disabled={!isValid}
                    />
          
                  </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
  )
}

export default Login;
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
    // display:'flex',
    // flexDirection:'row',
    // alignItems:'center',
    // justifyContent:'center',
    gap:10,
    padding:10
  }
})