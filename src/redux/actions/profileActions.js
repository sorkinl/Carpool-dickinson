import firebase from '../../firebase/firebaseConfig';

export const getProfileData = (payload) =>{
    //TODO retrieve profile data from database
}

export const updateProfile = (payload) =>{
    //TODO update profile info in the database
}

export const deleteProfile = (payload) =>{
    //TODO remove record in case account is deleted
}

export const createProfile = (payload) =>{
    //create profile when the user is registered

    return async (dispatch) => {
      const firestore = firebase.firestore();
      try{
            const response = await firestore.collection('users').add({
            ...payload,
            // location: 'Carlisle, PA',
            // phoneNum: 9172923223
          })
          dispatch({type: 'CREATE_PROFILE', payload: response});
      }
      catch(error) {
        console.log('create profile error');
      }
    }
}
