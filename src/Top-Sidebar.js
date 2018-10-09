import React, { Component } from 'react';


class TopSidebar extends Component {

  render(){
      return(
      <div className='options'>
        <h2 className='top-sidebar'>Local Museums</h2>
        <div className='drop-down'>
          <input className='see-museums' type='button' value='Places to see' />
          <input  className='hide-museums' type='button' value='Hide options' />
        </div>
      </div>

      );
  }

}

export default TopSidebar;
