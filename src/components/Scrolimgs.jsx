import { View, Text,StyleSheet,Dimensions,Image,SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SliderBox } from "react-native-image-slider-box";
import { useSelector } from 'react-redux';


const Scrolimgs = () => {
    const x=useSelector(state=>state.Reducer)
    // console.log('ss',x.listimg)
    
  return (
    <>
      <SafeAreaView style={styles.container}>
        <SliderBox
            images={x.listimg}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            dotStyle={{
              width: 15,
              height: 15,
              borderRadius: 15,
              padding: 0,
              margin: 0
            }}
            autoplay
            circleLoop
            ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop:5}}
            imageLoadingColor="#2196F3"            
            />

        
            </SafeAreaView>
            
      </>
  )
}

export default Scrolimgs;
const styles=StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        // height: Dimensions.get('screen').height,
        marginVertical:5 
      },
      img:{
        width: Dimensions.get('screen').width,
        height:200,
      }

    });