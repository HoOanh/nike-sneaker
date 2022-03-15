class Controller__user {
  // GET /login
  login(req, res) {
    res.render("./main", { views: "login" });
  }

  // GET /register
  register(req, res) {
    res.render("./main", { views: "register" });
  }
}

module.exports = new Controller__user();
