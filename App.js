import React,  {useState } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts' 



export default function App() {
 const [contact, setContact] = useState({})

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        {fields: [Contacts.Fields.PhoneNumbers]}
      )
      if ( data.length > 0)  {
        setContact(data)
      }
    }
  }
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({item})=>
          <View>
            <Text>{item.firstName} {item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number}</Text>
          </View>}
          data={contact}
          ItemSeparatorComponent={listSeparator}
         />
      <Button title="Get Contact"onPress={getContacts} />
    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
