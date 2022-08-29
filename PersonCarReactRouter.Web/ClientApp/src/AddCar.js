import React from 'react';
import axios from 'axios';
import { produce } from 'immer';
import { Route, Link } from 'react-router-dom';
import { render } from 'react-dom';


class AddCar extends React.Component{
    state={
        person:{
            firstName:'',
            lastName: '',
            age:'',
            id:''
        },
        car:{
            make:'',
            model:'',
            year: '',
            personId: '',
            
        }
    }

    componentDidMount = async()=>{
        const {id} = this.props.match.params;
        const {data}= await axios.get(`/api/peoplecar/getpersonbyid?id=${id}`);
        this.setState({person: data});
    }

onTextChange = e => {
    const nextState = produce(this.state, draftState => {
        draftState.car[e.target.name] = e.target.value;
    });
    this.setState(nextState);
    const { id } = this.props.match.params;
    const { personId } = this.state.car;
    this.setState({ personId: id });
}

    onSubmitClick = async () => {
        const { make, model, year } = this.state.car;
        const { id } = this.props.match.params;
        console.log(id);
        await axios.post('/api/peoplecar/addcar', { make, model, year, PersonId: id });
        this.props.history.push('/'); 
}

render(){
   
    const{make, model, year}= this.state.car;
    return(
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
            <h1>Add a car for {this.state.person.firstName} {this.state.person.lastName}</h1>
            <input type="text" value={make} name='make' onChange={this.onTextChange} className="form-control" placeholder="Make"></input>
            <input type="text" value={model} name='model' onChange={this.onTextChange} className="form-control" placeholder="Model"></input>
            <input type="text" value={year} name='year' onChange={this.onTextChange} className="form-control" placeholder="Year"></input>
            <button onClick={this.onSubmitClick} className="btn btn-primary btn-block">Submit</button>
            </div>
        </div>
    )
}
}

export default AddCar;