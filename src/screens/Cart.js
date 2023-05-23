import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import COLORS from '../consts/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const CartPage = ({navigation, route}) => {
  const [cartItems, setCartItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0.0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/cart`)
      .then(response => {
        console.log('Result: ', response.data);
        setCartItems(response.data);

        let priceTotal = 0.0;
        response.data.forEach(item => {
          priceTotal += item.price;
        });
        setTotalPrice(priceTotal);
      })
      .catch(error => {
        alert('Error: ', error);
        console.error(error);
      });
  }, []);

  const renderCartItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{uri: item.image}}
        style={{width: '40%', height: 80, resizeMode: 'contain', right: 20}}
      />
      <View style={{flex: 1}}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemPrice}>{`${item.price} ₺`}</Text>
      </View>
      {loading ? <ActivityIndicator size="large" /> : null}
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'flex-end',
          // alignItems: 'flex-end',
        }}>
        <Icon
          onPress={async () => {
            setLoading(true);
            try {
              const response = await axios.delete(
                `${BASE_URL}/cart/${item.id}`,
              );
              setLoading(false);
              Alert.alert(
                'Deleted',
                'Product successfully deleted!',
                response.data,
              );

              axios
                .get(`${BASE_URL}/cart`)
                .then(response => {
                  console.log('Result: ', response.data);
                  setCartItems(response.data);

                  let priceTotal = 0.0;
                  response.data.forEach(item => {
                    priceTotal += item.price;
                  });
                  setTotalPrice(priceTotal);
                })
                .catch(error => {
                  alert('Error: ', error);
                  console.error(error);
                });
            } catch (error) {
              Alert.alert('Error', 'Product failed deleted.', error);
            }
          }}
          name="delete"
          size={32}
          color={'red'}
          style={{
            justifyContent: 'space-around',
            alignItems: 'space-between',
            top: 25,
          }}
        />
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
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatlistContent}
      />

      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: 'silver',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          bottom: 30,
          // left: 25,
          alignItems: 'center',
          zIndex: 999,
          backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 20, fontStyle: 'italic', top: 15}}>
          Total amount:
        </Text>
        <Text
          style={{
            fontSize: 34,
            fontWeight: 'bold',
            bottom: 5,
            top: 10,
          }}>
          {totalPrice} ₺
        </Text>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={async () => {
          //   console.warn('title: ', cartItems[0].id);

          if (totalPrice > 0) {
            axios
              .post(
                `${BASE_URL}/orders`,
                {
                  // id: cartItems[0].id,
                  // title: cartItems[0].title,
                  // price: cartItems[0].price,
                  // description: cartItems[0].description,
                  // category: cartItems[0].category,
                  // image: cartItems[0].image,

                  cartItems: cartItems,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              )
              .then(response => {
                console.log('Result: ', response.data);

                Alert.alert('Info', 'Order created successfully!');

                navigation.navigate('Home');
              })
              .catch(error => {
                console.warn('Error: ', error);
                Alert.alert(
                  'Error',
                  'An error occurred while creating the order.',
                );
              });
          } else {
            Alert.alert(
              'Shopping cart empty',
              'Please add something to your cart',
            );
          }
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    right: 20,
  },
  itemPrice: {
    fontSize: 18,
    color: COLORS.green,
    alignSelf: 'flex-start',
    right: 20,
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

export default CartPage;
