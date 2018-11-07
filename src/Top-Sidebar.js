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

        //this.filteredLocations(query)
        //this.setState({ filteredLocations: query })
    }

    filteredLocations = (query) => {

        this.setState({query})

        // clear all markers
        this.props.markers.forEach(marker => marker.setMap(null));
        console.log('markers cleared');

        this.filterMarkers(query);
        console.log(this.props.map);
    };



    filterMarkers = query => {
        //  event.preventDefault()
        let {localArts, markers, map} = this.props;

        markers.forEach(location => {
            console.log(query);

            if (location.title.toLowerCase().match(query) !== null) {
                location.setMap(this.props.map);
                console.log(location.title);
            }
        });
    }


    toggleIcon = (icon) => {
        const circleDown = <i className='fas fa-arrow-alt-circle-down'> </i>
        this.setState({showLocations: !this.state.showLocations})

        //icon.toggle.circleDown
    }

    showOnClick = e => {
        this.setState({filterLocations: !this.state.filterLocations})
    }


    render() {
        let {localArts, markers} = this.props
        window.testMe = this.props;
        let filterLocations = localArts.filter((localArt) => {
            return localArt.venue.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1

        })


        return (
            <div className='options'>
                <h2 className='top-sidebar'>Art and Theater</h2>
                <nav className='drop-down-filter' role='navigation'>
                    <button className='button'>
                        <i className='fas fa-arrow-alt-circle-up' tab-index='0'
                           style={{color: '#0B3C5D', cursor: 'pointer'}} type='button' role='button'
                           value='Hide options' onClick={this.toggleIcon}/>

                        <i className='fas fa-arrow-alt-circle-down'
                           style={{color: '#0B3C5D'}} type='button'
                           value='Show options' onClick={this.toggleIcon}/>
                    </button>
                    <input className='see-options' type='text' placeholder='Filter Results' value={this.state.query}
                           onChange={(event) => {
                               this.filteredLocations(event.target.value)
                               //this.filteredMarkers()
                           }}/>

                </nav>

                <div className='show-locations'>

                    {this.state.showLocations ? (

                        <ul className='list-museums'>

                            {filterLocations.map((localArt) => {
                                return (

                                    <li key={localArt.venue.id} className='list-item'
                                        onClick={() => this.props.listItemClick(localArt.venue.name)}>
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
