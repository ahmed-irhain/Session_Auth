import crypto from 'crypto';
const session = {};

function createSessionID() {
    return crypto.randomBytes(16).toString('hex');
}

function createSession(email){
    return session[createSessionID] = {
        email: email
    };
}

function deleteSession(sessionID){
   delete session.sessionID
}