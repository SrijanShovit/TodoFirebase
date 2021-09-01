import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import config from './Config'

firebase.initializeApp(config)

const auth = firebase.auth()
const db = firebase.firestore()

export {db, auth}