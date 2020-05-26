import React from 'react';

const initialState = {
    pickup:'',
    destination:'',
    startDate: new Date()
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case 'PICKUP':
            return {
                pickup: action.payload,
                ...state
                 }
        case 'DESTINATION':
            return {
                destination: action.payload,
                ...state
            }
        case 'STARTDATE':
            return {
                startDate: action.payload,
                ...state
            }
        default: return state
    }
}