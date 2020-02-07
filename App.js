import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './src/Camera';

console.disableYellowBox = true;
export default function App() {
  return (
    // <View style={styles.container}>
      // <Text>Camera</Text>
      <Camera/>
    // </View>
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
