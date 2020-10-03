const fs = require("fs");
var content = fs.readFileSync("dollar.tsv", "utf8").split("\r\n");

let X = [];
let Y = [];
let totalPoints = 0;
let NumberMeanOfXandY = 0;
let c = 0;

content.map((Data) => {
  var XandY = Data.split("\t");
  X.push(parseInt(XandY[0]));
  Y.push(parseInt(XandY[1]));
  totalPoints++;
});

totalPoints = totalPoints - 1;
X.pop();
Y.pop();

let SumX = 0;
let Sumy = 0;
let XiYi = 0;
let XSquaredSum = 0;

for (let index = 0; index < X.length; index++) {
  // Find n * average(X) *(Y)
  SumX = SumX + X[index];
  Sumy = Sumy + Y[index];
  XiYi = XiYi + X[index] * Y[index];
  XSquaredSum = XSquaredSum + X[index] * X[index];
}

let averageX = SumX / X.length;
let averageY = Sumy / Y.length;

NumberMeanOfXandY = totalPoints * averageX * averageY;
///// //////////

let NumberMeanXSquared = totalPoints * averageX * averageX;

console.log("X elements", X);
console.log("Y elements", Y);
console.log(`X and Y lenghts are ${X.length} and ${Y.length}`);
console.log("Total points are", totalPoints);
console.log("Sum of X is", SumX);
console.log("Sum of Y is", Sumy);
console.log("AverageX is", averageX);
console.log("AverageY is", averageY);
console.log("XiYi", XiYi);
console.log("nMeanXSquared", NumberMeanXSquared);
console.log("Xsquared Sum", XSquaredSum);

console.log("NumberMeanProductXAndY", NumberMeanOfXandY);

let Denominator = XSquaredSum - NumberMeanXSquared;

console.log("Denominator", Denominator);

let m = (XiYi - NumberMeanOfXandY) / (XSquaredSum - NumberMeanXSquared);
c = averageY - m * averageX;

console.log("/////////////////////////////////");
console.log("dollar.tsv");
console.log("/////////////////////////////////");
console.log(`M slope is ${m}`);
console.log(`C Y-intercept is ${c}`);

let PredictedArray = [];

for (let index = 0; index < X.length; index++) {
  PredictedArray.push(m * X[index] + c);
}

console.log("Predicted Y is......");
for (let index = 0; index < PredictedArray.length; index++) {
  console.log(PredictedArray[index]);
}

let ErrorArray = [];

for (let index = 0; index < Y.length; index++) {
  ErrorArray.push(PredictedArray[index] - Y[index]);
}

for (let i = 0; i < ErrorArray.length; i++) {
  ErrorArray[i] = ErrorArray[i] * ErrorArray[i];
}

console.log("Squared Error Y is......");
for (let index = 0; index < ErrorArray.length; index++) {
  console.log(ErrorArray[index]);
}

let MSE = 0;

for (let index = 0; index < ErrorArray.length; index++) {
  MSE += ErrorArray[index];
}
MSE = MSE / ErrorArray.length;

var data =
  `Dollar.tsv....` +
  "\r\n" +
  ` M slope is ${m}...` +
  "\r\n" +
  ` Y-intercept is ${c}...` +
  "\r\n" +
  ` MSE is ${MSE}........................................` +
  "\r\n" +
  "\r\n";

fs.appendFileSync("Output.txt", data, "utf-8");

console.log("/////////////////////////////////");
console.log("dollar.tsv");
console.log("/////////////////////////////////");
console.log(`M slope is ${m}`);
console.log(`C Y-intercept is ${c}`);
console.log("MSE is ", MSE);
