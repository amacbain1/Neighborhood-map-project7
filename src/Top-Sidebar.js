import React, { Component } from 'react';


class TopSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {query: '',
    showLocations: true,
    filteredLocations: []

    }
  }


  updateQuery = (query) => {
    this.setState({
      query: query
    })

    //this.filteredLocations(query)
    //this.setState({ filteredLocations: query })
  }

  filteredLocations = (query) => {

    this.setState({ query })
    this.filterMarkers({ query })
  }


//  filterMarkers(event) {
      //event.preventDefault();
//      const regex = new RegExp(event.target.value, 'i');
//      const Markers = this.props.marker.filter(function(marker) {
//        return (Markers.get('title').search(regex) > -1);
//      });


  filterMarkers = query => {
  //  event.preventDefault()
  let {localArts, markers} = this.props

//  let filterLocations = localArts.filter(localArt => {
//  return localArt.venue.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
//  })


    let filterLocations = this.props.localArts.filter(localArt =>
       localArt.venue.name.toLowerCase().match(this.state.query.toLowerCase())
    )
    this.setState ({ filteredLocations: filterLocations })

    let filteredMarkers =  markers.filter(marker =>
     //return (marker.get('title').search(regex) > -1)}
     marker.title.toLowerCase().match(this.state.query.toLowerCase()))

      markers.forEach(marker => marker.setVisible(false))
      filteredMarkers.forEach(marker =>
        marker.setVisible(true)
      )
    //  this.setState({ filteredLocations: filterLocations })

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
    let {localArts, markers} = this.props

    let filterLocations = localArts.filter( (localArt) => {
      return   localArt.venue.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1

    })


      return(
      <div className='options'>
        <h2 className='top-sidebar'>Art and Theater</h2>
        <div className='drop-down'>

          <i className='fas fa-arrow-alt-circle-up' style= {{padding: '15px', color: '#0B3C5D' }} type='button' value='Hide options' onClick={this.toggleIcon} />

          <i className='fas fa-arrow-alt-circle-down' style= {{padding: '15px', color: '#0B3C5D', display: 'none' }} type='button' value='Show options' onClick={this.toggleIcon} />

          <input className='see-options' type='text' placeholder='Filter Results' value={this.state.query} onChange={(event) => { this.filteredLocations(event.target.value)
            //this.filteredMarkers()
           }}/>

        </div>

        <div className='show-locations'>

          {this.state.showLocations ? (

              <ul className='list-museums'>

            {filterLocations.map((localArt) => {
            return(

                <li key={localArt.venue.id} className='list-item'
                    onClick={() => this.props.listItemClick(localArt.venue.name)} >
                     {localArt.venue.name}

                </li>

            )
            })}

            </ul>

        ) : null
      }

        </div>

      </div>
      );
  }
}

export default TopSidebar;
