const fs = require("fs");
var content = fs.readFileSync("houseSales.tsv", "utf8").split("\r\n");

let X = [];
let Y = [];
let totalPoints = 0;
content.map((Data) => {
  var XandY = Data.split("  ");
  X.push(parseFloat(XandY[0]));
  Y.push(parseFloat(XandY[1]));
  totalPoints++;
});

totalPoints = totalPoints - 1;
X.pop();
Y.pop();

console.log("X elements", X);
console.log("Y elements", Y);
console.log("Total Points", totalPoints);

// Predicted = mx[i] + C
// Slope-values [0.00-0.50] Increment: 0.01

let PredictedArray = [];
let ErrorArray = [];
let M = 0;
let C = -10;

for (let index = 0; index < X.length; index++) {
  PredictedArray.push(M * X[index] + C);
  M = M + 0.01;
  C = C + 0.05;
}

console.log("Predicted lenght is", PredictedArray.length);
console.log("Predicted Y is......");
for (let index = 0; index < PredictedArray.length; index++) {
  console.log(PredictedArray[index]);
}

// Error += (Y[i] - Predicted[i])²
for (let index = 0; index < PredictedArray.length; index++) {
  ErrorArray.push(
    (Y[index] - PredictedArray[index]) * (Y[index] - PredictedArray[index])
  );
}

console.log("Error Array is......");
for (let index = 0; index < ErrorArray.length; index++) {
  console.log(ErrorArray[index]);
}

let sum = 0;

for (let index = 0; index < ErrorArray.length; index++) {
  sum += ErrorArray[index];
}
let meanSquareErrorArray = sum / ErrorArray.length;
console.log("Error Array Mean Square is is......", meanSquareErrorArray);

let least = meanSquareErrorArray;
console.log("Old LEAST IS ", least);

// Predicted = mx[i] + C
// Error += (Y[i] - Predicted[i])²
let NewPredictedArray = [];
let newMeanSquareError = 0;
let newM = 0;
let newC = 0;
let lenghtNewMeanSquareError = 0;
let PredictedY = 0;
let Error = 0;
// new error
//M
// stream

var out = fs.createWriteStream("HouseSalesReportdata.txt", { flags: "a" });

for (let indexM = 0; indexM < 0.5; indexM += 0.01) {
  //C
  for (let indexC = -10; indexC < 10; indexC += 0.05) {
    //X
    for (let indexX = 0; indexX < X.length; indexX++) {
      //Y = M * X[i] + C
      PredictedY = indexM * X[indexX] + indexC;
      Error += (PredictedY - Y[indexX]) * (PredictedY - Y[indexX]);
      
    }
    newMeanSquareError = Error / X.length;
    let M = indexM.toFixed(2);
    let C = indexC.toFixed(2);
    let MSE = newMeanSquareError.toFixed(2);
    let data = `M Slope : ${M}  C Intercept : ${C} MSE : ${MSE} \r\n`;
    out.write(data, "utf-8");

    if (least > newMeanSquareError) {
      least = newMeanSquareError;
      newC = indexC;
      newM = indexM;
    }
    Error = 0;
  }
}


let data = `NEW M Slope : ${newM}  NEW C Intercept : ${newC} NEW MSE : ${least} \r\n`;
out.write(data, "utf-8");

out.end();
