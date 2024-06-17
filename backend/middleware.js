const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config');

function authMiddleware(req, res, next)
{
    const auth = req.headers.authorization;
    if(!auth || !auth.startsWith('Bearer '))
    {
        res.status(403).json({msg:"Invalid"});
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
            res.status(403).json({msg:"Invalid"}) 
        }
    } catch (e) 
    {
        res.status(403).json({msg:"Invalid"})    
    }
}

module.exports = authMiddleware;