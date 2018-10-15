import React, { Component } from 'react';
import Header from './Header'
import TopSidebar from './Top-Sidebar'
import MapDiv from './MapDiv'
import './index.css'
import axios from 'axios'


class App extends Component {

  componentDidMount() {
    this.loadMap()
    this.getLocalArts()
  }



  loadMap = () => {
    getScriptURL('https://maps.googleapis.com/maps/api/js?key=AIzaSyDD6Pih0tlHoxYUN9YIL4aLSvAvZMoLknM&v=3&callback=initMap')
      window.initMap = this.initMap
  }

getLocalArts = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: '2VFYWEPSFX3JFVVNQEN1GQMJBLS42U3YXFG4ARNWQ2IFPXHB',
      client_secret: 'I4VFI4PA3W1ZQRCFPKKSEN45ZYV0DM3I2AOHQOSGADY41EOH',
      v: '20181015',
      section: 'arts',
      near: 'Redlands, CA',
      limit: 6
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.groups[0].items)
      })

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
        <div className='wide-view'>
          <TopSidebar />
          <MapDiv />
        </div>
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
