import authService from "../services/auth.service.js";
import session from "../models/session.js";

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    await authService.SignUp(name.toLowerCase(), email.toLowerCase(), password);
    res.status(201).send({ message: "User registered successfully" });
}

export async function login(req, res) {
    const { email, password } = req.body;
    await authService.Login(email.toLowerCase(), password);
    const cookie = req.headers.cookie || "";
    const userSessionCookie = cookie.match(/sessionId=([^;]+)/);
    if (!userSessionCookie) {
        const sessionId = await session.createSession(email.toLowerCase());
        return res
            .setHeader(
                "Set-Cookie",
                `sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=30`,
            )
            .status(200)
            .send({ message: "Login successful" });

    }
    const userSessionId = userSessionCookie[1];
    const userSession = await session.getSession(userSessionId);
    if (userSession) {
        return res.status(200).send({message:"already logged in"});
    }
}

async function logout(req, res) {
    const cookie = req.headers.cookie || "";
    const userSessionCookie = cookie.match(/sessionId=([^;]+)/);
    if (userSessionCookie) {
        const userSessionId = userSessionCookie[1];
        await session.deleteSession(userSessionId);
        return res.status(200).send({ message: "signed out successfully!" });
    }
    throw ({stack: "Session not found", status: 400})
}
export default { signUp, login, logout };
