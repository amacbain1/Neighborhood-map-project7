import React, { Component } from 'react';


class TopSidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {query: '',
      filterLocations: [],
      showLocations: true
    }
  }



  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.filterLocations(query)
  }

  filterLocations = (query) => {
  //  this.props.localArts.forEach(marker => {
  //    marker.name.toLowerCase().includes(query.toLowerCase()) == true ?
  //      marker.setVisible(true) :
  //      marker.setVisible(false)
      //const marker = new window.google.maps.Marker
      //if (!query.toLowerCase() === this.props.localArts.marker) {
    //     null
    //  }else{
    //    this.props.localArts.marker
    //  }
  //    console.log(marker)


    this.setState({ query })

  //  })
  }

  showOnClick = e => {
    this.setState({ showLocations: !this.state.showLocations })
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
          <input className='see-options' type='text' placeholder='Search' value={this.state.query} onChange={(event) => { this.filterLocations(event.target.value) }}/>
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
