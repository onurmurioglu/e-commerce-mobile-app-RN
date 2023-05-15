import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile = ({navigation}) => {
  return (
    <SafeAreaView>
      <Icon
        name="arrow-back"
        size={36}
        onPress={() => navigation.goBack()}
        style={{left: 20, top: 10}}
      />
    </SafeAreaView>
  );
};

export default Profile;
