import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartItems = ({navigation}) => {
  const [pdata, setpdata] = useState(null);
  const [list, setlist] = useState([]);
  const i = useSelector(state => state.Reducer.menuList);
  console.log('menulist in cart:', i);
  const Forgotp = async () => {
    const res = await AsyncStorage.getItem('user');
    const newres = await JSON.parse(res);
    setpdata(newres);
  };
  const filtercart = () => {
    const filterdata = i.filter(x => x.quantity > 0);
    setlist(filterdata);
    console.log('filterdata', filterdata);
  };

  useEffect(() => {
    filtercart();
    Forgotp();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.r1}>
        <Image
          source={require('../asets/images/cart/home.png')}
          style={styles.adimg}
        />
        <View style={styles.rc1}>
          <Text style={styles.h2}> Delivery Adresss</Text>
          <Text numberOfLines={1}>{pdata?.Adress}</Text>
        </View>
      </View>

      <View style={styles.rc2}>
        <FlatList
          data={list}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Image
                source={require('../asets/images/menu/dot.png')}
                style={[
                  styles.img1,
                  {
                    tintColor:
                      item.category === 'Veg Starter' ? 'green' : 'red',
                  },
                ]}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  {item.food_name}
                </Text>
                <View style={{flexDirection: 'row', gap: 20}}>
                  <Text style={{fontWeight: 'bold', color: '#123'}}>
                    quantity({ item.quantity })
                  </Text>
                  <Text style={{color: '#123', fontWeight: 'bold'}}>
                       &#8377; {(Number(`${item.price}`) / 100) * item.quantity}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      <Pressable
        style={styles.cartdiv}
        onPress={() => Alert.alert('payment successful', 'Thank you')}>
        <Text style={styles.carttext}>Make Payment</Text>
      </Pressable>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'gray',
    //   justifyContent:'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
    gap: 20,
  },
  adimg: {
    width: 40,
    height: 40,
    tintColor: 'red',
  },
  r1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ffff',
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  h2: {
    fontSize: 20,
    color: '#123',
    fontWeight: 'bold',
  },
  rc1: {flex: 1, gap: 5, margin: 5},
  img1: {
    width: 20,
    height: 20,
    tintColor: 'green',
  },
  rc2: {
    width: '100%',
    backgroundColor: '#ffff',
    padding: 5,
    borderRadius: 10,
    height: '70%',
  },
  cartdiv: {
    width: '100%',
    elevation: 10,
    alignSelf: 'center',
    position: 'relative',
    top: 0,
    borderRadius: 10,
    backgroundColor: '#45EA47',
  },
  carttext: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffff',
    paddingVertical: 5,
    textAlign: 'center',
  },
});
