import React, { useState } from 'react';
//import './Accordion.scss';
import PassingComponent from '../PassingComponent';
import ShootingComponent from '../ShootingComponent';
import {DeflectionComponent} from '../outcomes/DeflectionComponent';
import BlockingComponent from '../BlockingComponent';
import FoulComponent from '../outcomes/FoulComponent';
import {DeflectionType} from '../../types/enums'; // Assuming you have your SASS styles in this file

type AccordionProps = {
    title?: string;
    content?: React.ReactNode;
};

const Accordion: React.FC<AccordionProps> = ({ title, content}) => {
    const [isActive, setIsActive] = useState(false);

    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    return (
        <div>
            <button className={`accordion ${isActive ? 'active' : ''}`} onClick={toggleAccordion}>
                {title}
            </button>
            {/*<div className="panel" style={{ display: isActive ? 'block' : 'none' }}>*/}
            {/*    {content}*/}
            {/*</div>*/}
            {isActive && (
                <div className="panel" style={{display: 'block'}}>
                    {content}
                </div>
            )}
        </div>
    );
};

const AccordionGroup = () => {
    const accordions = [
        { title: 'Passing', content: <PassingComponent/> },
        { title: 'Shooting', content: <ShootingComponent/> },
        { title: 'Deflection', content: <DeflectionComponent/> },
        { title: 'Blocking', content: <BlockingComponent/> },
        { title: 'Foul', content: <FoulComponent/> },
    ];

    return (
        <div>
            {accordions.map((accordion, index) => (
                <Accordion key={index} title={accordion.title} content={accordion.content} />
            ))}
        </div>
    );
};

export default AccordionGroup;
