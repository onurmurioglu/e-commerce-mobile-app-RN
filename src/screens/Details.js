import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import COLORS from '../consts/Colors';

const Details = ({navigation, route}) => {
  const product = route.params;

  const [counter, setCounter] = useState(1);

  function IncreaseCounter() {
    setCounter(counter + 1);
    console.warn(counter);
  }

  function DecreaseCounter() {
    setCounter(counter - 1);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={style.header}>
        <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />

        <Icon
          name="shopping-cart"
          size={28}
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
      <View style={style.imageContainer}>
        <Image
          source={{uri: product.image}}
          style={{
            resizeMode: 'contain',
            flex: 1,
            width: '90%',
            height: '30%',
          }}
        />
      </View>
      <View style={style.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          {/* <View style={style.line} /> */}
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, fontWeight: '600', width: '73%'}}>
            {product.title}
          </Text>
          <View style={style.priceTag}>
            <Text
              style={{
                marginLeft: 5,
                color: COLORS.white,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              {product.price}₺
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>About</Text>
          <ScrollView>
            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}>
              {product.description}
            </Text>
          </ScrollView>

          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={style.borderBtn}
                onPress={() => {
                  if (counter > 1) {
                    DecreaseCounter();
                  }
                }}>
                <Text style={style.borderBtnText}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: 'bold',
                }}>
                {counter}
              </Text>
              <TouchableOpacity
                style={style.borderBtn}
                onPress={() => {
                  IncreaseCounter();
                }}>
                <Text style={style.borderBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={style.buyBtn}>
              <Text
                style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
                Add to Cart
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  borderBtnText: {fontWeight: 'bold', fontSize: 28},
  buyBtn: {
    width: 130,
    height: 50,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default Details;
