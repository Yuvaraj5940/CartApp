import { View, Text,StyleSheet,Dimensions, TouchableOpacity, Image } from 'react-native'
import React,{useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker,{launchImageLibrary} from 'react-native-image-picker';


const Profile = ({navigation}) => {
  const [pdata, setpdata] = useState(null)

  const Forgotp= async()=>{
    const res = await AsyncStorage.getItem('user');
      const newres = await JSON.parse(res);
      setpdata(newres)
    }
    useEffect(() => {
      Forgotp()
    }, [])

    imageGalleryLaunch = () => {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, (res) => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          const source = { uri: res.uri };
          console.log('response', JSON.stringify(res));
          // this.setState({
          //   filePath: res,
          //   fileData: res.data,
          //   fileUri: res.uri
          // });
        }
      });
    }
    
    
    // console.log(pdata)
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{marginBottom:15}}
          onPress={()=>navigation.navigate('dishes')}
          >
          <Image
            source={require('../asets/images/profile/left-arrow.png')}
                style={styles.img}
          />
      </TouchableOpacity>

      <View style={styles.img_div}>
      <Image
            source={require('../asets/images/sp/fdi.jpg')}
                style={styles.prof}
          />
          <TouchableOpacity style={styles.img_btn}
          onPress={ ()=>imageGalleryLaunch() }
          >
              <Image
                source={require('../asets/images/profile/camera.png')}
                    style={styles.inner_img_btn}
              />

          </TouchableOpacity>

      </View>
      <View style={styles.row2}>
        <View style={styles.row1}>
          <Text style={styles.h2}>{pdata?.name}</Text>
          <Text style={styles.edit}>EDIT</Text>
        </View>
        <Text style={styles.h3}>+91- {pdata?.phoneNumber} &bull; {pdata?.email}</Text>
      </View>

      <View style={[styles.hr,{borderColor:'#123'}]} />

      <View style={styles.rr}>
        <View style={{flex:1}}>
          <Text style={[styles.h4,{fontWeight:'bold',fontSize:17}]}>My Account</Text>
          <Text style={styles.h4}> Favourits, Hidden restorents & Settings </Text>
        </View>
        <Image
            source={require('../asets/images/profile/next.png')}
                style={styles.arrow}
          />
      </View>
      <View style={styles.hr} />


      <View style={styles.rr}>
      <View style={{flex:1}}>
      <Text style={[styles.h4,{fontWeight:'bold',fontSize:17}]}>Adress</Text>
        <Text style={styles.h4}> {pdata?.Adress} </Text>
        </View>
        <Image
            source={require('../asets/images/profile/next.png')}
                style={styles.arrow}
          />
     
      </View>
      <View style={styles.hr} />

      <View style={styles.rr}>
        <View style={{flex:1}}>
          <Text style={[styles.h4,{fontWeight:'bold',fontSize:17}]}>App Money</Text>
          <Text style={styles.h4}> View Account Balance & Transactions History </Text>
        </View>
        <Image
            source={require('../asets/images/profile/next.png')}
                style={styles.arrow}
          />
      </View>
      <View style={styles.hr} />

      <View style={styles.rr}>
        <View style={{flex:1}}>
          <Text style={[styles.h4,{fontWeight:'bold',fontSize:17}]}>Help</Text>
          <Text style={styles.h4}> FAQs & Links </Text>
        </View>
        <Image
            source={require('../asets/images/profile/next.png')}
                style={styles.arrow}
          />
      </View>
      <View style={styles.hr} />

      <TouchableOpacity style={styles.btn}
          onPress={()=>navigation.navigate('Login')}
          >
        <Text style={{fontSize:20,fontWeight:'bold',color:"#ffff"}}>Log Out?</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    padding:20,
    backgroundColor: '#ffff',
  },
  img:{
    width:30,
    height:30
  },
  h2:{
    fontSize:22,
    color:'#123',
    fontWeight:'bold',
    flex:1
  },
  h3:{
    fontSize:15,
    color:'#123',
    // fontWeight:'bold'
  },
  h4:{
    fontSize:14,
    color:'#123',
  },
  edit:{
    color:'red'
  },
  row1:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  row2:{
    marginVertical:10,
    gap:5
  },
  hr:{
    borderWidth: StyleSheet.hairlineWidth,
    borderColor:'gray'
  },
  prof:{
    width:200,
    height:200,
    borderRadius:150,
    borderWidth:1.5,
    borderColor:'gray'
  },arrow:{
    width:20,
    height:10
  },rr:{marginTop:20,flexDirection:'row', justifyContent:'center',alignItems:'center',marginBottom:10},
  btn:{
    width:'80%',
    height:50,
    borderRadius:20,
    backgroundColor:'#3A54AF',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop:20
  },
  img_div:{width:'100%',justifyContent:'center', alignItems:'center',marginVertical:20,height:210},
  img_btn:{width:55,height:55, backgroundColor:'#7DD37E',borderRadius:27, position:'relative',bottom:50, left:55, justifyContent:'center',alignItems:'center'},
  inner_img_btn:{
    width:35,
    height:35,
    tintColor:'#ffff'
  }


});