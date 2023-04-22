const app = require("./app");


app.default.listen(process.env.PORT, () =>{
    console.log(`Listening on port ${process.env.PORT}`);
});