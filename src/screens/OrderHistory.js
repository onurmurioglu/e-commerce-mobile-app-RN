import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import COLORS from '../consts/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const OrderHistory = ({navigation, route}) => {
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/orders`)
      .then(response => {
        console.warn('Result: ', response.data);

        setCartItems(response.data.map(order => order.cartItems));
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }, []);

  const renderCartItem = ({item}) => {
    return (
      <FlatList
        data={item}
        renderItem={({item: cartItem}) => (
          <View>
            <View style={styles.card}>
              <Image
                source={{uri: cartItem.image}}
                style={{width: '40%', height: 80, resizeMode: 'contain'}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.itemName}>{cartItem.title}</Text>
                <Text style={styles.itemPrice}>{`${cartItem.price} ₺`}</Text>
              </View>
            </View>
            {/* <View
              style={{width: '100%', height: 2, backgroundColor: 'black'}}
            /> */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Icon name="arrow-back" size={28} onPress={() => navigation.goBack()} />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 22,
          fontWeight: '600',
          marginBottom: 30,
        }}>
        Order History
      </Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatlistContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatlistContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 18,
    color: COLORS.green,
  },
  checkoutButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 16,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OrderHistory;
