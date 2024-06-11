const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const mainRouter = require('./routes/index')
app.use('/api/v1', mainRouter)  
// above two lines means, all the requests starting with /api/v1 will be handeled by the router defined in the routes folder.

app.listen(3000,(err)=>{
    if(err) console.log(err);
    console.log("Server listening on PORT ", 3000);
});
