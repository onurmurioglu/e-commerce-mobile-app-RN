import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const Login = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.viewForImage}>
        <Image style={styles.image} source={require('../assets/shop.jpg')} />
      </View>
      <View style={styles.designView}>
        <View style={styles.contentView}>
          <TextInput style={styles.textInput} placeholder="Username" />
          <TextInput style={styles.textInput} placeholder="Password" />

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Text style={{top: 70, fontSize: 16}}>
              Don 't have an account?{'  '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text
                style={{
                  color: '#2BB89F',
                  fontWeight: 'bold',
                  top: 69,
                  fontSize: 18,
                  shadowColor: 'white',
                  shadowOpacity: 0.4,
                  shadowRadius: 0.2,
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    //  justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    justifyContent: 'flex-start',
  },

  contentView: {
    width: '90%',
    height: '40%',
    borderRadius: 20,
    //backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowRadius: 7,
    justifyContent: 'center',

    top: -60,
    position: 'absolute',
  },
  designView: {
    //!
    //flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#51AD99',

    borderBottomEndRadius: 380,

    // borderBottom,
  },

  textInput: {
    width: '90%',
    height: '14%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    fontSize: 16,
  },

  signInButton: {
    backgroundColor: '#51AD99',
    width: '90%',
    height: '14%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signInButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },

  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },

  viewForImage: {
    justifyContent: 'flex-end',
    width: '100%',
    height: '60%',
    alignSelf: 'center',
    bottom: 50,
  },
});
