import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainView}>
      <Image
        style={styles.backgroundImage}
        source={require('../assets/commerce.png')}
        resizeMode="stretch"
      />

      <Text style={styles.contentText}>Let 's go shopping!</Text>

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Icon name="arrow-forward" size={42} color="#26B7B7" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#26B7B7',
  },
  backgroundImage: {
    width: '100%',
    height: '60%',
  },

  nextButton: {
    width: '20%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
  },

  buttonView: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    top: 30,
    fontStyle: 'italic',
  },
});
