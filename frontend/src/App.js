// App.js
import React from 'react';
import PetList from './components/PetList';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Pet Care Assistant</h1>
      <PetList />
    </div>
  );
}

export default App;