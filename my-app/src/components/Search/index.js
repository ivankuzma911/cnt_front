/**
 * Created by IvanDev on 07.07.2017.
 */
import React from 'react'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        this.props.searchHandler(this.state.inputValue);
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="searchForm">
                <label>
                    <p>Employee Name:</p>
                    <p>
                        <input type="text" name="name" onChange={this.handleChange} className="form-control"/>
                    </p>
                </label>
                <p>
                    <input type="submit" value="Search" className="btn btn-primary"/>
                </p>
            </form>
        )
    }
}

export default Search;