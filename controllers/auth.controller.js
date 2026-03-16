import authService from '../services/auth.service.js';
import session from '../models/session.js';

export async function signUp(req, res) {
    const { name, email, password } = req.body; 
    email.toLowerCase();
    name.toLowerCase();
    try {
        await authService.SignUp(name, email, password);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(error.status || 500).send({ error: 'Error registering user' , details: error.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    email.toLowerCase();
    try {
        const isValid = await authService.Login(email, password);
        if (isValid) {

            const sessionId = session.createSessionID()
            session.createSession(sessionId, email)
            return res.setHeader('Set-Cookie', `sessionId=${sessionId}; httpOnly; Path=/; Max-Age=15000`).status(200).send({ message: 'Login successful' });
            
        } else {
            res.status(401).send({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(error.status || 500).send({ error: 'Error during login' });
    }
}

export default { signUp, login };