import React from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';

export default () => {

  const pressHandler = () => {
    console.log('clicked !');
  }

  const styles = StyleSheet.create({
    main_container : {
      marginTop: 30,
      flex: 1
    },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    }

  })

  return (
    <View style={styles.main_container}>
      <TextInput
        placeholder='Titre du film'
        style={styles.textinput}
        />
      <Button
        title="Rechercher"
        onPress={() => pressHandler()}
        style={{ height: 50 }}
        />
    </View>
  )
}

