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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import COLORS from '../../src/consts/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('screen').width / 2 - 30;

const photo =
  'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg';

const Home = ({navigation}) => {
  const categories = ["Men's Clothing", 'Jewelery', 'Electronics'];

  const [categoryIndex, setCategoryIndex] = useState(0);

  const CategoryLists = () => {
    return (
      <View style={styles.categoryView}>
        {categories.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}>
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

  const Card = product => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', product);
        }}>
        <View style={styles.card}>
          <View style={{alignItems: 'flex-end'}}>
            <View
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
            </View>
          </View>
          <View style={{height: 100, alignItems: 'center'}}>
            <Image
              style={{flex: 1, resizeMode: 'contain'}}
              source={{
                uri: photo,
              }}
            />
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 10}}>
            "product.name"
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>0.00 TL</Text>
            <View
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
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContent}>
      <View style={styles.header}>
        <View>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.dark}}>
            Welcome to
          </Text>
          <Text style={{fontSize: 38, fontWeight: 'bold', color: COLORS.green}}>
            E-commerce App
          </Text>
        </View>

        <Icon
          name="shopping-cart"
          size={36}
          style={{right: 10}}
          color={COLORS.dark}
        />
      </View>
      <View style={{marginTop: 30, flexDirection: 'row'}}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{marginLeft: 20}} />
          <TextInput placeholder=" Search" style={styles.searchInput} />
        </View>
        <View style={styles.sortButton}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
      </View>

      <CategoryLists />
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-around'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={'plants'}
        renderItem={item => <Card product={item} />}
      />
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
  },

  searchInput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    flex: 1,
  },

  sortButton: {
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
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});
