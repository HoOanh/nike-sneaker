const mysql = require("mysql");

// connect to database in Mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nike_sneaker",
});

class Sneaker {
  static slugVietnamese(str) {
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();

    var from =
      "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;";
    var to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------";
    for (var i = 0; i < from.length; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    return str;
  }

  static getAllCategory(cb) {
    let sql = "select * from categories";
    db.query(sql, (err, category) => {
      if (err) throw err;
      cb(category);
    });
  }

  static getNewSneaker(cb) {
    this.getAllCategory((cat) => {
      let sql = "select * from products order by id desc";
      db.query(sql, (err, sneakers) => {
        if (err) throw err;
        cb(sneakers, cat);
      });
    });
  }

  static getBanner(cb) {
    let sql = "select * from banner where highlight = 1";
    db.query(sql, (err, banner) => {
      if (err) throw err;
      cb(banner);
    });
  }

  static getSneakerBySlug(slug, cb) {
    this.getAllCategory((cat) => {
      let sql = `select * from products where slug = '${slug}'`;
      db.query(sql, (err, sneaker) => {
        if (err) throw err;
        cb(sneaker, cat);
      });
    });
  }

  static getSneakerByCategory(category, cb) {
    this.getAllCategory((cat) => {
      let sql = `SELECT * FROM products WHERE cate_slug like ? limit 6`;
      db.query(sql, category, (err, sneaker) => {
        if (err) throw err;
        cb(sneaker, cat);
      });
    });
  }

  static productNew(cb) {
    let sql = `SELECT * FROM products WHERE highlight=1 order by time_up limit 8`;

    db.query(sql, (err, sneakers) => {
      if (err) throw err;
      cb(sneakers);
    });
  }

  static productHot(cb) {
    let sql = `SELECT * FROM products WHERE highlight=1 and sale != 0 order by time_up `;

    db.query(sql, (err, sneakers) => {
      if (err) throw err;
      cb(sneakers);
    });
  }

  static productSaleWeek(cb) {
    let sql = `SELECT * FROM products WHERE sale != 0 order by time_up limit 9`;

    db.query(sql, (err, sneakers) => {
      if (err) throw err;
      cb(sneakers);
    });
  }

  static productHighlight(cb) {
    let sql = `SELECT * FROM products WHERE highlight=1 limit 8`;

    db.query(sql, (err, sneakers) => {
      if (err) throw err;
      cb(sneakers);
    });
  }

  static search(key, cb) {
    let sql = `SELECT * FROM products where pro_name like "%${key}%" limit 5`;

    db.query(sql, (err, pro) => {
      if (err) throw err;
      cb(pro);
    });
  }

  static cartItem(id, cb) {
    let sql = "select * from cart_item where user_id = ?";

    db.query(sql, id, (err, item) => {
      if (err) throw err;

      cb(item);
    });
  }

  static updateQtyCart(id, value, cb) {
    let sql = `UPDATE cart_item SET ? where id = ?`;

    db.query(sql, [value, id], (err, cou) => {
      if (err) throw err;
      cb(cou);
    });
  }

  static deleteCart(id, cb) {
    let sql = "DELETE from cart_item where id = ?";

    db.query(sql, id, (err, item) => {
      if (err) throw err;
      cb(item);
    });
  }

  static checkCart(proId, userId, cb) {
    let sql = "SELECT * FROM cart_item WHERE pro_id = ? and user_id = ?";
    db.query(sql, [proId, userId], (err, item) => {
      if (err) throw err;
      cb(item);
    });
  }

  static addCart(data, cb) {
    this.checkCart(data.pro_id, data.user_id, (check) => {
      if (check.length == 0) {
        let sql = "insert into cart_item set ? ";

        db.query(sql, data, (err, item) => {
          if (err) throw err;
          cb(item);
        });
      } else {
        this.updateQtyCart(
          check[0].id,
          { quantify: parseInt(data.quantify) + parseInt(check[0].quantify) },
          (item) => {
            cb(item);
          }
        );
      }
    });
  }

  static getProductById(id, cb) {
    let sql = "select * from products where id = ?";

    db.query(sql, id, (err, item) => {
      if (err) throw err;

      cb(item);
    });
  }
}

module.exports = Sneaker;
