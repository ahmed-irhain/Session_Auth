import crypto from 'crypto';
const session = {};

function createSessionID() {
    return crypto.randomBytes(16).toString('hex');
}

function createSession(id, email){
    session[id] = {
        email: email
    };
}

function getSession(id){
    return session[id]
}

function deleteSession(sessionID){
   delete session.sessionID
}

export default {
    createSessionID,
    createSession,
    deleteSession,
    getSession
}