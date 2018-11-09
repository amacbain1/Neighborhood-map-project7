import React, {Component} from 'react';


class TopSidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            showLocations: true,
            filteredLocations: []

        }
    }


    updateQuery = (query) => {
        this.setState({
            query: query
        })
    }

//Filtered by search input
    filteredLocations = (query) => {
        this.setState({query})

// Clear all markers
        this.props.markers.forEach(marker => marker.setMap(null));
        this.filterMarkers(query);
    };


//Markers filtered by search input
    filterMarkers = query => {
      let {markers, map} = this.props;

      markers.forEach(location => {
        if (location.title.toLowerCase().match(query) !== null) {
            location.setMap(map);
          } else {
            return null
          }
        });
    }


    toggleIcon = (icon) => {
        this.setState({showLocations: !this.state.showLocations})
    }

    showOnClick = e => {
        this.setState({filterLocations: !this.state.filterLocations})
    }


    render() {
        let {localArts} = this.props
        let filterLocations = localArts.filter((localArt) => {
            return localArt.venue.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1

        })


        return (
            <div className='options'>
                <h2 className='top-sidebar'>Art and Theater</h2>
                <nav className='drop-down-filter' role='navigation'>
                    <button className='button' aria-label='toggle list-items'>
                        <i className='fas fa-arrow-alt-circle-up' tabIndex='0'
                           aria-pressed='true'
                           style={{color: '#0B3C5D', cursor: 'pointer'}} type='button' role='button'
                           value='Hide options' onClick={this.toggleIcon}/>

                        <i className='fas fa-arrow-alt-circle-down'
                           aria-pressed='false'
                           style={{color: '#0B3C5D', cursor: 'pointer'}} type='button'
                           value='Show options' onClick={this.toggleIcon}/>
                    </button>
                    <input className='see-options' type='text' placeholder='Filter Results' value={this.state.query}
                           onChange={(event) => {
                               this.filteredLocations(event.target.value)
                           }}/>



                <div className='show-locations' >

                    {this.state.showLocations ? (

                        <ul className='list-museums'>

                            {filterLocations.map((localArt) => {
                                return (

                                    <li key={localArt.venue.id} className='list-item'>

                                      <button aria-label='Location on map' className='list-item' tabIndex='0'
                                        onClick={() => this.props.listItemClick(localArt.venue.name)}
                                        >
                                        {localArt.venue.name}
                                      </button>
                                    </li>

                                )
                            })}

                        </ul>

                    ) : null
                  }

                </div>
                  </nav>
                <h6>Location information sourced via Foursquare</h6>
            </div>
        );
    }
}

export default TopSidebar;
