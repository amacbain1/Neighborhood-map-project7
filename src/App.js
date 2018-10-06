import React, { Component } from 'react';
import Header from './Header'
//import TopSidebar from './Top-Sidebar'
//import MapDiv from './MapDiv'
//import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';


class App extends Component {

  componentDidMount() {
    this.loadMap()
  }

  loadMap = () => {
    getScriptURL('https://maps.googleapis.com/maps/api/js?key=AIzaSyDD6Pih0tlHoxYUN9YIL4aLSvAvZMoLknM&v=3&callback=initMap')
      window.initMap = this.initMap
  }

  initMap = () =>{

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.0556, lng: -117.1825},
      zoom: 13
    });
  }



  render() {
    return (
      <div className="App">
        <Header />

        <main>

          <div id="map">

          </div>
        </main>
      </div>
    );
  }
}

function getScriptURL(url) {
  const index = window.document.getElementsByTagName('script')[0]
  const scriptKey = window.document.createElement('script')
  scriptKey.src = url
  scriptKey.async = true
  scriptKey.defer = true
  index.parentNode.insertBefore(scriptKey, index)
}
export default App;
