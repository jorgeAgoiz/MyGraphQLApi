import express from "express";

const app = express();

const sum = (num1: number, num2: number): number => num1 + num2;

app.get("/", (req, res) => {
  console.log(sum(12, 6));
  res.send("Hello World!!");
});

app.listen(3000, () => {
  console.log("listening in port 3000...");
});
