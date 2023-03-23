'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account5 = {
  owner: 'Ionut Raducu',
  movements: [700, 1500, -300, 100000, -150],
  interestRate: 1.9,
  pin: 5555,
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__value">${mov}</div>
</div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//❗Display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const expenditure = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(expenditure)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      //console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//////

//❗ Computing USERnames
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(acc => acc[0])
      .join('');
  });
};
createUserName(accounts);

const updateUI = function (acc) {
  //Display balance
  calcDisplayBalance(acc);

  //Display summary
  calcDisplaySummary(acc);

  // Display Movements
  displayMovements(acc.movements);
};

//Event handler login
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submiting (Default Html)
  e.preventDefault();
  //Finding the account
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(' ')[0]
    } 🐧`;
    containerApp.style.opacity = 100;

    // Clear The Input User And Pin fields
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// Transfering Money

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  //creating a variable wich contain the amount
  const amount = Number(inputTransferAmount.value);
  //Creating a variable which contain the receiver and we have to find the account obj to wich
  //we want to trensfer
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    console.log('Transfer Valid');
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
let arr = ['a', 'b', 'c', 'd', 'e'];
///❗SLICE
//Does NOT mutate the original array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
//Creating a shalow copy
console.log(arr.slice()); //When we want to chain multiple methods toghether we need to use slice()
console.log([...arr]); // spread operator
console.log(arr);

//❗SPLICE
//Mutate the original array
//We use ussualy splice to delete elements from an array
//console.log(arr.splice(2));
arr.splice(-1); //Delete last element from the array
console.log(arr);
arr.splice(1, 2); // delete from position 1 to position 2
console.log(arr);

//❗REVERSE
//MUTATE the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//❗CONCAT
//DO NOT MUTATE the original array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); //spread operator

///❗JOIN
//Transform an array into a string
console.log(letters.join(' - ')); //The result it will be a string with separator that we specified

///❗ at()
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

//Getting last array element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));

//On strings
console.log('Jonas'.at(0));
console.log('Jonas'.at(-1));

///❗LOOP Over an Array using forEach() method.
const movementsBank = [100, 300, 10000, -650, -450, 700, 900];

//  ---for of---
//If we want the index also we use:
// entries() return an array of arrays wich in first position contains the index and second the value
// like this we acces the counter variable
for (const [i, mov] of movementsBank.entries()) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You Withdrew ${Math.abs(mov)}`); //with math we remove the absolute value we remove the sign -
  }
}

console.log('---forEach----');
//In forEach first is the current  element ,second is current index, third is the array.
movementsBank.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You Withdrew ${Math.abs(mov)}`); //with math we remove the absolute value we remove the sign -
  }
});
//in each callback the element it will be pass like argument.
// we use the call back function to tell forEach what to do.

///forEach on maps and sets

const monede = new Map([
  ['RON', 'Romanian Ron'],
  ['GBP', 'Lira Sterlina'],
  ['EUR', 'Euro'],
]);

///It will call this function with 3 arguments.
// 1st one it will be the current value in the current itteration
//2nd one it will be the key
//3rd one it will be the entire map wich is loop over
///Its similar to the array : 1 is element, 2 is index , 3 is the entire array
monede.forEach(function (value, key, map) {
  console.log(`${key}: ${value} `);
});

///With set
const monedeUnice = new Set(['USD', 'GBP', 'EUR', 'USD']);
console.log(monedeUnice);

// a set does NOT have keys
// and does NOT have index either
// _ throw away a variable
monedeUnice.forEach(function (value, _, map) {
  console.log(`${value}: ${value} `);
});

//////CHALANGE //////////
const julia1 = [3, 5, 2, 12, 7];
const julia2 = [9, 16, 6, 8, 3];
const kate1 = [4, 1, 15, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

///WITH SLICE METHOD
const checkDog = function (dogJulia, dogKate) {
  const dogJuliaCorrect = dogJulia.slice(1, 3);
  const dogs = dogJuliaCorrect.concat(dogKate);
  dogs.forEach(function (d, i) {
    if (d >= 3) {
      console.log(`Dog number ${i + 1} is an adult and is ${d} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

checkDog([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

///WITH  SPLICE METHOD

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrect = dogsJulia.slice();
  dogsJuliaCorrect.splice(0, 1);
  dogsJuliaCorrect.splice(-2);
  //console.log(dogsJuliaCorrect);

  const dogs = dogsJuliaCorrect.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (d, i) {
    console.log(
      d > 3
        ? `Dog number ${i + 1} is an adult and is ${d} years old`
        : `Dog number ${i + 1} is still a puppy 🐶`
    );
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

//////////🌈✅DATA TRANSFORMATION //////
///MAP,FILTER,REDUCE

//❗Map() Method.
///With map() method we dont create side effects like with forEach()

//Loops over the array and Creates a new array and return the new elements. Does not Mutate the original array
//Functional Programing
//Using methods toghether with callback function is the modern way to go.
const euroToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});

console.log(movements);
console.log(movementsUSD);

///with for of loop

const movementsUSDfor = [];

for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
console.log(movementsUSDfor);

// With Arrow
const simplifiedUSD = movements.map(mov => mov * euroToUsd);
console.log(simplifiedUSD);

const arrowMovements = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`

  //   if (mov > 0) {
  //     return `Movement ${i + 1}: You deposited ${mov}`;
  //   } else {
  //     return `Movement ${i + 1}: You Withdrew ${Math.abs(mov)}`; //with math we remove the absolute value we remove the sign -
  //   }
);

console.log(arrowMovements);

/// ❗FILTER() Method

const deposits = movements.filter(function (dep) {
  return dep > 0;
});
console.log(deposits);

const withdrawals = movements.filter(withdraw => withdraw < 0);
console.log(withdrawals);

////❗reduce() METHOD

const balance = movements.reduce(function (acc, mov, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + mov;
}, 0);
console.log(balance);
const balance2 = movements.reduce((acc, mov) => acc + mov, 0);
console.log(balance2);

let balance3 = 0;

for (const mov of movements) balance3 += mov;
console.log(balance3);

////Get The Maximum value
const getMaximum = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);
console.log(getMaximum);

const max = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
console.log(max);
////////Coding Chalenge nr2////
const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  // console.log(humanAge);
  const adultDogs = humanAge.filter(age => age >= 18);
  //console.log(adultDogs);
  // const average =
  //   adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;
  // console.log(average);
  // return average;
  const average = adultDogs.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  return average;
};
//Test Data 1: [5,2,4,1,15,8,3]  [16,6,10,5,6,1,4]
//const avg1 =
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

// Chaining Methods
//Transform Euro to Usd
const eurToUsd = 1.1;
const totatlDepositsUSD = movements
  .filter(money => money > 0)
  .map(money => money * eurToUsd)
  .reduce((acc, money) => acc + money, 0);
console.log(totatlDepositsUSD);

///chalenge 4
const calcAverageHumanAgeArrow = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]));

///❗The find() Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

for (const account of accounts) {
  if (account.owner === 'Jessica Davis') {
    console.log(account);
  }
}
