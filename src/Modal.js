import React, { Component, useState } from 'react';
import { Modal, Text, TouchableHighlight, View, Button } from 'react-native';

export const ImageModal = ({visible, setModalVisible}) => {
  return (
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}>
        <View style={{ marginTop: 22 }}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text>Close</Text>
            </TouchableHighlight>
            <Button title="Share"/>>
          </View>
        </View>
      </Modal>
    </View>
  );
}