//Adding of Dependencies
const express = require("express")
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


//This is the Router Connect
const userregistrationRouter = require("./Routers/userRouter")


//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));



//MongoDB Database Connection goes here
mongoose.connect(process.env.DATABASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Successfuly")
}).catch(() => {
    console.log("Opps!!! Error in Connection");
})

//This is routes for all my requests
app.use("/api/v1/registration", userregistrationRouter)


app.get("/", (req, res) => {
    res.send("Skye Wallet Application");
})





app.use('/uploads', express.static('uploads'))
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`We are running on port ${port}`);
})
