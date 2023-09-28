const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {PostRouter} = require("./routes/post.route")
const {userRouter} = require("./routes/user.route")
const app = express();
app.use(express.json());
app.use(cors());



const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ka5452488:mongodb123@cluster0.10yjjlt.mongodb.net/lastmockdata?retryWrites=true&w=majority"
    );
    console.log("connected");
  } catch {
    console.log(console.error);
  }
};

app.use("/users", userRouter)
app.use("/blogs", PostRouter);

app
const PORT = 4040;
app.listen(PORT, ()=>{
    connect();
    console.log(`server is running ${PORT}`)
})