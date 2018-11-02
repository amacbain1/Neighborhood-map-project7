import React, { Component } from 'react';
import Header from './Header'
import TopSidebar from './Top-Sidebar'
import MapDiv from './MapDiv'
import './index.css'
import axios from 'axios'


class App extends Component {

  constructor(props) {
    super(props)
    this.markers = null
    this.state = {localArts: [],
      markers: [],
      map: null,
      showInfoWindow: false
    }
  }

  componentDidMount() {
    this.getLocalArts()
  }

  loadMap = () => {
    getScriptURL('https://maps.googleapis.com/maps/api/js?client=gme-nianticinc&v=weekly&libraries=geometry,drawing,places&callback=initMap')
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
        limit: 13

      }
      axios.get(endPoint + new URLSearchParams(parameters))
        .then(response => {
          this.setState({
            localArts: response.data.response.groups[0].items
          }, this.loadMap())
        })
        .catch = (error) => {
          console.log(error + ': Sorry, there seems to be an error')
        }
  }

  initMap = () =>{
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 34.059270, lng: -117.214530},
      zoom: 13

    });

    const infowindow = new window.google.maps.InfoWindow()

    let markers = this.state.localArts.map(art => {
      let contentString = `<strong>${art.venue.name}</strong> <br>  ${art.venue.location.address}`
      let marker = new window.google.maps.Marker({
        position: {lat: art.venue.location.lat, lng: art.venue.location.lng},
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: art.venue.name
      })
      //Markers[] was empty--pushing into
      //this.state.markers.push(marker)

        marker.addListener('click', function() {

          infowindow.setContent(contentString)
          infowindow.open(map, marker)
          marker.getAnimation() !== null ?
            marker.setAnimation(null):
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(() => {marker.setAnimation(null)}, 1000)

          });

          this.setState.showInfoWindow = false
          return marker

            //const marker = this.state.markers.filter(marker => marker.position === this.state.localArts.filter((art) => art.venue.labeledLatLng))
          //  this.setState.showInfoWindow = true
    });
    this.setState({
      markers: markers,
      map: map
    })

    window.myMarkers = this.state.markers;
    window.myMap = map;
  }


  listItemClick = art => {
  //  const marker = this.state.markers.filter(marker => marker.map.title === //this.state.localArts.filter((art) => art.venue.name))

  //  this.setState.showInfoWindow= true
    //this.marker.InfoWindow.open(marker)
    console.log(art)

  }


  render() {
    return (
      <div className="App">
        <Header />
        <div className='wide-view'>
          <TopSidebar
            localArts={this.state.localArts}
            markers={this.state.markers}
            listItemClick={this.listItemClick}
            map={this.state.map}          />
          <MapDiv
            markers={this.state.markers}
          />
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
//LevelUp Tuts=Building a Search Function
//Ryan Waite=Coding Session YouTube
