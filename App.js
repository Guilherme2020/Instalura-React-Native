/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, Dimensions,
  Image,
  ScrollView,
  FlatList,
  View
} from 'react-native';
import Post from './src/components/Post'

const width = Dimensions.get('screen').width;


export default class InstaluraMobile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fotos: []
    }
  }

  componentDidMount() {
    let url = 'https://instalura-api.herokuapp.com/api/public/fotos/rafael'

    fetch(url)
      .then(resposta => resposta.json())
      .then(json =>
        this.setState({
          fotos: json
        }))
      .catch(err => {
        console.log(err)
      })

  }

  render() {

    return (
      <FlatList style={styles.container}
        data={this.state.fotos}
        keyExtractor={item => String(item.id)}
        renderItem={
          ({ item }) =>
            <Post
              foto={item}
            />
        }
      />



    );
  }
}
const margem = Platform.OS == 'ios' ? 20 : 0
const styles = StyleSheet.create({
  container: {
    marginTop: margem
  },


})

