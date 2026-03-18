import session from "../models/session.js"

async function CheckSession (req, res, next){
     const cookie=req.headers.cookie || ''
     const sessionCookie = cookie.match(/sessionId=([^;]+)/)
     if (sessionCookie){
         const sessionId = sessionCookie[1]
         try {
            const userSession = await session.getSession(sessionId)
            // if(!userSession) {
            //    throw new Error({ stack: "Unauthorized access!", status: 401 });
            // }
            req.session = userSession;
            next();
            
         } catch (error) {
            next(error); 
         }
     }
     else{
         next({
            stack: "Unauthorized access!",
            status: 401,
         }); 
      }

}

export default CheckSession;