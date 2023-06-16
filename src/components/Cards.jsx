import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const Cards = () => {
  const data = [{name: 'dmw'}, {name: 'kljhs'}];
  const i = useSelector(state => state.Reducer);
  console.log(i.restodata);
  console.log(i.restodata[0].noOfvote.match(/\d/g).join(''));

  const extract = v => {
    let rrr = v.match(/\d/g)?.join('');
    if (isNaN(rrr)) {
      return null;
    } else {
      if (rrr >= 1000) {
        return '(' + rrr / 1000 + 'K+)';
      }
      return '(' + rrr + '+' + ')';
    }
  };
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={i.restodata}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.cards}>
              <View style={styles.card_img}>
                <ImageBackground
                  imageStyle={{borderRadius: 10}}
                  source={{uri: `${item.img}`}}
                  style={{resizeMode: 'cover', width: '100%', height: '100%'}}>
                  <Pressable>
                    <Image
                      source={require('../asets/images/cards/heart.png')}
                      style={styles.simg2}
                    />
                  </Pressable>
                  <View
                    style={{
                      position: 'relative',
                      top: 70,
                      borderRadius: 10,
                      paddingVertical: 5,
                      backgroundColor: 'transparent',
                    }}>
                    <Text style={styles.omimgText1}>
                      {item.offer_h !== 'undefined' ? item.offer_h : null}
                    </Text>
                    <Text style={styles.omimgText2}>
                      {item.offer_d !== 'undefined' ? item.offer_d : null}
                    </Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.card_col2}>
                <Pressable style={styles.more}>
                  <Image
                    source={require('../asets/images/cards/more.png')}
                    style={styles.simg1}
                  />
                </Pressable>
                <Text numberOfLines={1} style={styles.h2}>
                  {item.rname}
                </Text>
                <View style={styles.card_col2_row2}>
                  <Image
                    source={require('../asets/images/cards/star.png')}
                    style={styles.simg}
                  />
                  <Text style={styles.h3}>
                    {item.rating}
                    {extract(item.noOfvote)} &bull; {item.delivary_Time}min
                  </Text>
                </View>
                <Text numberOfLines={1}>{item.menu}</Text>
                <Text>
                  {item.area} &bull; {item.traveld}
                </Text>
                <LinearGradient
                  colors={['#760f9a', '#FFFFFF']}
                  start={{x: 0, y: 1}}
                  style={styles.lastrow}>
                  <Image
                    source={require('../asets/images/cards/food-delivery.png')}
                    style={styles.simg4}
                  />
                  <Text style={styles.textde}>Free Delivery</Text>
                </LinearGradient>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default Cards;
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  cards: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#123',
  },
  h3: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#123',
  },
  simg: {
    width: 20,
    height: 20,
  },
  simg1: {
    width: 15,
    height: 15,
    tintColor: 'gray',
  },
  more: {
    width: '100%',
    alignItems: 'flex-end',
  },
  card_col2: {
    flex: 1,
  },
  card_img: {
    width: 130,
    height: 150,
    borderRadius: 10,
  },
  card_col2_row2: {display: 'flex', flexDirection: 'row', gap: 5},
  omimgText1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffff',
    elevation: 5,
    paddingLeft: 10,
  },
  omimgText2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#ffff',
    paddingLeft: 10,
  },
  simg2: {
    width: 20,
    height: 20,
    position: 'relative',
    left: 95,
    top: 10,
    tintColor: '#ffff',
  },
  simg4: {
    width: 20,
    height: 20,
  },
  lastrow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 15,
    paddingLeft: 10,
    paddingVertical: 3,
    width: '70%',
  },
  textde: {color: '#8F07BF', fontSize: 12, fontWeight: 'bold'},
});
