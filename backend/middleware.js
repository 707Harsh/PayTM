const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config');

function authMiddleware(req, res, next)
{
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer '))
    {
        res.status(403).json({msg:"forbidden-you don't have permission to access this resource"});
    }
    const token = auth.split(' ')[1];
    try 
    {
        const decodedValue = jwt.verify(token,JWT_SECRET);
        if(decodedValue.userId)
        {
            req.userId = decodedValue.userId;
            next();
        }
        else
        {
            res.status(403).json({msg:"forbidden-you don't have permission to access this resource"}) 
        }
    } catch (e) 
    {
        res.status(403).json({msg:"forbidden-you don't have permission to access this resource"})    
    }
}

module.exports = authMiddleware;