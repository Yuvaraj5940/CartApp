import { View, Text ,SafeAreaView,StyleSheet,Dimensions,Image,Pressable,TextInput,ScrollView, FlatList} from 'react-native';
import React from 'react'
import { useSelector } from 'react-redux';

const Cards = () => {
    const data=[{name:'dmw'},{name:'kljhs'}]
    const i=useSelector(state=>state.Reducer)
    console.log(i.restodata)

  return (
    <>
    <ScrollView style={styles.container}>

        <FlatList
        data={i.restodata}
        renderItem={({item})=><View style={styles.cards}>
        <Image source={{uri:`${item.img}`}}
             style={styles.card_img}
        />
        <View style={styles.card_col2}>
            <Pressable style={styles.more}>
                <Image  source={require('../asets/images/cards/more.png')} style={styles.simg1}/>
            </Pressable>
            <Text numberOfLines={1} style={styles.h2}>{item.rname}</Text>
            <View style={styles.card_col2_row2}>
                <Image  source={require('../asets/images/cards/star.png')} style={styles.simg}/>
                <Text style={styles.h3}>{item.rating}  {item.delivary_Time}min</Text>
            </View>
            <Text numberOfLines={1}>{item.menu}</Text>
            <Text>{item.area}. {item.traveld}</Text>
        </View>

    
     </View>}
        />
        {/* <View style={styles.cards}>
            <Image source={{uri:'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/mj1txffjfnjtjmx7ddki'}}
                 style={styles.card_img}
            />
            <View style={styles.card_col2}>
                <Pressable style={styles.more}>
                    <Image  source={require('../asets/images/cards/more.png')} style={styles.simg1}/>
                </Pressable>
                <Text style={styles.h2}>dominos</Text>
                <View>
                <Image  source={require('../asets/images/cards/star.png')} style={styles.simg}/>
                    <Text style={styles.h3}>hgdfghhcj</Text>
                </View>
                <Text numberOfLines={1}>hjgfjekgfmhvgkefwg kjhfgeru sbdvchjgs kjghdiuc</Text>
                <Text>mbfvskfhbkvshdgvids</Text>
            </View>

        
         </View> */}
    </ScrollView>
    </>
  )
}

export default Cards;
const styles=StyleSheet.create({
    container:{
        width: Dimensions.get('screen').width,
        paddingHorizontal:20,
    },
    cards:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        gap:10,
        justifyContent:'center',
        alignContent:'center',
        margin:10
    },
    h2:{
        fontSize:20,
        fontWeight:'bold'
    },
    h3:{
        fontSize:17,
        fontWeight:'bold'
    },
    simg:{
        width:20,
        height:20,
    },
    simg1:{
        width:20,
        height:20,
        tintColor:'#123',
    },
    more:{
        width:'100%',
        alignItems:'flex-end',
    },
    card_col2:{
        flex:1,
    },
    card_img:{
        width:130,
        height:150,
        borderRadius:10
    },
    card_col2_row2:{display:'flex', flexDirection:'row',gap:5}

})