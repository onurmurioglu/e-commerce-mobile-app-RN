import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Cart = ({navigation, route}) => {
  //const product = route.params;

  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />

      <View>
        <FlatList />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
