import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';

const SignUp = ({navigation}) => {
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
        <TextInput style={styles.textInput} placeholder="Name" />
        <TextInput style={styles.textInput} placeholder="Surname" />
        <TextInput style={styles.textInput} placeholder="E-mail" />
        <TextInput style={styles.textInput} placeholder="Username" />
        <TextInput style={styles.textInput} placeholder="Password" />
        <TextInput style={styles.textInput} placeholder="Retry password" />

        <TouchableOpacity style={styles.signInButton}>
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
