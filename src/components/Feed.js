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
import InstaluraFetchService from "../services/InstaluraFetchService";
import Notificacao from '../api/Notificacao.android'
// const width = Dimensions.get("screen").width;

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fotos: []
    };
  }

  componentWillMount() {
    // let url = 'https://instalura-api.herokuapp.com/api/public/fotos/rafael'
    this.load()
  }
  load(){
    let uri = '/fotos'
    if(this.props.usuario)
      uri = `public/fotos/${this.props.usuario}`

    InstaluraFetchService.get("/fotos").then(json =>
      this.setState({
        fotos: json,status: 'Normal'
      })
    ).catch(e => this.setState({status:'Falha no carregamento'}));
  }
  buscaPorId(idFoto) {
    return this.state.fotos.find(foto => foto.id === idFoto);
  }
  atualizaFotos(fotoAtualizada) {
    const fotos = this.state.fotos.map(foto =>
      foto.id === fotoAtualizada.id ? fotoAtualizada : foto
    );
    this.setState({ fotos });
  }
  like(idFoto) {
    // const foto = this.state.fotos.find(foto => foto.id === idFoto);
    const listaOriginal = this.state.fotos
    const foto = this.buscaPorId(idFoto);
    AsyncStorage.getItem("usuario")
      .then(usuarioLogado => {
        let novaLista = [];

        if (!foto.likeada) {
          novaLista = [...foto.likers, { login: usuarioLogado }];
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login != usuarioLogado;
          });
        }
        return novaLista;
      })
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        };

        // const fotos = this.state.fotos.map(foto =>
        //   foto.id === fotoAtualizada.id ? fotoAtualizada : foto
        // );

        // this.setState({
        //   fotos
        // });
        this.atualizaFotos(fotoAtualizada);
      });
    // let url = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/like`;
    InstaluraFetchService.post(`/fotos/${idFoto}/like`).catch(e => {
      
      this.setState({
        fotos:listaOriginal
      })
      Notificacao.exibe('Ops..','Algo deu errado!')

    });
  }
  adicionaComentario(idFoto, valorComentario, inputComentario) {
    if (valorComentario === "") {
      return;
    }

    // const foto = this.state.fotos.find(foto => foto.id === idFoto);
    const foto = this.buscaPorId(idFoto);
    const comentario = {
      texto: valorComentario
    };

    // const uri = `https://instalura-api.herokuapp.com/api/fotos/${idFoto}/comment`;

    InstaluraFetchService.post(`fotos/${idFoto}/comment`, comentario)

      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista
        };
        this.atualizaFotos(fotoAtualizada);
        inputComentario.clear();
      })
      .catch(e => Notificacao.exibe("Ops..!","Não foi possível adicionar comentário"));

    // const novaLista = "";
    // [
    //   ...foto.comentarios,
    //   {
    //     id: valorComentario,
    //     login: "meuUsuario",
    //     texto: valorComentario
    //   }
    // ];

    // const fotos = this.state.fotos.map(foto =>
    //   foto.id === fotoAtualizada.id ? fotoAtualizada : foto
    // );

    // this.setState({
    //   fotos
    // });
  }
  verPerfilUsuario(idFoto){

    const foto = this.buscaPorId(idFoto);

    const navigate = this.props.navigation
    navigate.push('PerfilUsuario',{
      backButtonTitle: '',
      navigationOptions: {
         title: navigate.foto.loginUsuario,

      },
      passProps:{
        usuario: foto.loginUsuario
      }
    })
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
            verPerfilCallBack={this.verPerfilUsuario.bind(this)}
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
