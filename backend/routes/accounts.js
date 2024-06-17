const express = require('express');
const authMiddleware = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');
const { schema4 } = require('../types');

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleware, async(req,res)=>
{
    const account = await Account.findOne({userId: req.userId});
    res.status(200).json({balance:account.balance});
})

accountRouter.post('/transfer', authMiddleware, async(req,res)=>
{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
    
        const body = req.body;
        const parsedBody = schema4.safeParse(body);
        if(!parsedBody.success)
        {
            return res.status(422).json({msg:"Invalid inputs"});
        }
        const to = body.to;
        const amount = body.amount;
        const senderAccount = await Account.findOne({userId:req.userId}).session(session);
    
        if(!senderAccount || (senderAccount.balance < amount))
        {
            await session.abortTransaction();
            return res.status(400).json({msg:"Insufficient balance"});
        }
    
        const receiverAccount = await Account.findOne({userId:to}).session(session);
    
        if(!receiverAccount)
        {
            await session.abortTransaction();
            res.status(400).json({msg:"Invalid account"});
        }
    
        await Account.updateOne({userId:req.userId}, { $inc : { balance : -amount } }).session(session);
        await Account.updateOne({userId:to}, { $inc : { balance : amount } }).session(session);
    
        await session.commitTransaction();
        res.status(200).json({msg:"Transfer successful"});
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({msg:"Internar server error or invalid inputs"});
    }
    finally { 
        session.endSession();
    }
})

accountRouter.use((err, req, res, next) => {
    // response to user with 403 error and details
    res.status(403).json({msg:"Some error occured"});
    console.log(err);
});

module.exports = accountRouter;