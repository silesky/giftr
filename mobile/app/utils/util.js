import defaultFriend from './../json/defaultFriend.json';
import { AsyncStorage } from 'react-native';
const _serverUrl = 'http://localhost:3000';


export const lipsum = 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.'
export const compose = (f1, f2) => value => f1(f2(value));
export const createUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export const getFriendById = (state, friendId) => {
    const fid = state.user.data.find(el => el.friendId === friendId);
    return (fid) ? fid : null;
}
export const getFriendItemById = (state, friendId, key) => {

    const friend = state.user.data.find(el => el.friendId === friendId);

    // my fallback return should depends on what is being asked for. 
    // null breaks the app if 
    let defItem;
    switch (key) {
        case 'gifts':
            defItem = [];
            break;
        case 'bday':
            defItem = '';
            break;
        default:
            defItem = null;
    }

    return (friend && friend.hasOwnProperty(key)) ? friend[key] : defItem;
}

export const getFriendNameById = (state, friendId) => getFriendById(state, friendId).friendName;

export const fetchPost = (route, data) => {
    const fullRoute = `${_serverUrl}/${route}`
    return fetch(fullRoute, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({ data: data }),
    })
}
export const sendFbAccessTokenToNode = (token) => {
    const fullRoute = `${_serverUrl}/api/auth/fb`;
    return fetch(fullRoute, {
        method: 'POST',
        body: JSON.stringify({token}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const saveTokenToAsyncStorage = (token) => {
    try {
        AsyncStorage.setItem('@MyStore:FbToken', token);
    } catch (error) {
        console.log(error)
    }
}
export const getTokenFromAsyncStorage = () => {
    AsyncStorage.getItem('@MyStore:FbToken').then((res, err) => {
        if (res) console.log('success.', res);
        if (err) console.log('error', err)
    })
}


