import { View, Text,StyleSheet,Dimensions,Image } from 'react-native'
import React from 'react'

const Splash = ({navigation}) => {

    setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);

  return (
    <View style={styles.container}>
       
      <Image
          source={require('../asets/images/sp/fdi.jpg')}
          style={styles.pimg1}            
      />

      <View style={{display:'flex',flexDirection:'row',gap:10}}>
        <Image
          source={require('../asets/images/sp/food-d.png')}
          style={styles.pimg}            
        /> 
        <Image
          source={require('../asets/images/sp/splash.png')}
          style={styles.pimg}            
        /> 
      </View>

    </View>
  )
}

export default Splash;
const styles=StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#CCD1D1',  

      },
      pimg:{
        width:60,
        height:60
      },
      pimg1:{
        width:200,
        height:200,
        marginBottom:50
        
      }

    });