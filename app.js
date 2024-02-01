const Account = require("./Account");
const CommandLine = require("./CommandLine");

const main = async () => {
  try {
    const accountName = await CommandLine.ask(
      "Which account would you like to access?"
    );
    const account = await Account.find(accountName);
  
    if (account == null) {
      account = await promptCreateAccount(accountName);
    }
    
    if (account != null) {
      await promptTask(account);
    }
  } catch (error) {
    // NORMAN THIS IS FIRING AND IT SHOULD NOT BE FIRING
    CommandLine.print("ERROR: Please try again");
  }
}

const promptCreateAccount = async (accountName) => {
  const response = await CommandLine.ask("That account does not exist. Would you like to create it? (yes/no");

  if (response === "yes") {
    return await Account.create(accountName);
  }
}

const promptTask = async (account) => {
  const response = await CommandLine.ask("What would you like to do? (view/deposit/withdraw)");

  if (response === "deposit") {
    const amount = parseFloat(await CommandLine.ask("How much money would you like to deposit?"));
    await account.deposit(amount);
  } else if (response === "withdraw") {
      const amount = parseFloat(await CommandLine.ask("How much money would you like to withdraw?"));
      try {
        await account.withdraw(amount);
      } catch(error) {
        CommandLine.print(`Your new balance of ${account.balance} is insufficient to complete that withdrawl amount.`)
      }
    }
      CommandLine.print(`Your balance is ${account.balance}.`)
}

main();