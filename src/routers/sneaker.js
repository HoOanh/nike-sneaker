const express = require("express");
const router = express.Router();

const controllerSneaker = require("../app/controllers/Controller__sneaker");

router.get("/blog", controllerSneaker.blog);

router.get("/cart", controllerSneaker.cart);

router.get("/:category/:slug", controllerSneaker.showDetail);
router.get("/:category", controllerSneaker.shopCategory);

router.get("/", controllerSneaker.index);

module.exports = router;
