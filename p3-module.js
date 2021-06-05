/*
    CIT 281 Project 3
    Name: Julia Smith
*/

module.exports = {
    coinCount
};

/*function validDenomination(coin) {
    let valid = [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1 ? true : false;
    return valid
}*/

/*let array = [
  {
    denom: 25,
    count: 3,
  },
  {
    denom: 10,
    count: 3,
  },
  {
    denom: 5,
    count: 3,
  },
];*/

validDenomination = (coin) => {return [1, 5, 10, 25, 50, 100].indexOf(coin) !== -1 ? true : false};

function valueFromCoinObject(obj) {
  const { denom = 0, count = 0 } = obj;
    return denom * count;
}

function valueFromArray(arr) {
  let totalArray = [];
  for (let i = 0; i < arr.length; i++) {
    totalArray.push(valueFromCoinObject(arr[i]));
  }
  //console.log(totalArray);

  return totalArray.reduce((total, num) => total + num);
}

function coinCount(...coinage) {
  let coinArray = [...coinage];
  return valueFromArray(coinArray);
}

//console.log(valueFromArray(array));

/*console.log("{}", coinCount({ denom: 5, count: 3 }));
console.log("{}s", coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }));
const coins = [
  { denom: 25, count: 2 },
  { denom: 1, count: 7 }
];
console.log("...[{}]", coinCount(...coins));*/
