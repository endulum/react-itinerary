import { Component } from 'react';

import context from './components/Context';
import Lists from './components/Lists';

export default function App() {
  return (
    <context.Provider>
      <h1>Itinerary</h1>
      <Lists />
    </context.Provider>
  );
}
