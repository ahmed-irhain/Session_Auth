import authService from '../services/auth.service.js';
import session from '../models/session.js';

export async function signUp(req, res) {
    const { name, email, password } = req.body; 
    try {
        await authService.SignUp(name.toLowerCase(), email.toLowerCase(), password);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(error.status || 500).send({ error: 'Error registering user' , details: error.message });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    try {
        const isValid = await authService.Login(email.toLowerCase(), password);
        if (isValid) {
            const cookie=req.headers.cookie || ''
            const userSessionCookie = cookie.match(/sessionId=([^;]+)/)
            if (userSessionCookie){
                const userSessionId = userSessionCookie[1]
                const userSession = session.getSession(userSessionId) // if we use real db, this must be asynchronized
                if(userSession){
                    return res.status(200).send({ message: 'Login successful' })
                }
            }
            try {
                const sessionId = await session.createSession(email.toLowerCase())
                return res.setHeader('Set-Cookie', `sessionId=${sessionId}; httpOnly; Path=/; Max-Age=30`
                ).status(200).send({ message: 'Login successful' });
                
            } catch (error) {
                throw error;
            }
            
        } else {
            res.status(401).send({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(error.status || 500).send({ error: 'Error during login' });
    }
}

export default { signUp, login };