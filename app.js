const Account = require("./Account");
const CommandLine = require("./CommandLine");

const main = async () => {
  try {
    const accountName = await CommandLine.ask(
      "Which account would you like to access?"
    );
    const account = await Account.find(accountName);

    // if no account - we will prompt the user to make one
    if (account == null) {
      account = await promptCreateAccount(accountName);
    }

    // if there is an account we will prompt the user with next step options
    if (account != null) {
      await promptTask(account);
    }

  } catch (error) {
    CommandLine.print("ERROR: Please try again");
  }
}

const promptCreateAccount = async (accountName) => {
  const response = await CommandLine.ask("That account does not exist. Would you like to create it? (yes/no");

  // we are only handling yes as if the user writes anything but yes - we will exit the CLI app
  if (response === "yes") {
    return await Account.create(accountName);
  } 
}

const promptTask = async (account) => {
  const response = await CommandLine.ask("What would you like to do? (view/deposit/withdraw)");
  // user chooses deposit
  if (response === "deposit") {
    const amount = parseFloat(await CommandLine.ask("How much money would you like to deposit?"));
    await account.deposit(amount);
    // user chooses withdraw
  } else if (response === "withdraw") {
      const amount = parseFloat(await CommandLine.ask("How much money would you like to withdraw?"));
      try {
        await account.withdraw(amount);
      } catch(error) {
        CommandLine.print(`Your new balance of ${account.balance} is insufficient to complete that withdrawl amount.`);
      }
    }
  // always show the users balance - view is the default choice
  CommandLine.print(`Your balance is ${account.balance}.`);
}

main();