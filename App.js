/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';

import HomePage from './Components/HomePage';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView>
        <HomePage />
      </SafeAreaView>
    );
  }
}
