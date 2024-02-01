const FileSystem = require("./FileSystem");

module.exports = class Account {
  constructor(name) {
    this.#name = name;
  }
  // private variables for the class Account ONLY!
  #name
  #balance
  // we are only allowing the user to GET the name - the user cannot change the name as there is no SET
  get name() {
    return this.#name;
  }
  // we are only allowing the user to GET the balance - the user cannot change the amount as there is no SET
  get balance() {
    return this.#balance;
  }
  // shorthand for the file
  get filePath() {
    return `accounts/${this.#name}.txt`
  }
  // loading in the balance
  async #load() {
    this.#balance = parseFloat(await FileSystem.read(this.filePath));
  }
  // depositing funds - we add money to the account
  async deposit(amount) {
    await FileSystem.write(this.filePath, this.#balance + amount)
    this.#balance = this.#balance + amount
  }
  // withdrawing funds - we remove money from the account
  async withdraw(amount) {
    if (this.balance < amount) {
      throw new Error()
    } else {
      await FileSystem.write(this.filePath, this.#balance - amount)
      this.#balance = this.#balance - amount
    }
  }

  // looking for the user in the Accounts folder
  static async find(accountName) {
    const account = new Account(accountName);
    try {
      // loading in the balance of the user
      await account.#load();
      return account;
    } catch(err) {
      // return nothing
      return;
    }
  }

  // creating a new account via FileSystem (fs node package)
  static async create(accountName) {
    const account = new Account(accountName);
    // create an account and ensure their balance is 0 when created
    await FileSystem.write(account.filePath, 0)
    account.#balance = 0
    return account;
  }
}