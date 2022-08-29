import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import CarRow from './CarRow';


class DeleteCars extends React.Component {
    state = {
        cars: [],
        car: {
            make: '',
            model: '',
            year: '',
            personId: '',

        }
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplcar/getcars?id=${id}`);
        this.setState({ cars: data });
    }
    onYesClick = async () => {
        const { id } = this.props.match.params;
        await axios.post('/api/peoplecar/deletecars', { id });
        this.props.history.push('/');
    }
    onNoClick = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                    </thead>
                    <tbody>
                        {this.state.cars.map(c =>
                            <CarRow
                                key={c.id}
                                car={c}

                            />)}
                    </tbody>
                </table>
                <h1>Are you sure you want to delete all these cars?</h1>
                <div className="row">
                    <button onClick={this.onNoClick} className="btn btn-primary btn-block">No</button>
                    <button onClick={this.onYesClick} className="btn btn-primary btn-block">Yes</button>
                </div>
            </>

    )
}
}
export default DeleteCars;