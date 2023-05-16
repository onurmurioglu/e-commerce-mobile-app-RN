import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import COLORS from '../../src/consts/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {createDrawerNavigator} from '@react-navigation/drawer';
import OrderHistory from './OrderHistory';
import Modal from 'react-native-modal';

const width = Dimensions.get('screen').width / 2 - 30;

const Home = ({navigation}) => {
  const categories = ['All', "Men's Clothing", 'Jewelery', 'Electronics'];

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [menuModal, setMenuModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/products`)
      .then(response => {
        console.log('Result: ', response.data);

        setProductList(response.data);
        setLoading(false);
      })
      .catch(error => {
        alert('Error: ', error);
        setLoading(false);
      });
  }, []);

  const CategoryLists = () => {
    return (
      <View style={styles.categoryView}>
        {categories.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setCategoryIndex(index);
              console.warn(item);

              {
                if (item == 'All') {
                  axios
                    .get(`${BASE_URL}/products`)
                    .then(response => {
                      console.log('Result: ', response.data);

                      setProductList(response.data);
                      setLoading(false);
                    })
                    .catch(error => {
                      alert('Error: ', error);
                      setLoading(false);
                    });
                } else {
                  axios
                    .get(`${BASE_URL}/products?category=${item}`)
                    .then(response => {
                      console.log('Result: ', response.data);

                      setProductList(response.data);
                      setLoading(false);
                    })
                    .catch(error => {
                      alert('Error: ', error);
                      setLoading(false);
                    });
                }
              }
            }}>
            <Text
              key={index}
              style={[
                styles.categoryText,
                categoryIndex == index && styles.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  };

  const Card = ({product}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', product);
        }}>
        <View style={styles.card}>
          <View style={{alignItems: 'flex-end'}}>
            {/* <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: product.like
                  ? 'rgba(245, 42, 42, 0.2)'
                  : 'rgba(0,0,0,0.2)',
              }}>
              <Icon
                name="favorite"
                size={18}
                color={product.like ? COLORS.red : COLORS.dark}
              />
            </View> */}
          </View>
          <View
            style={{
              height: 120,
              alignItems: 'center',
            }}>
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
                width: 120,
                height: 120,
              }}
              source={{
                uri: product.image,
              }}
            />
          </View>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: '600',
              fontSize: 14,
              marginTop: 10,
              marginBottom: 10,
            }}>
            {product.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {product.price} TL
            </Text>
            <TouchableOpacity
              onPress={() => {
                //navigation.setParams(product);
                // navigation.navigate('Cart', product);

                axios
                  .post(
                    `${BASE_URL}/cart`,
                    {
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      description: product.description,
                      category: product.category,
                      image: product.image,
                    },

                    {
                      Headers: {
                        'Content-Type': 'application/json',
                      },
                    },
                  )
                  .then(response => {
                    console.log('Result: ', response.data);

                    console.warn('Sepete eklendi');
                  })
                  .catch(error => {
                    console.warn('Error: ', error);
                  });
              }}
              style={{
                height: 25,
                width: 25,
                backgroundColor: COLORS.green,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS.white,
                  fontWeight: 'bold',
                  bottom: 2,
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContent}>
      <Modal
        style={{margin: 0}}
        visible={menuModal}
        animationType="slide"
        coverScreen={false}
        backdropColor="white"
        backdropOpacity={0.9}>
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.light}}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 24,
              top: 32,
              fontWeight: 'bold',
            }}>
            MENU
          </Text>
          <View style={{alignItems: 'flex-end', justifyContent: 'flex-start'}}>
            <TouchableOpacity
              onPress={() => {
                setMenuModal(false);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                right: 10,
              }}>
              <Icon
                name="close"
                size={36}
                style={{left: 10}}
                color={COLORS.dark}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'column', top: 20}}>
            <TouchableOpacity
              onPress={() => {
                setMenuModal(false);
                navigation.navigate('Profile');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                height: 60,
              }}>
              <Icon
                name="person"
                size={32}
                style={{left: 10}}
                color={COLORS.dark}
              />
              <Text style={{fontSize: 20, fontWeight: '500'}}>
                {'    '}Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuModal(false);
                navigation.navigate('OrderHistory');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                height: 60,
                top: 0,
              }}>
              <Icon
                name="shopping-basket"
                size={32}
                style={{left: 10}}
                color={COLORS.dark}
              />
              <Text style={{fontSize: 20, fontWeight: '500'}}>
                {'    '}Order History
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                bottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Icon
                name="logout"
                size={32}
                style={{left: 10}}
                color={COLORS.red}
              />
              <Text style={{color: 'red', fontSize: 22}}> {'   '}Log out</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      <View style={styles.header}>
        <View>
          <TouchableOpacity
            onPress={() => {
              setMenuModal(true);
            }}>
            <Icon
              name="menu"
              size={36}
              style={{left: 10}}
              color={COLORS.dark}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: COLORS.dark,
              top: 10,
            }}>
            Welcome to
          </Text>
          <Text
            style={{
              fontSize: 38,
              fontWeight: 'bold',
              color: COLORS.green,
              top: 10,
            }}>
            E-commerce App
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <Icon
            name="shopping-cart"
            size={36}
            style={{right: 10}}
            color={COLORS.dark}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 30, flexDirection: 'row', alignSelf: 'center'}}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{marginLeft: 20}} />
          <TextInput
            placeholder=" Search"
            style={styles.searchInput}
            onChangeText={inputTxt => {
              setSearchTxt(inputTxt);

              if (searchTxt === '') {
                axios
                  .get(`${BASE_URL}/products`)
                  .then(response => {
                    console.log('Result: ', response.data);

                    setProductList(response.data);
                    setLoading(false);
                  })
                  .catch(error => {
                    alert('Error: ', error);
                    setLoading(false);
                  });
              }
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            console.warn(searchTxt);
            axios
              .get(`${BASE_URL}/products?title=${searchTxt}`)
              .then(response => {
                console.log('Result: ', response.data);

                setProductList(response.data);
                setLoading(false);
              })
              .catch(error => {
                alert('Error: ', error);
                setLoading(false);
              });
          }}>
          <Icon name="search" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <CategoryLists />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-around'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={productList}
          renderItem={({item}) => <Card product={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },

  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // alignSelf: 'center',
  },

  searchInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    flex: 1,
    //alignSelf: 'center',
  },

  searchButton: {
    marginLeft: 10,
    height: 50,
    width: 50,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  categoryView: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },

  categoryText: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },

  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },

  card: {
    flex: 1,
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,

    shadowColor: 'gray',
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
