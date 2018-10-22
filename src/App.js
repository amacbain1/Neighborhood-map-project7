import React, { Component } from 'react';
import Header from './Header'
import TopSidebar from './Top-Sidebar'
import MapDiv from './MapDiv'
import './index.css'
import axios from 'axios'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {localArts: []
    }
  }



  componentDidMount() {
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
        limit: 10
      }
      axios.get(endPoint + new URLSearchParams(parameters))
        .then(response => {
          this.setState({
            localArts: response.data.response.groups[0].items
          }, this.loadMap())
        })
        .catch = (error) => {
          console.log(error: 'Sorry, seems to be an error')
        }
  }

  initMap = () =>{
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.059270, lng: -117.214530},
      zoom: 13
    });

    const infowindow = new window.google.maps.InfoWindow()

    this.state.localArts.forEach(art => {
      const contentString = `${art.venue.name}  ${art.venue.location.address}`
      const marker = new window.google.maps.Marker({
        position: {lat: art.venue.location.lat, lng: art.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: art.venue.name
      })
      

      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker);
        });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className='wide-view'>
          <TopSidebar
            localArts={this.state.localArts}
          />
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
