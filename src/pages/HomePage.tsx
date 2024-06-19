import React from 'react'
import DateDisplay from '../components/DateDisplay'
import PassingComponent from '../components/PassingComponent';

const HomePage: React.FC = () => {
    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Hello world!</h1>
            <h3 style={{ fontSize: '1em' }}>Passing</h3>
            <PassingComponent/>
            <h3 style={{ fontSize: '1em' }}>Shooting</h3>
            <h3 style={{ fontSize: '1em' }}>Refracting/loose ball</h3>
            <h3 style={{ fontSize: '1em' }}>Tackling</h3>
            <h3 style={{ fontSize: '1em' }}>Dribbling</h3>
            <h3 style={{ fontSize: '1em' }}>Saving</h3>
            <DateDisplay />
        </div>
    )
}

export default HomePage
