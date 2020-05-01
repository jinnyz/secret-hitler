import { hot } from 'react-hot-loader';
import React from 'react';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.App}>
    <h1>hello world</h1>
  </div>
);

export default hot(module)(App);
