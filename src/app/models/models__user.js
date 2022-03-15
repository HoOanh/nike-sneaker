const mysql = require("mysql");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// connect to database in Mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nike_sneaker",
  multipleStatements: true,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oanhghf@gmail.com",
    pass: "huong051096",
  },
});

class User {
  static sendMail(mailTo, pass, cb) {
    let mailOptions = {
      from: "oanhghf@gmail.com",
      to: mailTo,
      subject: "Sending Email using Node.js",
      html: `<a href='http://localhost:3000/api/register?token=${pass}'>Nhấp vào đây để xác nhận</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Lỗi  gửi mail: " + error);
      } else {
        console.log("Email sent: " + info.response);
        cb();
      }
    });
  }

  static handingLogin(email, pass, cb) {
    let sql = "select * from account where email = ?";
    db.query(sql, email, (err, account) => {
      if (err) throw err;

      if (account.length == 0)
        return cb({ err: "Email hoặc mật khẩu không chính xác" });

      if (account[0].spam != 0) return cb({ mess: "Vui lòng xác nhận email" });

      let checkPass = bcrypt.compareSync(pass, account[0].password);
      return checkPass
        ? cb(account)
        : cb({ err: "Email hoặc mật khẩu không chính xác" });
    });
  }

  static checkToken(token, cb) {
    let sql = "select * from account where password = ?";

    db.query(sql, token, (err, acc) => {
      if (err) throw err;

      let sql = "UPDATE account SET spam = 0 where password = ?";
      db.query(sql, token, (err, acc) => {
        if (err) throw err;
        cb({ mess: "xác nhận thành công!" });
      });
    });
  }

  static checkAccount(email, cb) {
    let sql = "select * from account where email = ?";

    db.query(sql, email, (err, account) => {
      if (err) throw err;
      cb(account);
    });
  }

  static handingRegister(data, cb) {
    this.checkAccount(data.email, (acc) => {
      if (acc.length != 0) return cb({ err: "Địa chỉ email đã được sử dụng" });

      var salt = bcrypt.genSaltSync(10);
      var passEncode = bcrypt.hashSync(data.password, salt);

      let account = {
        username: data.username,
        email: data.email,
        password: passEncode,
      };

      let sql = "insert into account set ?";
      db.query(sql, account, () => {
        this.sendMail(account.email, account.password, () => {
          cb({ mess: "Mã xác nhận đã được gửi đến gmail của bạn!" });
        });
      });
    });
  }

  static getUserById(id, cb) {
    let sql = `select * from account where id = ${id}`;
    db.query(sql, (err, user) => {
      if (err) throw err;
      cb(user);
    });
  }

  static list(cb) {
    let sql = "select * from account";
    db.query(sql, (err, users) => {
      if (err) throw err;
      cb(users);
    });
  }

  static addNew(data, cb) {
    let sql = "insert into account SET ?";

    db.query(sql, data, (err, cou) => {
      if (err) throw err;
      cb(cou);
    });
  }

  static update(id, data, cb) {
    let sql = `UPDATE account SET ? where id = ?`;

    db.query(sql, [data, id], (err, cou) => {
      if (err) throw err;
      cb(cou);
    });
  }

  static handingDel(id, cb) {
    db.query(`DELETE FROM account where id = ${id}`, (err, data) => {
      if (err) throw err;
      cb(cb);
    });
  }
}

module.exports = User;
