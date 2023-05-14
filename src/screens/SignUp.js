import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

const SignUp = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');

  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.titleView}>
        <View style={styles.backButtonView}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text>Back</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentView}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={Name => {
            setName(Name);
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Surname"
          onChangeText={Surname => {
            setSurname(Surname);
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="E-mail"
          onChangeText={mail => {
            setEmail(mail);
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={Username => {
            setUserName(Username);
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={Password => {
            setPassword(Password);
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Retry password"
          onChangeText={passwordTwo => {
            setPasswordTwo(passwordTwo);
          }}
        />

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => {
            axios
              .post(
                `${BASE_URL}/users`,
                {
                  username: userName,
                  password: password,
                  name: name,
                  surname: surname,
                  email: email,
                  //! password 2 yi kontrol et
                },

                {
                  Headers: {
                    'Content-Type': 'application/json',
                  },
                },
              )
              .then(response => {
                console.log('Result: ', response.data);

                alert('Kayıt başarıyla oluşturuldu!');
              })
              .catch(error => {
                console.warn('Error: ', error);
              });
          }}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },

  titleView: {
    with: '100%',
    height: '20%',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    backgroundColor: 'yellow',
    flexDirection: 'row',
  },

  contentView: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  textInput: {
    width: '90%',
    height: '9%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',

    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowRadius: 7,
    fontSize: 16,
  },

  signInButton: {
    backgroundColor: '#51AD99',
    width: '90%',
    height: '9%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowRadius: 7,
  },

  signInButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },

  backButton: {
    width: '50%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
  },

  backButtonView: {
    width: '30%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    left: 5,
  },

  title: {
    alignSelf: 'flex-end',
  },
});
