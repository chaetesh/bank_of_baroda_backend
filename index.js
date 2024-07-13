const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/predict", (req, res) => {
  const { annual_income, credit_score } = req.body;

  const process = spawn("python", ["predict.py", annual_income, credit_score]);

  process.stdout.on("data", (data) => {
    res.json({ predicted_investment: data.toString() });
  });

  process.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  process.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
