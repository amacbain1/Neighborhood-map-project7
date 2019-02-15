import React, {Component} from 'react';
import Header from './Header'
import TopSidebar from './Top-Sidebar'
import MapDiv from './MapDiv'
import './index.css'
import axios from 'axios'

//******Attrubution and kindly offered assisstance******
//Neighborhood Map by Yahya Elharony, YouTube
//LevelUp Tuts=Building a Search Function, YouTube
//Ryan Waite=Coding Session, YouTube
//Google @ https://developers.google.com/maps/documentation/javascript/tutorial
//Neighborhood Map by Forreest Walker, YouTube
// Kind assistance and guidance from @Lloan Alas, student mentor


class App extends Component {


        markers = null;
        state = {
            infowindow: null,
            localArts: [],
            markers: [],
            map: null,
        }



    componentDidMount() {

      this.getLocalArts()
      setTimeout(function(){
        if(window.google) {
          console.log("maps work");
          } else {
            alert('Sorry, there seems to be an error');} }, 2000);
    }

    loadMap = () => {
        getScriptURL('https://maps.googleapis.com/maps/api/js?client=gme-nianticinc&v=weekly&libraries=geometry,drawing,places&callback=initMap')
        window.initMap = this.initMap
    }

//Retrieve locations from Foursquare
    getLocalArts = () => {
        const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
        const parameters = {
            client_id: '2VFYWEPSFX3JFVVNQEN1GQMJBLS42U3YXFG4ARNWQ2IFPXHB',
            client_secret: 'I4VFI4PA3W1ZQRCFPKKSEN45ZYV0DM3I2AOHQOSGADY41EOH',
            v: '20181015',
            section: 'arts',
            near: 'Redlands, CA',
            limit: 15

        }
        axios.get(endPoint + new URLSearchParams(parameters))
            .then(response => {
                this.setState({
                    localArts: response.data.response.groups[0].items
                }, this.loadMap())
            })
            .catch = (error) => {
            alert(error + ': Sorry, there seems to be an error')
        }
    }

    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 34.059270, lng: -117.214530},
            zoom: 13

        });



        const infowindow = new window.google.maps.InfoWindow()

        let markers = this.state.localArts.map(art => {
            let contentString = `<div role='dialog' aria-labelledby='dialog-title' type='modal'><h4><strong>${art.venue.name}</strong></h4> <br>  <p>${art.venue.location.address}</p></div>`
            let marker = new window.google.maps.Marker({
                position: {lat: art.venue.location.lat, lng: art.venue.location.lng},
                map: map,
                animation: window.google.maps.Animation.DROP,
                title: art.venue.name
            });
//Tie infowindow to markers
            marker.contentString = () => {

                infowindow.setContent(contentString)
                infowindow.open(map, marker)
                marker.getAnimation() !== null ?
                    marker.setAnimation(null) :
                    marker.setAnimation(window.google.maps.Animation.BOUNCE)
                setTimeout(() => {
                    marker.setAnimation(null)
                }, 1000)
              }

              marker.addListener('click', function () {
                marker.contentString();
            });

            return marker;

        });

        this.setState({
            markers: markers,
            map: map,
            InfoWindow: infowindow
        })

        window.myMarkers = markers;
        window.myMap = map;
    };

//Click event in sidebar
    listItemClick =  (location) => {
        this.state.markers.forEach(marker => {
            if (marker.title.toLowerCase() === location.toLowerCase()){
                marker.contentString();
            } else {
              return null
            }
          });
    }




    render() {
        return (
            <div className="App">
                <Header/>
                <div className='wide-view'>
                    <TopSidebar
                        localArts={this.state.localArts}
                        markers={this.state.markers}
                        listItemClick={this.listItemClick}
                        map={this.state.map}
                    />
                    <MapDiv
                        markers={this.state.markers}
                    />
                </div>
            </div>
        );
    }
}

//A-sync behavior retrieving map
function getScriptURL(url) {
    const index = window.document.getElementsByTagName('script')[0]
    const scriptKey = window.document.createElement('script')
    scriptKey.onerror = function () {handleError()}
    scriptKey.src = url
    scriptKey.async = true
    scriptKey.defer = true
    index.parentNode.insertBefore(scriptKey, index)
}
function handleError() {
  alert('The image could not be loaded.')
}



export default App;
