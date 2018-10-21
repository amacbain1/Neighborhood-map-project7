import React, { Component } from 'react';


class TopSidebar extends Component {
  state = {query: '',
    filterLocations: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })

  }

  filterLocations = (query) => {
    console.log(query)


    this.setState({ query })
  }



  render(){
      return(
      <div className='options'>
        <h2 className='top-sidebar'>Art and Theater</h2>
        <div className='drop-down'>
          <input  className='hide-options' type='button' value='Hide options' />
          <input className='see-options' type='text' placeholder='Search' value={this.state.query} onChange={(event) => { this.filterLocations(event.target.value) }}/>
        </div>
        <div className='show-locations'>
          <ol className='list-museums'>

          </ol>
        </div>

      </div>

      );
  }

}

export default TopSidebar;
