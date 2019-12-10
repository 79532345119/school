let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expenses_1 = document.getElementsByClassName('expenses-item')[0],
    expenses_2 = document.getElementsByClassName('expenses-item')[1],
    expenses_3 = document.getElementsByClassName('expenses-item')[2],
    expenses_4 = document.getElementsByClassName('expenses-item')[3],

    expensesItemBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
   
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    optionalexpenses_1 = document.querySelectorAll('.optionalexpenses-item')[0],
    optionalexpenses_2 = document.querySelectorAll('.optionalexpenses-item')[1],
    optionalexpenses_3 = document.querySelectorAll('.optionalexpenses-item')[2],


    income = document.querySelector('#income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('#sum'),
    percentValue = document.querySelector('#percent'),

    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

    
let money, time;


startBtn.addEventListener('click', function() {
    appData.programIsStarted = true;
    time = prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
   }
   appData.budget = money;
   appData.timeData = time;
   budgetValue.textContent = money.toFixed();
   yearValue.value = new Date(Date.parse(time)).getFullYear();
   monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
   dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener('click', function() {
    let summ = 0;
    if (appData.programIsStarted == true) 
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
    
        if ( typeof(a)==='string' && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50) {
    
            console.log ("done");
    
            appData.expenses[a] = b;
            summ += +b;
        } else {
            console.log ("bad result");
            i--;
        }
    
    }
    expensesValue.textContent = summ;
});

optionalExpensesBtn.addEventListener('click', function() {  
        for (let i = 0; i < optionalexpensesItem.length; i++) {
            let opt = optionalexpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalexpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        }
});

countBudgetBtn.addEventListener('click', function() {
    if (appData.budget != undefined) {
    appData.moneyPerDay = (appData.budget / 30).toFixed();
    daybudgetValue.textContent = appData.moneyPerDay;
    if (appData.moneyPerDay < 100) {
        levelValue.textContent = "Это минимальный уровень достатка!";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        levelValue.textContent = "Это средний уровень достатка!";
    } else if (appData.moneyPerDay > 2000) {
        levelValue.textContent = "Это высокий уровень достатка!";
    } else {
        levelValue.textContent = "Ошибочка...!";
    }
} else {
    daybudgetValue.textContent = "Произошла ошибка!";
};
});
income.addEventListener('input', function() { // если поставить change, вместо input будет меняться при изменении
    let items = income.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true && appData.programIsStarted == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});
sumValue.addEventListener('input', function() {
    if (appData.savings == true && appData.programIsStarted == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
})
percentValue.addEventListener('input', function() {
    if (appData.savings == true && appData.programIsStarted == true) {
        let sum = +sumValue.value;
        let percent = +percentValue.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;
        monthsavingsValue.textContent = appData.monthIncome.toFixed(2);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
})


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    programIsStarted: false,
    }




   