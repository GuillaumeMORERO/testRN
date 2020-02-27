import React from 'react';
import { TextInput, Button, View } from 'react-native';

export default () => {

  const pressHandler = () => {
    console.log('clicked !');
  }

  return (
    <View>
      <TextInput placeholder='Titre du film'/>
      <Button title="Rechercher" onPress={() => pressHandler()}/>
    </View>
  )
}

