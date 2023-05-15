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

  useEffect(() => {
    axios
      .get(`${BASE_URL}/orders`)
      .then(response => {
        console.log('Result: ', response.data);

        setOrders(response.data);
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }, []);

  const renderCartItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{uri: item.image}}
        style={{width: '40%', height: 80, resizeMode: 'contain'}}
      />
      <View style={{flex: 1}}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>{`${item.price} ₺`}</Text>
      </View>
    </View>
  );

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
        Shopping Cart
      </Text>
      <FlatList
        data={orders}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatlistContent}
      />
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => {
          console.log(orders);
        }}>
        <Text style={styles.checkoutButtonText}>Place an Order</Text>
      </TouchableOpacity>
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
