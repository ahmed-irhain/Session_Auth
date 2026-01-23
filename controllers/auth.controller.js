import authService from '../services/auth.service.js';

export async function signUp(req, res) {
    const { name, email, password } = req.body; 
    email.toLowerCase();
    name.toLowerCase();
    try {
        await authService.SignUp(name, email, password);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error registering user' });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    email.toLowerCase();
    try {
        const isValid = await authService.Login(email, password);
        if (isValid) {
            res.status(200).send({ message: 'Login successful' });
        } else {
            res.status(401).send({ error: 'Invalid credentials' });
        }
    } catch (error) {
        throw new Error('Error during login');
    }
}