const readline = require("readline");

module.exports = class CommandLine {
  static ask(question) {
    const READLINE = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    // resolve our new promise with the answer and close out of Readline - there is no reject needed
    return new Promise(resolve => {
      READLINE.question(`${question} `, answer => {
        resolve(answer);
        READLINE.close();
      });
    })  
  }

  // print out the text
  static print(text) {
    console.log(text)
  }
}