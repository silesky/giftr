import * as initialStateUser from './../initialState.json'
import {
  combineReducers
} from 'redux'
import {
  createUuid
} from './../utils/util';


const user = (state = initialStateUser, action) => {
  let newState, 
    newData, 
    oldgiftArr, 
    newGiftArr, 
    friendId, 
    giftDesc, 
    giftId,
    giftTitle
    ;
  const _getGiftArrByFriendId = (friendId) => state.data.find(el => el.friendId === friendId).gifts;
  const _getSingleGiftObj = (friendId, giftId) => _getGiftArrByFriendId(friendId).find((el) => el.giftId === giftId)

  switch (action.type) {

    case 'UPDATE_GIFT_TITLE':
        friendId = action.payload.friendId;
        giftTitle = action.payload.giftTitle;
        giftId = action.payload.giftId;
        newGiftArr = _getGiftArrByFriendId(friendId).map(el => {
           if (el.giftId === giftId) el.giftTitle = giftTitle
           return el
      })
      newData = state.data.map(el => {
          if (el.friendId === friendId) el.gifts = newGiftArr
          return el
      })
      newState = Object.assign({}, state, {data: newData})
      return newState;
        
    case 'DELETE_GIFT':
       friendId = action.payload.friendId;
       giftId = action.payload.giftId;

       newGiftArr = _getGiftArrByFriendId(friendId)
       .filter(el => el.giftId !== giftId)

      console.log('newGiftArr with thing removed', newGiftArr);
      newData = state.data.map(el => {
        if (el.friendId === friendId) el.gifts = newGiftArr
        return el
      })
      newState = Object.assign({}, state, {data: newData})
    
      return newState;

    case 'DELETE_FRIEND':
      friendId = action.payload.friendId;
      newData = state.data.filter(el => el.friendId !== friendId)
      newState = Object.assign({}, state, {data: newData})

      return newState;
      
    case 'UPDATE_GIFT_DESC':
      friendId = action.payload.friendId;
      giftDesc = action.payload.giftDesc;
      giftId = action.payload.giftId;
      newGiftArr = _getGiftArrByFriendId(friendId).map(el => {
           if (el.giftId === giftId) el.giftDesc = giftDesc
           return el
      })
      newData = state.data.map(el => {
          if (el.friendId === friendId) el.gifts = newGiftArr
          return el
      })
      newState = Object.assign({}, state, {data: newData})
      return newState;


    case 'CREATE_FRIEND':
      return Object.assign({}, {
        data: [...state.data, {
          friendId: createUuid(),
          friendName: action.payload.friendName,
          bday: action.payload.bday,
          gifts: []
        }]
      })


    case 'ADD_GIFT':
      newData = state.data.map(el => {
        if (el.friendId === action.payload.friendId) {
          el.gifts = [...el.gifts, {
            giftTitle: 'new gift',
            giftId: createUuid()
          }]
        }
        return el
      })
      return Object.assign({}, {data: newData});


    default:
      return state;
  }

}

const initialStateFirstUser = {
  selectedFriendId: initialStateUser.data[0].friendId,
  createFriendModalVisibility: false
};
const visible = (state = initialStateFirstUser, action) => {
  switch (action.type) {

    case 'SELECT_FRIEND':
      return Object.assign({}, state, {
        selectedFriendId: action.payload.friendId
      });
    case 'CREATE_FRIEND_TOGGLE_MODAL_VISIBLE':
      return Object.assign({}, state, {
        createFriendModalVisibility: !state.createFriendModalVisibility
      });
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  user,
  visible
})