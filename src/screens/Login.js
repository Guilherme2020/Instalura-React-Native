import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage
} from "react-native";
const width = Dimensions.get("screen").width;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: "",
      senha: "",
      mensagem: ""
    };
  }
  efetuaLogin() {
    let uri = "http://instalura-api.herokuapp.com/api/public/login";
    let requestInfo = {
      method: "POST",
      body: JSON.stringify({
        login: this.state.usuario,
        senha: this.state.senha
      }),
      headers: new Headers({
        "Content-type": "application/json"
      })
    };
    fetch(uri, requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error("Não foi possivel efetuar login");
      })
      .then(token => {
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("usuario", this.state.usuario);
        //    console.warn(token)
        // return AsyncStorage.getItem(token);
        // this.props.navigator.push({
        //     screen: 'Feed',
        //     title: 'Instalura'
        // })
        const navigate = this.props.navigation
        navigate.navigate('Feed')
    })
      .catch(err => {
        this.setState({ mensagem: err.message });
      });
    //   .then(token => console.warn(token));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Instalura</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize={"none"}
            placeholder="Usuário..."
            onChangeText={texto => this.setState({ usuario: texto })}
          />
          <TextInput
            style={styles.input}
            autoCapitalize={"none"}
            placeholder="Senha..."
            secureTextEntry
            onChangeText={texto => this.setState({ senha: texto })}
          />
          <Button title={"Login"} onPress={this.efetuaLogin.bind(this)} />
        </View>
        <Text style={styles.message}>
            {this.state.mensagem}

        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 26
  },
  form: {
    width: width * 0.8
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },
  message:{
      marginTop: 15,
      color:'#e74c3c'
  }
});
