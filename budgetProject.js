const transactions = [];
let id = 1;

function addTransaction({
  amount,
  type,
  description,
  flow,
  date = new Date(),
}) {
  const transaction = {
    id: id++,
    amount,
    date,
    type,
    description,
    flow,
  };

  transactions.push(transaction);
}
// Income here
addTransaction({
  amount: 8000,
  type: "income",
  description: "of Dec and Jan",
  flow: "cash",
  date: new Date("2026/01/18"),
});

addTransaction({
  amount: 2000,
  type: "income",
  description: "loan",
  flow: "bank",
  date: new Date("2026/01/18"),
});

// Expenses start here

addTransaction({
  amount: 360,
  type: "expense",
  description: "momo",
  flow: "cash",
  date: new Date("2026/01/21"),
});

addTransaction({
  amount: 280,
  type: "expense",
  description: "momo",
  flow: "bank",
  date: new Date("2026/01/22"),
});

addTransaction({
  amount: 200,
  type: "expense",
  description: "pool",
  flow: "cash",
  date: new Date("2026/01/22"),
});

console.log(transactions);

// calculate income and expense

function calculateTotal(type, flow, dateFrom, dateTo) {
  const total = transactions
    .filter((t) => t.date >= dateFrom && t.date <= dateTo)
    .filter((t) => t.type.toLowerCase() === type)
    .filter((t) => t.flow.toLowerCase() === flow)
    .reduce((acc, curr) => {
      return (acc += curr.amount);
    }, 0);

  return total;
}

// function to show the summary of income and expense

function displaySummary(dateFrom, dateTo) {
  const incomeCash = calculateTotal(
    "income",
    "cash",
    new Date(dateFrom),
    new Date(dateTo),
  );

  const incomeBank = calculateTotal(
    "income",
    "bank",
    new Date(dateFrom),
    new Date(dateTo),
  );

  const expenseCash = calculateTotal(
    "expense",
    "cash",
    new Date(dateFrom),
    new Date(dateTo),
  );
  const expenseBank = calculateTotal(
    "expense",
    "bank",
    new Date(dateFrom),
    new Date(dateTo),
  );

  console.log(`
    Cash Income: ${incomeCash}
    Bank Income: ${incomeBank}
    Cash Expense:${expenseCash}
    Bank Expense:${expenseBank}

    Balance in cash:${incomeCash - expenseCash}
    Balance in bank:${incomeBank - expenseBank}
    Total Balance:${incomeCash + incomeBank - expenseCash - expenseBank}
    `);
}
displaySummary("2026/01/01", "2026/03/01");

// function to delete transaction based on id
function deleteTransaction(id) {
  const index = transactions.findIndex((t) => t.id === id);
  transactions.splice(index, 1);
}
// deleteTransaction(3);
