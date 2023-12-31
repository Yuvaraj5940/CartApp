import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axiosInstance from '../components/utils/axios';
import {useDispatch, useSelector} from 'react-redux';
import {LoadMenu, RestoData, SetImagelist} from '../redux/action';
import Scrolimgs from '../components/Scrolimgs';
import Cards from '../components/Cards';

const Dishes = ({navigation}) => {
  // const [imgs, setimgs] = useState([]);
  const [isLoad, setisLoad] = useState(false);

  const dispatch = useDispatch();
  const i = useSelector(state => state.Reducer);
  console.log('images', i.listimg);
  console.log('restorent images', i.restodata);

  const fetchData = async () => {
    const res = await axiosInstance.get('/data.json');
    const data = await res.data;
    const im = data.cards[0].data.data.cards.map(
      x =>
        `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${x.data.creativeId}`,
    );
    dispatch(SetImagelist(im));
    const rm = data.cards[2].data.data.cards.map(xx => {
      return {
        img: `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${xx.data.cloudinaryImageId}`,
        rname: `${xx.data.name}`,
        menu: `${xx.data.cuisines}`,
        noOfvote: `${xx.data.totalRatingsString}`,
        rating: `${xx.data.avgRating}`,
        area: `${xx.data.area}`,
        delivary_Time: `${xx.data.sla.deliveryTime}`,
        traveld: `${xx.data?.lastMileTravelString}`,
        offer_h: `${xx.data?.aggregatedDiscountInfoV3?.header}`,
        offer_d: `${xx.data?.aggregatedDiscountInfoV3?.subHeader}`,
      };
    });
    dispatch(RestoData(rm));
    setisLoad(true);
  };
  
  const loadMenu= async()=>{
    const res=await axiosInstance.get('menuItem.json')
    const data=await res.data
    const rmenu=data.itemCards.map(x=>{
        return {
            food_name: x.card.info.name,
            food_img: `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${x.card.info.imageId}`,
            category: x.card.info.category,
            id: x.card.info.id,
            ratings: x.card.info.ratings.aggregatedRating.rating,
            price: x.card.info.price,
            ratingCount: x.card.info.ratings.aggregatedRating.ratingCountV2,
            quantity:0,

        }
        })
    dispatch(LoadMenu(rmenu))
}

  useEffect(() => {
    fetchData();
    loadMenu();

  }, []);

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
          <Text numberOfLines={1} style={styles.h3}>
            bdhgjsk vjhdsbvksjbm vn jvbsdkf hvgfr gbfrvk khfger jvhfdsjf
            dsfhksjd dfhsklh dflks
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Image
            source={require('../asets/images/dish/profile.png')}
            style={styles.pimg}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <TextInput
          placeholder="Search for dishes and restaurants"
          style={styles.inputText}
        />
        <Image
          source={require('../asets/images/dish/search.png')}
          style={styles.simg}
        />
        <View style={styles.svline} />
        <Image
          source={require('../asets/images/dish/microphone.png')}
          style={styles.simg}
        />
      </View>
      {/* scroll img */}

      {isLoad ? (
        <Scrolimgs />
      ) : (
        <View style={[styles.cont, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}


      {/* hotell */}
      {isLoad ? (
        <Cards navigation={navigation} />
      ) : (
        <View style={[styles.cont, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Dishes;

const styles = StyleSheet.create({
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
  box1: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  box1_col1: {
    flex: 1,
    display: 'flex',
  },
  box1_col1_row1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  h2: {
    fontSize: 15,
    color: '#123',
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 12,
    width: '70%',
  },
  h4: {
    fontSize: 10,
  },
  search: {
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    marginHorizontal: 15,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
  },
  simg: {width: 20, height: 20},
  svline: {borderRightWidth: 1, borderColor: 'gray', height: 25},
  inputText: {flex: 1},
  cont: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
