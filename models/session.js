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
        throw err;
    }
}

async function getSession(sessionId){
    try {
        const session = await redis.get(`session:${sessionId}`)
        return session;
        
    } catch (error) {
        throw new Error("No session stored")
    }
}

async function deleteSession(sessionID){
   try{
    await redis.del(`session:${sessionID}`)
   }catch (err){
    throw new Error("No session stored", err);
   }
}

export default {
    createSession,
    deleteSession,
    getSession
}