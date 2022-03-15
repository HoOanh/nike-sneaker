class Controller__sneaker {
  // GET /:category/:slug
  showDetail(req, res) {
    res.render("./main", { views: "single-product" });
  }

  // GET /:category
  shopCategory(req, res) {
    res.render("./main", { views: "shop" });
  }

  shop(req, res) {
    res.render("./main", { views: "shop" });
  }

  blog(req, res) {
    res.render("./main", { views: "single-blog" });
  }

  cart(req, res) {
    res.render("./main", { views: "cart" });
  }

  // GET /
  index(req, res) {
    res.render("./main", { views: "home" });
  }
}

module.exports = new Controller__sneaker();
