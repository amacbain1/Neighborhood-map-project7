import React, { Component } from 'react';

class Locations extends Component {
  render(){
    const markers = [
    { 'name': 'Historical Glass Museum', 'position': 'lat: 34.069050, lng: -117.182810', 'title': '' },
    { 'name': 'Lincoln Memorial Shrine', 'position': 'lat: 34.046796, lng: -117.174269', 'title': '' },
    { 'name': 'University of Redlands', 'position': 'lat: 34.061560, lng: -117.165410', 'title': '' },
    { 'name': 'San Bernardino County Museum', 'position': 'lat: 34.067970, lng: -117.223940', 'title': '' },
    { 'name': 'Kimberly Crest House and Gardens', 'position': 'lat: 34.037450, lng: -117.172780', 'title': '' }
    ]

    const position = markers[i].position;
    const title = markers[i].title;
    const marker = new window.google.maps.Marker({
      position
      title
      animation = google.maps.Animation.DROP,
      icon = defaultIcon,
      id = i
    });
    markers.push(marker);

      return
        <div>
          {this.props.marker}
        </div>

}

export default Locations;
