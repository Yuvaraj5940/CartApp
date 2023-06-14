import { View, Text ,SafeAreaView,StyleSheet,Dimensions,Image,Pressable,TextInput, FlatList} from 'react-native';
import React,{useState,useEffect} from 'react'
import axiosInstance from '../components/utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { RestoData, SetImagelist } from '../redux/action';
import Scrolimgs from '../components/Scrolimgs';
import Cards from '../components/Cards';

const Dishes = ({navigation}) => {
    const [imgs, setimgs] = useState([]); 
    // const [ImgList, setImgList] = useState([]); 
    // const [resto, setresto] = useState([]);
    // const [data, setdata] = useState([]);
    const dispatch=useDispatch();
    const i=useSelector(state=>state.Reducer)
    console.log('images',i.listimg)
    console.log('restorent images',i.restodata)
    console.log(i.restodata.length)

    const fetchData= async() =>{
        const res=await axiosInstance.get('FoodData/data.json')
        const data= await res.data
        const im=data.cards[0].data.data.cards.map(x=> `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${x.data.creativeId}` )       
        dispatch(SetImagelist(im))
        const rm= data.cards[2].data.data.cards.map(xx=> {
         return {
          img:`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${xx.data.cloudinaryImageId}`,
          rname: `${xx.data.name}`,
          menu:`${xx.data.cuisines}`,
          noOfvote:`${xx.data.totalRatingsString}`,
          rating:`${xx.data.avgRating}`,
          area:`${xx.data.area}`,
          delivary_Time:`${xx.data.sla.deliveryTime}`,
          traveld:`${xx.data?.lastMileTravelString}`,
          offer_h:`${xx.data?.aggregatedDiscountInfoV3?.header}`,
          offer_d:`${xx.data?.aggregatedDiscountInfoV3?.subHeader}`,

        }
        
        })
        dispatch(RestoData(rm))
        // console.log('restorents',rm)
      
    }

    useEffect( () => {
        fetchData()   
    }, [])
    // console.log(imgs)


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.box1}>
            <View style={styles.box1_col1}>
                <View style={styles.box1_col1_row1}>
                    <Image
                        source={require('../asets/images/dish/location.png')}
                        style={styles.img}
                    />
                    <Text style={styles.h2}>Bangalore</Text>
                </View>
                <Text numberOfLines={1} style={styles.h3}>bdhgjsk vjhdsbvksjbm vn jvbsdkf hvgfr gbfrvk khfger jvhfdsjf dsfhksjd dfhsklh dflks</Text>
            </View>
            <Pressable 
            onPress={()=>navigation.navigate('profile')}
            >
                <Image
                    source={require('../asets/images/dish/profile.png')}
                    style={styles.pimg}
                /> 
            </Pressable>       
          </View>
          <View style={styles.search}>
            <TextInput 
            placeholder='Search for dishes and restaurants'
            style={styles.inputText}
            />
            <Image  source={require('../asets/images/dish/search.png')} style={styles.simg}/>
            <View  style={styles.svline}/>
            <Image  source={require('../asets/images/dish/microphone.png')} style={styles.simg}/>

          </View>
          {/* scroll img */}
          <Scrolimgs  />
          <Cards />

          {/* <Image source={{uri:'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/mj1txffjfnjtjmx7ddki'}}
          style={{width:100,height:100}}/>
          <Text>jhjdvghgcksd</Text> */}
         
          {/* <FlatList
          data={i.restodata}
          horizontal
          renderItem={({item,index})=>
            <Image source={{uri:`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${i.restodata[index]}`}}
            style={{width:100,height:100}}/>
          }
          /> */}
          

    </SafeAreaView>
  )
}

export default Dishes;

const styles=StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: '#ffff',    
      },
      img: {
        height: 35,
        width: 40,
      },
      pimg: {
        height: 30,
        width: 30,
      },
      box1:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:10
      },
      box1_col1:{
        flex:1,
        display:'flex',
      },
      box1_col1_row1:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
      },
      h2:{
        fontSize:15,
        color:'#123',
        fontWeight:'bold'
      },
      h3:{
        fontSize:12,
        width:'70%'
      },
      h4:{
        fontSize:10
      },
      search:{
        height:40,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'gray',
        marginHorizontal:15,
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:10,
        paddingHorizontal:10

      },
      simg:{width:20,height:20},
      svline:{borderRightWidth:1, borderColor:'gray',height:25},
      inputText:{flex:1},
     
      

})