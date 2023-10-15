require('dotenv').config();
const db = require("./config/db");
const cors = require("cors");
const app = require("express")();
const port = 3000;
const pageRouter = require("./routes/pages/route");

app.use(cors());
app.use("/pages", pageRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});