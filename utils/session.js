import crypto from 'crypto';
const session = {};

function createSessionID() {
    return crypto.randomBytes(16).toString('hex');
}