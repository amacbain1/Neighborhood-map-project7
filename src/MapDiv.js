import React, { Component } from 'react';
//import Locations from './Locations'


export class MapContainer extends Component {
  constructor() {
    super();
      this.state ={
        locations: [
        { 'name': 'Historical Glass Museum', 'position': 'lat: 34.069050, lng: -117.182810', 'title': '' },
        { 'name': 'Lincoln Memorial Shrine', 'position': 'lat: 34.046796, lng: -117.174269', 'title': '' },
        { 'name': 'University of Redlands', 'position': 'lat: 34.061560, lng: -117.165410', 'title': '' },
        { 'name': 'San Bernardino County Museum', 'position': 'lat: 34.067970, lng: -117.223940', 'title': '' },
        { 'name': 'Kimberly Crest House and Gardens', 'position': 'lat: 34.037450, lng: -117.172780', 'title': '' }
        ],
        markers: []
      }
  }


  render() {
    return(
      <div>
        <main>

          <div id="map">
            
          </div>
        </main>
      </div>
    )
  }

}

export default MapContainer;
