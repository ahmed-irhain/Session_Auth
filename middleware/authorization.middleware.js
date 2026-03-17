import session from "../models/session.js"

async function CheckSession (req, res, next){
     const cookie=req.headers.cookie || ''
     const sessionCookie = cookie.match(/sessionId=([^;]+)/)
     if (sessionCookie){
         const sessionId = sessionCookie[1]
         try {
            const userSession = await session.getSession(sessionId)
            if(!userSession) {
               throw new Error({ stack: "no session", status: 401 });
            }
            req.session = userSession;
            next();
            
         } catch (error) {
            // next(error)
            next({stack:"no session", status:401}) 

         }
     }
     else{
        // res.statu401).send("Unable to find user session")
        next({stack:"no session", status:401}) 
      }

}

export default CheckSession;