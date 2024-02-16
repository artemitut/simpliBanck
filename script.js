'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2024-01-22T15:21:20.814Z',
    '2024-02-14T07:43:59.331Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

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
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatTransactionDate = function (date, locale) {
  const getDaysBetween2Days = (date1, date2) =>
    Math.round(Math.abs((date1 - date2) / 1000 / 60 / 60 / 24));

  const daysPast = getDaysBetween2Days(new Date(), date);
  console.log(daysPast);

  if (daysPast === 0) {
    return 'today';
  }
  if (daysPast === 1) {
    return 'yesterday';
  }
  if (daysPast <= 7) {
    return `${daysPast} days ago`;
  } else {
    return new Intl.DateTimeFormat(locale).format(date);
  }

  // const day = `${date.getDate()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayTransaction = function (account, sort = false) {
  containerTransactions.innerHTML = '';

  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);

    // const formatedTrans = new Intl.NumberFormat(account.locale, {
    //   style: 'currency',
    //   currency: account.currency,
    // }).format(trans);

    const formatedTrans = formatCurrency(
      trans,
      account.locale,
      account.currency
    );

    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
        ${index + 1} ${transType}
      </div>
      <div class="transactions__date">${transDate}</div>
      <div class="transactions__value">${formatedTrans}</div>
    </div>
    `;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};
// displayTransaction(account1.transactions);

const createNicknames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createNicknames(accounts);
// console.log(accounts);

const userName = 'Oliver Avila'; // nickname = 'oa'

const nickname = userName
  .toLocaleLowerCase()
  .split(' ')
  .map(word => word[0])
  .join('');
// console.log(nickname);

const displatBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  labelBalance.textContent = `${formatCurrency(
    balance,
    account.locale,
    account.currency
  )}`;
  account.balance = balance;
};

// displatBalance(account1.transactions);

const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `${formatCurrency(
    depositesTotal,
    account.locale,
    account.currency
  )}`;
  const withdrawalTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = `${formatCurrency(
    withdrawalTotal,
    account.locale,
    account.currency
  )}`;
  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100)
    .filter((interest, index, arr) => {
      // console.log(arr);
      return interest >= 5;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${formatCurrency(
    interestTotal,
    account.locale,
    account.currency
  )}`;
};

// displayTotal(account1.transactions);

let currentAccount, currentLogOutTimer;

const updateUi = function (currentAccount) {
  // Display transactions
  displayTransaction(currentAccount);

  // Display balance
  displatBalance(currentAccount);

  //Display total
  displayTotal(currentAccount);
};

const startLogoutTimer = function () {
  // Set exit time to 5 minutes
  let time = 300;
  const logoutTimerCallback = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(time % 60).padStart(2, '0');
    // Show remeining time of every call in UI
    labelTimer.textContent = `${minutes}:${sec}`;

    // If timer has expired exit the application
    if (time === 0) {
      clearInterval(logoutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Login to your account';
    }
    time--;
  };

  // Call timer every second
  logoutTimerCallback();
  const logoutTimer = setInterval(logoutTimerCallback, 1000);

  return logoutTimer;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('Hi');

    // Clear input
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display UI and welcome message
    labelWelcome.textContent = `We are glad that you are with us again ${
      currentAccount.userName.split(' ')[0]
    }`;

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // labelDate.textContent = `${day}/${month}/${year}`;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
      weekday: 'long',
    };
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    containerApp.style.opacity = 100;
    // Chek if the timer exists
    if (currentLogOutTimer) clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;

  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  const recipientAccount = accounts.find(
    account => account.nickname === recipientNickname
  );
  console.log(transferAmount);
  console.log(recipientAccount);
  if (
    transferAmount > 0 &&
    recipientAccount &&
    currentAccount.balance >= transferAmount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    // Add transaction
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    // Add date
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccount.transactionsDates.push(new Date().toISOString());

    // Reset timer
    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();

    updateUi(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseNickname.value === currentAccount.nickname &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );
    accounts.splice(currentAccountIndex, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseNickname.value = '';
  inputClosePin.value = '';
  labelWelcome.textContent = 'Login to your account';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.ceil(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans > loanAmount * 0.1)
  ) {
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date().toISOString());
      updateUi(currentAccount);
    }, 5000);
  }
  console.log(currentAccount);
  inputLoanAmount.value = '';

  // Reset timer
  clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
});

let transactionsSorted = false;
btnSort.addEventListener('click', function (e) {
  transactionsSorted = !transactionsSorted;
  e.preventDefault();
  displayTransaction(currentAccount, transactionsSorted);
});

// // Array.from() example
// const logoImage = document.querySelector('.logo');
// logoImage.addEventListener('click', function () {
//   // const transactionsUi = document.querySelectorAll('.transactions__value');
//   // const transactionsUiArray = Array.from(transactionsUi);
//   // console.log(transactionsUiArray.map(elem => Number(elem.textContent)));
//   // console.log(transactionsUiArray);
//   //////////////////////////////
//   const transactionsUi = document.querySelectorAll('.transactions__value');
//   const transactionsUiArray = Array.from(transactionsUi, elem =>
//     Number(elem.textContent)
//   );
//   console.log(transactionsUiArray);
// });

const logoImage = document.querySelector('.logo');
logoImage.addEventListener('click', function () {
  [...document.querySelectorAll('.transactions__row')].forEach(function (
    row,
    i
  ) {
    if (i % 2 === 0) {
      row.style.backgroundColor = '#fbfbfb';
    }
  });
});

// Always logged in
// currentAccount = account1;
// containerApp.style.opacity = 100;
// updateUi(currentAccount);
