/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  View,
  AsyncStorage
} from "react-native";
import Post from "./Post";

const width = Dimensions.get("screen").width;

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotos: []
    };
  }

  componentWillMount() {
    // let url = 'https://instalura-api.herokuapp.com/api/public/fotos/rafael'
    let uri = "https://instalura-api.herokuapp.com/api/fotos";
    AsyncStorage.getItem("token")
      .then(token => {
        return {
          headers: new Headers({
            "X-AUTH-TOKEN": token
          })
        };
      })
      .then(requestInfo =>
        fetch(uri, requestInfo)
          .then(resposta => resposta.json())
          .then(json =>
            this.setState({
              fotos: json
            })
          )
          .catch(err => {
            alert(err);
          })
      );
  }
  like(idFoto) {
    const foto = this.state.fotos.find(foto => foto.id === idFoto);

    let novaLista = [];

    if (!foto.likeada) {
      novaLista = [...foto.likers, { login: "meuUsuario" }];
    } else {
      novaLista = foto.likers.filter(liker => {
        return liker.login != "meuUsuario";
      });
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    };

    const fotos = this.state.fotos.map(foto =>
      foto.id === fotoAtualizada.id ? fotoAtualizada : foto
    );

    this.setState({
      fotos
    });
  }
  adicionaComentario(idFoto, valorComentario, inputComentario) {
    if (valorComentario === "") {
      return;
    }

    const foto = this.state.fotos.find(foto => foto.id === idFoto);

    const novaLista = [
      ...foto.comentarios,
      {
        id: valorComentario,
        login: "meuUsuario",
        texto: valorComentario
      }
    ];

    const fotoAtualizada = {
      ...foto,
      comentarios: novaLista
    };

    const fotos = this.state.fotos.map(foto =>
      foto.id === fotoAtualizada.id ? fotoAtualizada : foto
    );

    this.setState({
      fotos
    });
    inputComentario.clear();
  }
  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.state.fotos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Post
            foto={item}
            likeCallback={this.like.bind(this)}
            comentarioCallback={this.adicionaComentario.bind(this)}
          />
        )}
      />
    );
  }
}
const margem = Platform.OS == "ios" ? 20 : 0;
const styles = StyleSheet.create({
  container: {
    // marginTop: margem
  }
});
