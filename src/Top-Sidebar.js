import React, { Component } from 'react';


class TopSidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {query: '',
    showLocations: true
    }
  }


  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.filteredLocations(query)
  }

  filteredLocations = (query) => {
    this.setState({ query })
    this.filterMarkers()
  }

  filterMarkers = query => {
    let {markers} = this.props
    let animateMarker = window.google.maps.Animation.BOUNCE

    let filteredMarkers = markers.filter(marker =>
      marker.title.toLowerCase().match(this.state.query.toLowerCase())
      )
      markers.forEach(marker => marker.setVisible(false))
      filteredMarkers.forEach(marker =>
        marker.setVisible(true)
        //animateMarker
    )
  }


  toggleIcon = (icon) => {
    const circleDown = <i className='fas fa-arrow-alt-circle-down'> </i>
    this.setState({ showLocations: !this.state.showLocations })

    //icon.toggle.circleDown
  }

  showOnClick = e => {
    this.setState({ filterLocations : !this.state.filterLocations })
  }


  render(){

    let filterLocations = this.props.localArts.filter( (localArt) => {
      return localArt.venue.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1

    })
      return(
      <div className='options'>
        <h2 className='top-sidebar'>Art and Theater</h2>
        <div className='drop-down'>

          <i className='fas fa-arrow-alt-circle-up' style= {{padding: '15px', color: '#0B3C5D' }} type='button' value='Hide options' onClick={this.toggleIcon} />
          <i className='fas fa-arrow-alt-circle-down' style= {{padding: '15px', color: '#0B3C5D', display: 'none' }} type='button' value='Show options' onClick={this.toggleIcon} />
          <input className='see-options' type='text' placeholder='Search' value={this.state.query} onChange={(event) => { this.filteredLocations(event.target.value)
          }}/>
        </div>

        <div className='show-locations'>
          {this.state.showLocations ? (
          <ul className='list-museums'>
            {filterLocations.map((localArt) => {
              return(
                <li key={localArt.venue.id} className='list-item' onClick = {(e) => {

                    console.log('click')

                  }}>

                 {localArt.venue.name}

                </li>
              )

            })
          }
          </ul>
        ) : null}
        </div>

      </div>
      );
  }
}

export default TopSidebar;
