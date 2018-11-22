import React, { Component } from 'react'
import { View, Image, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'

const width = Dimensions.get('screen').width;



export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foto: this.props.foto,
            valorComentario: ''
        }
    }

    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png')
    }
    like() {

        const { foto } = this.state;

        let novaLista = []

        if (!foto.likeada) {
            novaLista = [
                ...foto.likers,
                { login: 'meuUsuario' }
            ]

        } else {
            novaLista = foto.likers.filter(liker => {
                return liker.login != 'meuUsuario'
            })
        }



        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: novaLista
        }
        this.setState({
            foto: fotoAtualizada
        });

    }
    exibeLikers(likers) {
        if (likers.length <= 0) {
            return;
        }
        return (
            <Text
                style={styles.likes}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )


    }
    exibeLegenda(foto) {
        if (foto.comentario === '')
            return;

        return (
            <View style={styles.comentario}>
                <Text
                    style={styles.tituloComentario}
                >
                    {foto.loginUsuario}
                </Text>
                <Text>
                    {foto.comentario}
                </Text>

            </View>
        )
    }
    adicionaComentario() {

        if(this.state.valorComentario === ''){
            return;
        }

        const novaLista = [...this.state.foto.comentarios, {
            id: this.state.valorComentario,
            login: 'meuUsuario',
            texto: this.state.valorComentario
        }];

        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: novaLista
        }

        this.setState({
            foto: fotoAtualizada,
            valorComentario: ''
        })
        this.inputComentario.clear()
    }
    render() {
        const { foto } = this.state


        return (
            <View>
                <View style={styles.cabecalho}>
                    <Image source={{ uri: foto.urlPerfil }}
                        style={styles.fotoPerfil}
                    />
                    <Text
                        style={
                            styles.user
                        }
                    >{foto.loginUsuario}</Text>
                </View>
                <Image source={{ uri: foto.urlFoto }}
                    style={styles.foto}
                />
                <View
                    style={
                        styles.rodape
                    }
                >
                    <TouchableOpacity
                        onPress={this.like.bind(this)}
                    >
                        <Image
                            style={
                                styles.botaoDeLike
                            }
                            source={
                                this.carregaIcone(foto.likeada)
                            }
                        />
                    </TouchableOpacity>

                    {this.exibeLikers(foto.likers)}

                    {this.exibeLegenda(foto)}

                    {foto.comentarios.map(comentario =>
                        <View style={styles.comentario} key={comentario.id}>
                            <Text style={styles.tituloComentario} >{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}

                    <View style={styles.novoComentario}>
                        <TextInput
                            style={styles.input}
                            placeholder="Adicione um comentario..."
                            ref={input => this.inputComentario = input}
                            onChangeText={texto => this.setState({
                                valorComentario: texto
                            })}
                        />


                        <TouchableOpacity
                            onPress={this.adicionaComentario.bind(this)}
                        >
                            <Image
                                style={styles.icone}
                                source={require('../../resources/img/send.png')}
                            />
                        </TouchableOpacity>

                    </View>

                </View>

            </View>
        )
    }

}


const styles = StyleSheet.create({
    cabecalho: {
        margin: 10, flexDirection: 'row', alignItems: 'center'
    },

    user: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Roboto'
    },
    fotoPerfil: {
        marginRight: 10, borderRadius: 20, width: 40, height: 40
    },
    foto: {
        width: width, height: width
    },
    botaoDeLike: {
        height: 40,
        width: 40, marginBottom: 10,
    },
    rodape: {
        margin: 10
    },
    likes: {
        fontSize: 16,
        fontWeight: '900'
    },
    comentario: {
        flexDirection: 'row'
    },
    tituloComentario: {
        fontWeight: 'bold', marginRight: 5,
    },
    novoComentario: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    input: {
        height: 40,
        flex: 1,

    },
    icone: {
        width: 30, height: 30
    }


})
