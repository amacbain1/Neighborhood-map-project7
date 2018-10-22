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
    this.props.localArts.forEach(art => {
      //const marker = new window.google.maps.Marker
      //if (!query.toLowerCase() === this.props.localArts.marker) {
    //     null
    //  }else{
    //    this.props.localArts.marker
    //  }
      console.log(query)

    this.setState({ query })
  })
  }

  showOnClick = e => {
    this.setState({ showLocations: !this.state.showLocations })
  }


  render(){
      return(
      <div className='options'>
        <h2 className='top-sidebar'>Art and Theater</h2>
        <div className='drop-down'>
            <i className='fas fa-angle-up' style= {{float: 'right'}} type='button' value='Hide options' onClick={this.showOnClick}/>
          <input className='see-options' type='text' placeholder='Search' value={this.state.query} onChange={(event) => { this.filterLocations(event.target.value) }}/>
        </div>
        <div className='show-locations'>
          {this.state.showLocations ? (
          <ul className='list-museums'>
            {this.props.localArts.map(localArts => {
              return(
                <li className='listItem' key={this.props.localArts.id}>

                    Museum Name {this.props.localArts.name}

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
