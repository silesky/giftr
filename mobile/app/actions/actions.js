import {getFriendById} from './../utils/util'
export const updateGiftDesc = (friendId, giftId, giftDesc) => {
  console.log('updateGift', friendId, giftId, giftDesc);
    return {
      type: 'UPDATE_GIFT_DESC',
      payload: {friendId, giftId, giftDesc}
    }
  }
export const updateGiftTitle = (friendId, giftId, giftTitle) => {
  console.log('updateGift', friendId, giftId, giftTitle);
    return {
      type: 'UPDATE_GIFT_TITLE',
      payload: {friendId, giftId, giftTitle}
    }
  }
export const deleteGift = (friendId, giftId) => {
  console.log('deleteGift:', friendId, giftId);
  return {
    type: 'DELETE_GIFT',
    payload: {friendId, giftId}
    }
  }

export const selectFriend = (friendId) => {
    return {
        type: 'SELECT_FRIEND',
        payload: {friendId}
    }
}

const _deleteFriend = (friendId) => ({type: 'DELETE_FRIEND',payload: {friendId}})

const _selectLastFriend = () => {
  return (dispatch, getState) => {
      const state = getState().user.data;
      const latestFriendId = state[state.length - 1].friendId;
      dispatch(selectFriend(latestFriendId));
  }
}
const _selectNextFriend = (currentFriendId) => {
  console.log('selectNextFriend');
  return (dispatch, getState) => {
    const state = getState().user.data;
    const nextInd = state.findIndex(el => el.friendId === currentFriendId) + 1; // get index
    const nextId = state[nextInd].friendId;
    dispatch(selectFriend(nextId));
  }
}

export const deleteFriend = (friendId) => {

  return (dispatch, getState) => {
    const friendArr = getState().user.data;
    const selectedFriendId = getState().visible.selectedFriendId;
    // if you are deleting the same friend you're looking at, go to the next one.
    // if the friend you're looking at isn't the last one in the deck, you should go to the next one.
    // otherwise, it doesn't matter... just delete
      if (friendArr.length > 1 && friendId === selectedFriendId) {
          console.log(friendArr.length, 'friendArr');
          dispatch(_selectNextFriend(friendId));
      } 
      dispatch(_deleteFriend(friendId))
    
    }
  }

export const createFriendToggleModalVisible = () => ({type: 'CREATE_FRIEND_TOGGLE_MODAL_VISIBLE'})

export const _createFriend = (friendName, bday) => ({type: 'CREATE_FRIEND', payload: {friendName, bday}});
// modal visibility toggle called
export const createFriend = (friendName, bday) => {
    console.log('bday input:', bday);
    bday = (bday) ? bday : '???';
    return (dispatch) => {
       dispatch(_createFriend(friendName, bday));
       dispatch(_selectLastFriend());
       dispatch(createFriendToggleModalVisible());
    }
}
// friendId
export const addGift = (friendId) => {
    console.log(friendId, 'addgift called');
    return {
        type: 'ADD_GIFT',
        // e.g {giftTitle: 'new gift'}
        payload: {friendId}
    }
}



export const testClick = () => {
  console.log('Action->TEST CLICK...')
  return function(dispatch, getState) {
    //
  }
}