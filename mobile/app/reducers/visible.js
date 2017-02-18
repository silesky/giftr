const initialState = {
  selectedFriendId: null,
  friendFormIsVisible: false,
  selectedTab: 'gifts'
}
export const visible = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_VISIBLE':
      {
        return initialState
      }
    case 'SELECT_TAB':
      {
        return {...state, selectedTab: action.payload.selectedTab }
      }
    case 'HYDRATE_VISIBLE':
      {
        return action.payload
      }
    case 'SELECT_FRIEND':
      {
        return {...state, selectedFriendId: action.payload.friendId }
      }
    case 'FRIEND_FORM_VISIBILITY_TOGGLE':
      {
        return {
          ...state,
          friendFormIsVisible: !state.friendFormIsVisible
        }
      }
    default:
      return state
  }
}
