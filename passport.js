const passport = require('passport'); 
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

const dotenv = require('dotenv');
dotenv.config();

const nameDatabase = process.env.DATABASE;
const nameCollection = process.env.COLLECTION;
const uri = `mongodb://localhost:${process.env.URL}`
const client = new MongoClient(uri);

const users = [];

passport.use('registracion', new LocalStrategy((username, password, callback) => {
  async function saveUser() {
    const user = await client.db(nameDatabase).collection(nameCollection).findOne({ username: username });
    if (user) return callback(new Error('Ya existe un usuario con ese nombre'));
    const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const usuarioCreado = { username, password: passwordHasheado };

    await client.db(nameDatabase).collection(nameCollection).insertOne(usuarioCreado);
    callback(null, usuarioCreado);
  }
  saveUser();
}));

passport.use('autenticacion', new LocalStrategy((username, password, callback) => {
  async function findUser() {
    const user = await client.db(nameDatabase).collection(nameCollection).findOne({ username: username });
    if (!user || !bcrypt.compareSync(password, user.password)) return callback(new Error('Usuario no existente o password incorrecto'));
    callback(null, user);

  }
  findUser();
  
}));

passport.serializeUser((usuario, callback) => {
  callback(null, usuario.username);
});

passport.deserializeUser((username, callback) => {
  async function findUser() {
    const user = await client.db(nameDatabase).collection(nameCollection).findOne({ user: username });
    callback(null, user);
  }
  findUser();
});

module.exports = passport;