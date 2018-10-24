import React, { Component } from 'react';


class TopSidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {query: '',
    filterLocations: true,
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
    //Can toggle markers to false but not back to true
    //markers remain visible on-screen
    let markers = this.props.markers.filter((marker) =>{
        if (marker.title.toLowerCase() === this.state.query.toLowerCase()) {
          marker.visible = true
        }else{
          marker.visible = false
        }
    })

    this.setState({ query })
  }


  showOnClick = e => {
    this.setState({ showLocations: !this.state.showLocations })
  //  this.setState({ filterLocations : !this.state.filterLocations })
  }


  render(){

    let filterLocations = this.props.localArts.filter( (localArt) => {
      return localArt.venue.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
    })
      return(
      <div className='options'>
        <h2 className='top-sidebar'>Art and Theater</h2>
        <div className='drop-down'>

          <i className='fas fa-arrow-alt-circle-up' style= {{padding: '15px' }} type='button' value='Hide options' onClick={this.showOnClick}/>
          <input className='see-options' type='text' placeholder='Search' value={this.state.query} onChange={(event) => { this.filteredLocations(event.target.value) }}/>
        </div>

        <div className='show-locations'>
          {this.state.showLocations ? (
          <ul className='list-museums'>
            {filterLocations.map((localArt) => {
              return(
                <li key={localArt.venue.id} className='list-item'>

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
