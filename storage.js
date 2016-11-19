const MongoClient = require('mongodb').MongoClient;
let db;
const userCollection = () => db.collection('userCollection');
module.exports = {
    connect: () => {
        MongoClient.connect('mongodb://127.0.0.1:27017/giftr', (err, database) => {
            if (err) throw err;
            console.log('...connected to mongoDB!');
            db = database;
            return db
        });
    },
    connected: () => typeof database !== 'undefined',
    // get all
    getAllData: (res) => {
        userCollection().find().toArray((err, docs) => {
            res.json(docs);
        });
    },
    // create user
    // temp? for debugging
    createUser: ({body: {userName, googleIdToken, data}}, res) => {
        console.log('post request to create user...');
        const userObj = {
            userName: userName,
            fbAccessToken: null,
            googleIdToken: googleIdToken,
            data: data,
        }
        try {
            userCollection().insert(userObj);
            res.json({
                success: true,
                msg: 'user created'
            })
        } catch (e) {
            res.json({
                success: false,
                error: e
            })
        }
    },
    createUserFromGoogle: ({userName, googleIdToken}, res) => {
        console.log('create user from google!');
        const userObj = {
            userName: userName,
            fbAccessToken: null,
            googleIdToken: googleIdToken,
            data: [],
        }
        try {
            userCollection().insert(userObj);
            res.json({
                success: true,
                msg: 'user created'
            })
        } catch (e) {
            res.json({
                success: false,
                error: e
            })
        }
    },
     createUserFromFb: ({userName, fbAccessToken}, res)  => {
        console.log('storage.createUserFromFb()');
        const userObj = {
            userName: userName,
            fbAccessToken: fbAccessToken,
            googleIdToken: null,
            data: []
        }
        try {
            //check if user exists with access
            userCollection().insert(userObj);
            res.json({
                success: true,
                msg: 'user created',
                payload: userObj

            })
        } catch (e) {
            res.json({
                success: false,
                error: e
            })
        }
    },
  
    // get user by token
    getUserByAccessToken: ({params: {token}}, resCb) => {
        console.log('getUserByAccessToken() checking database for user...');
        let results;
        userCollection().find().toArray((err, docs) => {
            results = docs.find(el => token === el.fbAccessToken);
            if (err) {
                if (err) console.warn('error!', err)
                resCb.json({success: false, message: 'some error', error: err})
            } 
            else if (results) {
                console.log('results found!', results)
                resCb.json({success: true, data: results});
            } else {
                console.log(' no user found!', results)
                resCb.json({success: false, message: 'Unable to return user. No user found with that access token.'})
            }
            
        })
    },
    // get userData by fBAccessToken 
    getUserDataByAccessToken: (reqObj, res) => {
        console.log('getUserDataByAccessToken()...');
        let results;
        let requestedIdToken = reqObj.params.token;
        userCollection().find().toArray((err, docs) => {
             results = docs.find(el => requestedIdToken === el.fbAccessToken);
            if (err) { 
                res.json({success: false, message: 'mongo error', error: err })
            } else if (results) {
                res.json({success: true, data: results['data']});
            } else {
                 res.json({success: false, message: 'Unable to return user data. No user found with that access token.'})
            }
        })
    },
    //update user data by token
    //db.userCollection.update({fbAccessToken: 1},{ $set: {'data': ["hello"]}})

    updateUserDataByAccessToken: (reqObj, res) => {
        const { data } = reqObj.body;
        const { token } = reqObj.params;
        console.log(data, token)
        console.log('updateUserData called... token->', token, 'data->', data);
    
        const _writeConcernCb = (err, {
            result
        }) => {
            if (err || !result.nModified) {
                res.json({
                    success: false,
                    statusText: 'error or 0 rows modified',
                    msg: result,
                })
            } else {
                res.json({
                    success: true,
                    msg: result,
                    statusText: `success. ${result.nModified} row(s) modified`
                })
            }  
        }
        // TODO: take in fbAccessToken and data as params
        userCollection().update({fbAccessToken: token},{ $set: {'data': data}}, _writeConcernCb)
        // checks if access token is either googleor facebook
    },

}