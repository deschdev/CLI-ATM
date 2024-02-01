const fs = require("fs");

module.exports = class FileSystem {
  static read(path) {
    return new Promise((resolve, reject) => {
      // looking for the account within the Accounts folder
      fs.readFile(path, (error, data) => {
        if (error) {
          // if there is an error we log the error to the console
          return reject(error);
        }
        resolve(data);
      });
    });
  }

  static write(path, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, content.toString(), error => {
        if (error) {
          return reject(error)
        }
        resolve();
      });
    });
  }
}