import React, { Component } from 'react';
import { render } from '@testing-library/react';
import Searchbar from './Searchbar';

class SearchForm extends Component {
    state = {
        information: [
            {
                id: 0,
                pickup: '',
                destination: '',
                startDate: new Date(),
            }
        ],
        keyword: ''
    }
    handleCreate = (data) => {
        const { information } = this.state;
        // this.setState({
        //     information: information.concat({ id: this.id++, ...data })
        // }) 
        console.log(data);
    }
    render() {
        return (
            <div>
                Welcome
                <Searchbar 
                    onCreate={this.handleCreate}
                />
            </div>
        )
    }
}

export default SearchForm;