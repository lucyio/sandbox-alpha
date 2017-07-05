import 'babel-polyfill'
import feathers from 'feathers'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio'
import auth from 'feathers-authentication-client'
import io from 'socket.io-client'
import feathersVuex from 'feathers-vuex'
import store from '@/store'
import rx from 'feathers-reactive'
import RxJS from 'rxjs'

const socket = io(':3030', {transports: ['websocket']})

const client = feathers()
.configure(hooks())
.configure(socketio(socket))
.configure(auth({ storage: window.localStorage }))
.configure(rx(RxJS, {idField: 'id'}))
.configure(feathersVuex(store, {idField: '_id', auth: {userService: '/users'}}))

// load the services
client.service('accounts')
client.service('contacts')
client.service('messages')
client.service('threads')
client.service('users')
client.service('profiles')

export default client
