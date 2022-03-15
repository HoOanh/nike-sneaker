const Sneaker = require("../models/models__sneaker");
const User = require("../models/models__user");

class Controller__api {
  //GET /product/new
  productNew(req, res) {
    Sneaker.productNew((sneakers) => {
      res.json(sneakers);
    });
  }

  //GET /product/hot
  productHot(req, res) {
    Sneaker.productHot((sneakers) => {
      res.json(sneakers);
    });
  }

  //GET /product/highlight
  productHighlight(req, res) {
    Sneaker.productHighlight((sneakers) => {
      res.json(sneakers);
    });
  }

  //GET /product/sale-week
  productSaleWeek(req, res) {
    Sneaker.productSaleWeek((sneakers) => {
      res.json(sneakers);
    });
  }

  //GET /product/:id
  getProductById(req, res) {
    let id = req.params.id;
    Sneaker.getProductById(id, (sneakers) => {
      res.json(sneakers);
    });
  }

  //GET /cart/:id
  cartItem(req, res) {
    let user_id = req.params.id;

    Sneaker.cartItem(user_id, (item) => {
      res.json(item);
    });
  }

  //PUT /cart/:id
  updateQtyCart(req, res) {
    let user_id = req.params.id;
    let data = req.body;

    Sneaker.updateQtyCart(user_id, data, (item) => {
      res.json(item);
    });
  }
  //DELETE /cart/:id
  deleteCart(req, res) {
    let cartId = req.params.id;

    Sneaker.deleteCart(cartId, (item) => {
      res.json(item);
    });
  }

  //POST /cart/:userId/:proId
  addCart(req, res) {
    let data = req.body;
    Sneaker.addCart(data, (item) => {
      res.json(item);
    });
  }

  //POST /account/login
  handingLogin(req, res) {
    let email = req.body.email;
    let pass = req.body.password;

    User.handingLogin(email, pass, (acc) => {
      res.json(acc);
    });
  }

  //POST  /account/register
  handingRegister(req, res) {
    let data = req.body;

    User.handingRegister(data, (acc) => {
      res.json(acc);
    });
  }

  //GET /register
  sendmail(req, res) {
    let token = req.query["token"];

    User.checkToken(token, (acc) => {
      res.redirect("../login");
    });
  }

  //GET /search
  search(req, res) {
    let keyword = req.query["key"];

    Sneaker.search(keyword, (pro) => {
      res.json(pro);
    });
  }

  // GET /:category/:slug
  showDetail(req, res) {
    let categoryName = req.params.category;
    let slug = req.params.slug;
    if (!slug) return;

    Sneaker.getSneakerBySlug(slug, (sneaker, category) => {
      let titlePage =
        sneaker[0].pro_name != undefined
          ? `${categoryName.split("-")[0]} | ${sneaker[0].pro_name}`
          : "404";
      res.json({
        sneaker: sneaker[0],
        category: category,
        titlePage: titlePage,
      });
    });
  }

  // GET /:category
  shopCategory(req, res) {
    let category = req.params.category;
    if (!category) return;

    Sneaker.getSneakerByCategory(category, (sneaker, category) => {
      let titlePage =
        sneaker[0].cate_slug != undefined
          ? `Shop | ${sneaker[0].cate_slug}`
          : "404";
      let data = {
        titlePage: titlePage,
        sneaker: sneaker,
        categories: category,
      };
      res.json(data);
    });
  }

  // GET /category
  category(req, res) {
    Sneaker.getAllCategory((cat) => {
      res.json(cat);
    });
  }

  // GET /
  index(req, res) {
    Sneaker.getBanner((banner) => {
      Sneaker.getNewSneaker((sneakers, category) => {
        res.json({
          titlePage: "Trang chủ",
          sneakers: sneakers,
          category: category,
          banner: banner,
        });
      });
    });
  }
}

module.exports = new Controller__api();
