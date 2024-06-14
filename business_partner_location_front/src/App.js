import React from 'react';
import './App.css';
import AdsContent from './components/AdsContent/AdsContent';
import Footer from './components/Footer/Footer';
import MapComponent from './components/MapComponent/MapComponent';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MapComponent />
      <AdsContent/>
      <Footer/>
    </div>
  );
}

export default App;
