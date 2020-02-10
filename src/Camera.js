import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions, Alert, StyleSheet, 
  TouchableHighlight, Modal, Button, ScrollView, Share } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Sharing from 'expo-sharing';


export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const[image, setImage] = useState();
  const[flashMode, toggleFlash] = useState(Camera.Constants.FlashMode.off);
  const[images, loadImages] = useState([]);
  const[mode, setMode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      const storageStatus  = await MediaLibrary.requestPermissionsAsync();
      if(storageStatus.status !== "granted") {
        Alert.alert("Camera Permissions");
      }
      setHasPermission(status === 'granted');
    })();
  }, []);

  let cameraRef = useRef(null);
   
  const takePicture = async() => {
    if(cameraRef) {
      let { uri, base64 } = await cameraRef.takePictureAsync({base64: true});
      const assset = await MediaLibrary.createAssetAsync(uri);
      console.log(assset);
      setImage(assset.uri);
      const data = `data:image/png;base64,${base64}>`;
      await MediaLibrary.createAlbumAsync("mojo", assset);
      loadImages([...images, assset.uri]);
      alert("Image Saved")
    }
  }

  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: [4,3]
    });
    if(!result.cancelled) {
      loadImages([...images, result.uri]);
      setModalVisible(true);
    }
  }

  const onShare = async () => {
    try {
      await Sharing.shareAsync(images[0]);
    } catch (error) {
      alert("Unable to share images");
    }
  };

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  return (
    <View style={{ flex: 1 }}>
      <View style={{marginTop: 32, padding: 10, 
        backgroundColor: 'rgba(52, 52, 52, 0.8)', flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <Ionicons size={32} color="white" name="ios-arrow-back"/>
        <Text style={{color: "white"}}>0:00</Text>
        <Ionicons size={32} color="white" name="ios-information-circle-outline"/>
      </View>
      <Camera 
      ref={ref => {
        cameraRef = ref;
      }}
      style={{ flex: 1 }} 
      type={type}
      flashMode={flashMode}
      >
      <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <View
            style={{
              alignSelf: 'flex-end',
              backgroundColor: 'rgba(52, 52, 52, 0.4)',
              width: Dimensions.get("window").width,
              borderBottomEndRadius: 40,
              padding: 20,
              borderBottomStartRadius: 40
            }}
            >
              <View style={{flexDirection: "row"}}>
                {images && images.map((img, index) => {
  
                  return <TouchableOpacity onPress={() => setModalVisible(true)}><Image key={index} source={{uri: img}} style={{width: 60, height: 50, padding: 7, marginBottom: 10, marginRight: 5}}/></TouchableOpacity>
                }
                )}
              <TouchableOpacity onPress={pickImage}>
              <View style={{width: 60,  height: 50, padding: 7, backgroundColor: "white", 
                  alignItems: "center"}}>
                    <Ionicons name="md-add" 
                      size={42} color="black" />
                </View>
              </TouchableOpacity>
              </View>
      
              <View>
                <View style={{flexDirection: "row", 
                justifyContent: "space-between",
                alignItems: "center"
                }}>
                <Ionicons color="white" size={32} name="md-volume-mute"/>
                <View>
                <TouchableOpacity onPress={() => {
                  if(flashMode === Camera.Constants.FlashMode.off) {
                    toggleFlash(Camera.Constants.FlashMode.on);
                    return;
                  }
                  toggleFlash(Camera.Constants.FlashMode.off);
                }}>
                {
                  flashMode === Camera.Constants.FlashMode.off ?
                    <Ionicons color="white" size={32} name="ios-flash-off"/> :
                    <Ionicons color="white" size={32} name="ios-flash"/>
                } 
                </TouchableOpacity>

                </View>
                
                
                <View style={{
                  backgroundColor: "white",
                  width: 70,
                  borderRadius:400,
                  padding: 10,
                  marginRight: 50
                }}>
                <TouchableOpacity 
                style={{
                  height:50,
                  width: 50,
                  borderRadius:400,
                  backgroundColor:'red',
                  borderColor: "black",
                }}
                onPress={() =>takePicture()}
                >
               
                </TouchableOpacity>
                </View>
                <TouchableOpacity 
                 onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
                >
                <Image
                  source={require("./img/baseline_flip_camera_ios_white_18dp.png")}
                  fadeDuration={0}
                  style={{width: 30, height: 20,  marginRight: 5}}
                />                
                </TouchableOpacity>
              
                </View>

              </View>

              <View style={{ marginTop: 22 }}>
              
            <Modal
              animationType="slide"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
                <LinearGradient colors={['#833ab4', '#fd1d1d', '#fcb045']} style={{height: 800}}>
              <View style={{ marginTop: 22, padding: 20 }}>
              
                <ScrollView>
                {images && images.map((img, index) => {
                  return  <TouchableOpacity onPress={() => {
                    Alert.alert(
                      'Remove Image',
                      '',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => {
                          const newImages = images.filter((img, i) => i !== index);
                          loadImages(newImages);
                          if(newImages.length === 0) {
                            setModalVisible(false);
                          }
                        }},
                      ],
                      {cancelable: false},
                    )
                  }} >
                    <Image key={index} source={{uri: img}} style={{width: 300, height: 200,
                     padding: 7, marginBottom: 10, marginRight: 5}}
                  /></TouchableOpacity>
                }
                )}
                <View style={{flexDirection: "row", justifyContent: "space-between", color: "red"}}>
                <Button onPress={() => onShare()} title="Share"/>
                <Button color="black" onPress={() => {
                      setModalVisible(!modalVisible);
                    }} title="Cancel"/>
                </View>
               
                </ScrollView>
                
                
              </View>
            </LinearGradient>
            </Modal>
          </View>
          </View>
        </View>
      </Camera>
    </View>
  );
}


const styles = StyleSheet.create({ 
  button: {
    
  }
})