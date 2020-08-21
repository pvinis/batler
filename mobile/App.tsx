import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Alarms} from './src/Alarms'
import { FBStuff } from './src/FBStuff';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
	  <FBStuff />
	  {/* <Alarms /> */}
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
