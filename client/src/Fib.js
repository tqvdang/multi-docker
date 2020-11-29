import React, {Component} from 'react';
import axios from 'axios';

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        console.log('componentDidMount is called');
        this.fetchValues();
        this.fetchIndexes();

    }
    async fetchValues() {
        console.log('fetchValues ---');
        const values = await axios.get('/api/values/current');
        this.setState({values:values.data});

    }
    async fetchIndexes() {
        console.log('fetchIndexes ---');
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({seenIndexes:seenIndexes.data});
    }
    handleSubmit = async (event)=>{
        event.preventDefault();
        console.log('handle-submit');
        await axios.post('/api/values', {
            index: this.state.index
        });
        console.log('reset index');
        this.setState({index: ''});
    }
    renderSeenIndexes() {
        console.log(this.state.seenIndexes);
        return this.state.seenIndexes.map(({number})=>number).join(', ');
    }
    renderValues() {
        const entries = [];
        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key}, I calculated {this.state.values[key]}
                </div>
            );
        }
        return entries;
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input 
                        value={this.state.index}
                        onChange={(event) => this.setState({index: event.target.value})}
                    />
                    <button>Submit</button>
                </form>
                <div>Indexes I have seen:</div>
                {this.renderSeenIndexes()}
                <div>Calculated Values:</div>
                {this.renderValues()}
            </div>
        );
    };
}

export default Fib;