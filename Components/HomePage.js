import React, {Component} from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Platform, PermissionsAndroid, Image} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";

type Props = {};
export default class App extends Component<Props> {

  state = {
    data: ''
  }

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permissions',
          message: 'Permission to access your photos to display',
        },
      );
      if (result !== 'granted') {
        Alert.alert('Access to pictures was denied');
        return;
      }
    }
    CameraRoll.getPhotos({
      first: 50,
      assetType: 'Photos',
    })
    .then(res => {
      this.setState({ data: res.edges });
    })
    .catch((error) => {
       console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.mainPage}>
        <View style={styles.navBar}>
          <Text style={styles.heading}>Gallery</Text>
        </View>
        <View style={styles.images}>
          <FlatList 
            data={this.state.data}
            numColumns={3}
            renderItem={({ item }) => <Image
              style={{
              width: '33%',
              height: 150,
            }}
            source={{ uri: item.node.image.uri }}
          />}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainPage: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%'
  },
  navBar: {
    backgroundColor: '#ff69b4',
    flex: 0.07,
    height: 100,
    width: '100%',
    alignItems: "center"
  },
  heading :{
    fontSize: 26
  },
  images: {
    flex: 0.93
  }
});
