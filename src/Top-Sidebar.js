import React, { Component } from 'react';


class TopSidebar extends Component {

  render(){
      return(
      <div className='options'>
        <h2 className='top-sidebar'>Art and Theater</h2>
        <div className='drop-down'>
          <input className='see-museums' type='button' value='Places to see' />
          <input  className='hide-museums' type='button' value='Hide options' />
          <div className='show-locations'>
            <ul className='list-museums'>
              <li className='museum-item'>
                {this.props.locations}
              </li>
            </ul>
          </div>
        </div>
      </div>

      );
  }

}

export default TopSidebar;
