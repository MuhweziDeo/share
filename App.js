import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './src/Camera';

console.disableYellowBox = true;
export default function App() {
  return (

      <Camera/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
  },
});
