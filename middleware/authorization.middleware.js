import session from "../models/session.js"

function CheckSession (req, res, next){
     const cookie=req.headers.cookie
     const userSessionId = cookie.split('=')[1]
    //  const userSessionId = cookie.match(/sessionId=([^;]+)/)[1]
     const userSession = session.getSession(userSessionId)
     if(userSession){
        req.session = userSession;
        next();
     }
     else{
        res.status(401).send("Unable to find user session")
     }

}

export default CheckSession;