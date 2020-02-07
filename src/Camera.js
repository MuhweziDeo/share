import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function Cam() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
      <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              backgroundColor: 'rgba(52, 52, 52, 0.4)',
              width: Dimensions.get("window").width,
              borderBottomEndRadius: 40,
              padding: 20,
              borderBottomStartRadius: 40
            }}
            >
              <TouchableOpacity>
              <View style={{width: 100, padding: 7, backgroundColor: "white", 
                  alignItems: "center"}}>
                    <Ionicons name="md-add" 
                      size={42} color="black" />
                </View>
              </TouchableOpacity>
               
              <View>
                <View style={{flexDirection: "row", 
                justifyContent: "space-between",
                alignItems: "center"
                }}>
                <Ionicons color="white" size={32} name="md-volume-mute"/>
                <Ionicons color="white" size={32} name="ios-flash-off"/>
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
                >
               
                </TouchableOpacity>
                </View>
               <Image
                  source={require("./img/baseline_flip_camera_ios_white_18dp.png")}
                  fadeDuration={0}
                  style={{width: 30, height: 20,  marginRight: 5}}
                />
                </View>
                {/* <View style={{width: 100}}>
                  <Button
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                  title={type === Camera.Constants.Type.back ? "Front" : "Back"}/>
                </View> */}

                {/* <View style={{width: 100}}>
                  <Button
                  title="Gallery"/>
                </View> */}

              </View>
            
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}