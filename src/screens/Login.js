import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios, {Axios} from 'axios';
import BASE_URL from '../Config';

const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.viewForImage}>
        <Image style={styles.image} source={require('../assets/shop.jpg')} />
      </View>
      <View style={styles.designView}>
        <View style={styles.contentView}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            onChangeText={user => {
              setUserName(user);
            }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={pwd => {
              setPassword(pwd);
            }}
          />

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => {
              console.warn(BASE_URL);
              console.warn('User name: ', userName);
              console.warn('Password: ', password);

              axios
                .get(
                  `${BASE_URL}/users?username=${userName}&password=${password}`,

                  {
                    Headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                )
                .then(response => {
                  console.log('Result: ', response.data);

                  if (response?.data?.length > 0) {
                    navigation.navigate('Home');
                  } else {
                    Alert.alert(
                      'Bilgi',
                      'Girilen bilgilere ait kullanıcı bulunamadı.',
                    );
                  }
                })
                .catch(error => {
                  console.warn('Error: ', error);
                  Alert.alert('Hata', 'Giriş yapılamadı');
                });
            }}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <Text style={{top: 70, fontSize: 16}}>
              Don 't have an account?{'  '}
            </Text>

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => {
                navigation.navigate('SignUp');
                console.log('ba');
              }}>
              <Text style={styles.signUpButtonText}>Sign up</Text>
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
    // height: '14%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    fontSize: 16,
    elevation: 15,
  },

  signInButton: {
    backgroundColor: '#51AD99',
    width: '90%',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
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

  signUpButton: {
    color: '#2BB89F',
    fontWeight: 'bold',
    top: 61,
    fontSize: 18,
    shadowColor: 'white',
    shadowOpacity: 0.4,
    shadowRadius: 0.2,
    elevation: 10,
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  signUpButtonText: {
    color: '#2BB89F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
