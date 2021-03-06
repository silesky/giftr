const initialState = {
  selectedFriendId: null,
  friendFormIsVisible: false,
  selectedTab: 'gifts',
  isLeftDrawerOpen: false,
  createGiftModalVisibility: false,
  createEventModalVisibility: false,
  selectedGiftId: null,
  allFriendsVisibility: false,
}
export const visible = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALLFRIENDS_VISIBILITY': {
      return {
        ...state,
        allFriendsVisibility: action.payload.bool,
        selectedFriendId: null,
      }
    }
    case 'FOCUS_GIFT_INPUT': {
      return { ...state, selectedGiftId: action.payload.selectedGiftId }
    }
    case 'SET_LEFT_DRAWER_OPEN_TRUE': {
      return { ...state, isLeftDrawerOpen: true }
    }
    case 'SET_LEFT_DRAWER_OPEN_FALSE': {
      return { ...state, isLeftDrawerOpen: false }
    }
    case 'RESET_VISIBLE': {
      return initialState
    }
    case 'SELECT_TAB': {
      return { ...state, selectedTab: action.payload.selectedTab }
    }
    case 'HYDRATE_VISIBLE': {
      return { ...state,
        selectedFriendId: action.payload.selectedFriendId,
        allFriendsVisibility: action.payload.allFriendsVisibility,
      } // only save selectedFriendId
    }
    case 'SELECT_FRIEND': {
      return {
        ...state,
        selectedFriendId: action.payload.friendId,
        allFriendsVisibility: false,
      }
    }
    case 'FRIEND_FORM_VISIBILITY_TOGGLE': {
      return {
        ...state,
        friendFormIsVisible: !state.friendFormIsVisible,
      }
    }
    case 'SET_CREATE_GIFT_MODAL_VISIBILITY_TRUE': {
      return {
        ...state,
        createGiftModalVisibility: true,
        createEventModalVisibility: false,
      }
    }
    case 'SET_BODY_MODAL_VISIBILITY_FALSE': {
      return {
        ...state,
        createEventModalVisibility: false,
        createGiftModalVisibility: false,
      }
    }
    case 'SET_CREATE_EVENT_MODAL_VISIBILITY_TRUE': {
      return {
        ...state,
        createEventModalVisibility: true,
        createGiftModalVisibility: false,
      }
    }
    default:
      return state
  }
}
