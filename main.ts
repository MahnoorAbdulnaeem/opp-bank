#! usr/bin/env node


import inquirer from "inquirer"

// Bank Account interface
interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(account: number): void
    deposit(account: number): void
    checkBalance(): void
}

// Bank Account class
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;
    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber
        this.balance = balance

    }


    // Debit money
    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawel of${amount} successful. Remaining balance:${this.balance}`);
        } else {
            console.log("Insufficient balance.");
        }
    }

    // Credit money
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        } this.balance += amount;
        console.log(`Deposit of ${amount} successful. Remaining balance: $${this.balance}`);
    }

    // check Balance
    checkBalance(): void {
        console.log(`Current balnce:$${this.balance}`);
    }
}

// Customer class
class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount,) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}


// create bank accounts

const accounts: BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
]

// Create customers

const customers: Customer[] = [
    new Customer("Ahmed", "khan", "Male", 35, 3162223334, accounts[0]),
    new Customer("mahnoor", "quershi", "Female", 19, 3332223334, accounts[1]),
    new Customer("ali", "khan", "Male", 33, 3412223334, accounts[2]),
]

// function to interact with bank account

async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if (customer) {
            console.log(`Welcome,${customer.firstName}${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{

                name: "select",
                type: "list",
                message: "select an operation",
                choices: ["Desposit", "Withdraw", "Check Balnce", "Exit"]

            }]);

            switch (ans.select) {
                case "Desposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount)
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Withdraw:"
                    })
                    customer.account.withdraw(withdrawAmount.amount)
                    break;
                case "Check Balnce":
                    customer.account.checkBalance();
                    break;

                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our  bank services. Have a great day!");
                    return;
            }


        } else {
            console.log("Invalid account number.Please try again.");
        }

    } while (true)
}


service()
