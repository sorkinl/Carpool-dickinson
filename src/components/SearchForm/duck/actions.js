import searchFormTypes from './types';

const pickup = () => ({
    type: searchFormTypes.PICKUP
});

const destination = () => ({
    type: searchFormTypes.DESTINATION
});

const startdate = () => ({
    type: searchFormTypes.STARTDATE
});

export default {
    pickup,
    destination,
    startdate
}