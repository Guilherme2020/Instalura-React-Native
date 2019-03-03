import {AlertIOS} from 'react-native'

export default class Notificacao {
    static exibe(titulo,mensagem){
        AlertIOS.alert(titulo,mensagem)
    }
}
