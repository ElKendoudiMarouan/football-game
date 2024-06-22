import React from 'react'
import DateDisplay from '../components/DateDisplay'
import PassingComponent from '../components/PassingComponent';
import {DeflectionComponent} from '../components/DeflectionComponent';
import ShootingComponent from '../components/ShootingComponent';

const HomePage: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Football Game!</h1>
            <PassingComponent/>
            <hr/>
                <ShootingComponent/>
            <hr/>
            <DeflectionComponent/>
            <hr/>
            <h2 style={{ fontSize: '1em' }}>Tackling</h2>
            <hr/>
            <h2 style={{ fontSize: '1em' }}>Dribbling</h2>
            <hr/>
            <h2 style={{ fontSize: '1em' }}>Saving</h2>
            <DateDisplay />
        </div>
    )
}

export default HomePage
