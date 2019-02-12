/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase('test.db', '1.0', '', 1);


export default class App extends Component {

  sqlfunction = () => {
   db.transaction(function (txn) {
  txn.executeSql('DROP TABLE IF EXISTS Users', []);
  txn.executeSql('CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))', []);
  txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['nora']);
  txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['takuya']);
  txn.executeSql('SELECT * FROM `users`', [], function (tx, res) {
    for (let i = 0; i < res.rows.length; ++i) {
      let name= res.rows.item(i).name;
      console.log('item:'+i, name);
      alert(name)
    }
  });
});
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to SQLite!</Text>
        <TouchableOpacity onPress={this.sqlfunction}><Text>Click Here..</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
