// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import React, { Component } from "react";
import {AsyncStorage} from 'react-native'
// import {
//   Platform,
//   StyleSheet,
//   Text, Dimensions,
//   Image,
//   ScrollView,
//   FlatList,
//   View
// } from 'react-native';
// // import Post from './src/components/Post'
// import Feed from './components/Feed'
// import Login from './src/screens/Login'

// const margem = Platform.OS == 'ios' ? 20 : 0
// const styles = StyleSheet.create({
//   container: {
//     marginTop: margem
//   },

// })

import Feed from "./src/components/Feed";
import Login from "./src/screens/Login";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
// AppRegistry.registerComponent('Instalura', () => InstaluraMobile);/
// AppRegistry.registerComponent('Instalura', () => Login);


  // AsyncStorage.getItem('token')
  //   .then(token => {
  //     if(token){
  //       return {
  //         screen: 'Feed',
  //         navigationOptions: {
  //           // header: null
  //           title: 'Instalura'
  //         }
  //       }
  //     }
  //     return
  //   })

const Navigation = createAppContainer(
  createStackNavigator(
    {
      Login: {
        screen: Login,

        navigationOptions: {
          header: null
        }
      },
      Feed: {
        screen: Feed,
        navigationOptions: {
          // header: null
          title: 'Instalura'
        }
      }
    },
    {
      navigationOptions: {
        header: null
      }
    }
  )
);

// export default Navigation;

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Navigation />;
  }
}
