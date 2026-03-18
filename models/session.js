import crypto from 'crypto';
import redis from '../config/redis.js';

function generateSessionId() {
    return crypto.randomBytes(16).toString('hex');
}

async function createSession(email){
    const sessionId = generateSessionId()
    try{
        await redis.set(`session:${sessionId}`, email, "EX",30)
        return sessionId;
    }
    catch (err){
        throw new Error({stack: "Error storing user session", details: err});
    }
}

async function getSession(sessionId){
    try {
        const session = await redis.get(`session:${sessionId}`)
        return session;
        
    } catch (error) {
        throw new Error({stack:"Unathourized access", status: 401})
    }
}

async function deleteSession(sessionID){
   try{
    const response = await redis.del(`session:${sessionID}`)
    if (response === 0){
        throw new Error("already signed out")
    }
   }catch (err){
    throw new Error({stack:"Failed at signing out", status:500, details:err});
   }
}

export default {
    createSession,
    deleteSession,
    getSession
}