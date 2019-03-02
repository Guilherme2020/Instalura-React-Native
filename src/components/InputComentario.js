import React, { Component } from 'react'
import { View, Image, TextInput, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'

const width = Dimensions.get('screen').width;


export default class InputComentario extends Component {

    constructor(props) {

        super(props)
        this.state = {

            valorComentario: ''

        }
    }

    render() {
        return (

            <View style={styles.novoComentario}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicione um comentario..."
                    ref={input => this.inputComentario = input}
                    onChangeText={texto => this.setState({
                        valorComentario: texto
                    })}
                    underlineColorAndroid='transparent'
                />


                <TouchableOpacity
                    // onPress={this.adicionaComentario.bind(this)}
                    onPress={
                        () => {
                            this.props.comentarioCallback(this.props.idFoto, 
                            this.state.valorComentario, this.inputComentario);
                            this.setState({ valorComentario: '' })

                        }
                    }
                >
                    <Image
                        style={styles.icone}
                        source={require('../../resources/img/send.png')}
                    />
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
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
