import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow';
import { produce } from 'immer';
import { Link } from 'react-router-dom';
import AddCar from './AddCar';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: '',
            cars: [],
            id:''
        }
    }
    componentDidMount = async () => {
        await this.refreshPeople();
    }

    refreshPeople = async () => {
        const { data } = await axios.get('/api/peoplecar/getall');
        this.setState({ people: data });
    }

    render() {
        return (
            <>
            <Link className="btn btn-success btn-lg btn-block" to={`/addperson`}>
                <button className="btn btn-success">Add Person</button>
            </Link>
                
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Car Count</th>
                        <th>Add Car</th>
                        <th>Delete Cars</th>
                    </thead>
                    <tbody>
                        {this.state.people.map(p=>
                            <PersonRow
                                key={p.id}
                                person={p}

                            />)}
                    </tbody>
                    </table>
            </>
            )
    }
}
export default PeopleTable;