const express = require('express');
const {schema1, schema2, schema3} = require('../types');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');


const userRouter = express.Router();

userRouter.post('/signup',async (req, res)=>
{
    const user = req.body;
    const parsedUser = schema1.safeParse(user);
    if(!parsedUser.success)
    res.status(411).json({
        msg:"Invalid inputs"
    })
    else
    {
        const existingUser = await User.find({userName : user.username});
        // console.log(existingUser);
        if(existingUser.length != 0)
        {
            return res.status(411).json({
                msg:"This email is already taken"
            })
        }

        const newUser = await User.create({
            userName : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            password : user.password
        }) 

        /// Create new account ------

        await Account.create({
            userId : newUser._id,
            balance : 1 + Math.random()*10000
        })

        /// -------------------------

        const token = jwt.sign({"userId":newUser._id},JWT_SECRET);
        res.status(200).json({
            msg:"User created successfully",
            token:token
        })
    }
})

userRouter.post('/signin', async (req,res)=>
{
    const user = req.body;
    const parsedUser = schema2.safeParse(user);
    if(!parsedUser.success)
    {
        return res.status(411).json({
            msg:"Invalid inputs"
        })
    }
    const existingUser = await User.findOne({userName : user.username});
    if(existingUser)
    {
        if(user.password != existingUser.password)
        return res.status(411).json({msg:"Invalid username or password !"});
        else
        {
            const token = jwt.sign({"userId":existingUser._id},JWT_SECRET);
            res.status(200).json({token:token});
        }
    }
    else
    {
        return res.status(411).json({
            msg:"Invalid username or password !"
        })
    }
})

userRouter.put('/update', authMiddleware, async(req,res)=>
{
    const body = req.body;
    const parsedBody = schema3.safeParse(body);
    if(!parsedBody.success)
    {
        return res.status(411).json({msg:"Error while updating information"})
    }
    else
    {
        // if(body.password)
        // {
        //     await User.updateOne({
        //         _id : req.userId
        //     },{
        //         password : body.password
        //     })
        // }
        // if(body.firstName)
        // {
        //     await User.updateOne({
        //         _id : req.userId
        //     },{
        //         firstName : body.firstName
        //     })
        // }
        // if(body.lastName)
        // {
        //     await User.updateOne({
        //         _id : req.userId
        //     },{
        //         lastName : body.lastName
        //     })
        // }

        await User.updateOne({_id:req.userId},body);
        res.status(200).json({msg:"Updated successfully"})
    }
})

userRouter.get('/bulk', async (req, res)=>
{
    const filter = req.query.filter || "";
    const users = await User.find({
        '$or':[{
            firstName : {
                '$regex' : filter,
                '$options' : 'i'
            }
        },{
            lastName : {
                '$regex' : filter,
                '$options' : 'i'
            }
        }]
    })
    // through the above query if the user types 'har' in the searchbox then all the users which are having 'har' anywhere in their firstname or lastname will get added to the users array

    res.status(200).json({
        users: users.map((user)=>{return{
            username : user.userName,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }})
    })
})

module.exports = userRouter;