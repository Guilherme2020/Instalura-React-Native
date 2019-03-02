import React, { Component } from 'react'
import { View, Image, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import InputComentario from './InputComentario';


export default class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    carregaIcone(likeada) {
        return likeada ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png')
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
    render() {
        const { foto, likeCallback } = this.props;
        return (

            <View>
                <TouchableOpacity
                    onPress={
                        () => {
                            likeCallback(foto.id)
                        }
                    }
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

            </View>


        )
    }
}
const styles = StyleSheet.create({
    botaoDeLike: {
        height: 40,
        width: 40, marginBottom: 10,
    },
    likes: {
        fontSize: 16,
        fontWeight: '900'
    },
})