import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../components/utils/axios';
import {useDispatch, useSelector} from 'react-redux';
import {AddLoadMenu, LoadMenu} from '../redux/action';
import Stars from 'react-native-stars';

const Menu = ({navigation}) => {
  const dispatch = useDispatch();
  const i = useSelector(state => state.Reducer.menuList);
  console.log('menulist:', i);

  const editmenu = async re => {
    const mindex = await i.findIndex(x => x.id === re.id);
    console.log(re);
    const updatemenu = [
      ...i.slice(0, mindex),
      {...re, quantity: re.quantity + 1},
      ...i.slice(mindex + 1),
    ];
    dispatch(LoadMenu(updatemenu));
  };

  const removetmenu = async re => {
    const mindex = await i.findIndex(x => x.id === re.id);
    // console.log(re);
    const updatemenu = [
      ...i.slice(0, mindex),
      {...re, quantity: re.quantity - 1},
      ...i.slice(mindex + 1),
    ];
    dispatch(LoadMenu(updatemenu));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('dishes')}>
          <Image
            source={require('../asets/images/profile/arrow-left.png')}
            style={styles.backbtn}
          />
        </Pressable>
        <Text style={styles.headerText}>Menu</Text>
      </View>

      <FlatList
        data={i}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <>
            <View style={styles.box}>
              <View style={styles.box_col1}>
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
                <Text style={styles.h2}>{item.food_name}</Text>
                <Text style={styles.h3}>
                  &#8377; {Number(`${item.price}`) / 100}
                </Text>
                <View
                  style={{
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    marginVertical: 5,
                  }}>
                  <Stars
                    default={Number(`${item.ratings}`)}
                    count={5}
                    half={true}
                    starSize={15}
                    fullStar={
                      <Image
                        source={require('../asets/images/menu/starf.png')}
                        style={styles.star}
                      />
                    }
                    emptyStar={
                      <Image
                        source={require('../asets/images/menu/stare.png')}
                        style={styles.star}
                      />
                    }
                    halfStar={
                      <Image
                        source={require('../asets/images/menu/rating.png')}
                        style={styles.star}
                      />
                    }
                  />
                  <Text style={{color: 'orange', paddingLeft: 5}}>
                    {item.ratings}
                  </Text>
                  <Text style={{color: '#123'}}> ({item.ratingCount})</Text>
                </View>
              </View>
              <View>
                <Image
                  source={{
                    uri: `${item.food_img}`,
                  }}
                  style={styles.img}
                />
                {item.quantity === 0 ? (
                  <Pressable
                    style={styles.press}
                    onPress={() => editmenu(item)}>
                    <Text style={styles.embtnText}>ADD</Text>
                  </Pressable>
                ) : (
                  <View style={[styles.press, {flexDirection: 'row'}]}>
                    <Pressable
                      style={styles.embtn}
                      onPress={() => removetmenu(item)}>
                      <Text style={[styles.embtnText]}>&minus;</Text>
                    </Pressable>
                    <Text style={{margin: 5}}>{item.quantity}</Text>
                    <Pressable
                      style={styles.embtn}
                      onPress={() => editmenu(item)}>
                      <Text style={styles.embtnText}>+</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                marginTop: 10,
                borderColor: 'gray',
              }}
            />
          </>
        )}
      />
     
        <Pressable
          style={styles.cartdiv}
          onPress={() => navigation.navigate('cart')}>
          <Text style={styles.carttext}>View Cart</Text>
        </Pressable>
    
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#ffff',
    padding: 10,
    paddingBottom: 10,
  },
  img1: {
    width: 20,
    height: 20,
    tintColor: 'green',
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  box_col1: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#123',
  },
  h3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#123',
    paddingVertical: 5,
  },
  star: {
    width: 15,
    height: 15,
  },
  press: {
    width: '80%',
    backgroundColor: '#ffff',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'gray',
    top: 125,
    elevation: 10,
    padding: 5,
  },
  headerText: {
    fontSize: 30,
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
  backbtn: {
    width: 30,
    height: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  embtn: {flex: 1, borderRadius: 5, justifyContent: 'center'},
  embtnText: {
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    fontSize: 20,
  },
  cartdiv: {
    width: '80%',
    elevation: 10,
    alignSelf: 'center',
    position: 'relative',
    bottom: 30,
    borderRadius: 10,
    backgroundColor: '#45EA47',
  },
  carttext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    paddingVertical: 5,
    textAlign: 'center',
  },
});
