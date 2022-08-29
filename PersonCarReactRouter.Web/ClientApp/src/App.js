import React from 'react';
import { Route } from 'react-router-dom';
import PeopleTable from './PeopleTable';
import AddPersonPage from './AddPersonPage';
import AddCar from './AddCar';
import DeleteCars from './DeleteCars';

import Layout from './Layout';


const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={PeopleTable} />
            <Route exact path='/addperson' component={AddPersonPage} />
            <Route exact path='/addcar/:id' component={AddCar} />
            <Route exact path='/deletecars/:id' component={DeleteCars} />
            
        </Layout>
    )
}

export default App;