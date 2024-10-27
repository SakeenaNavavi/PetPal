import React from 'react';
import PetProfile from './components/PetProfile';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Pet Care Assistant</h1>
      <PetProfile />
    </div>
  );
}

export default App;