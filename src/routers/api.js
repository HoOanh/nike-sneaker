const express = require("express");
const router = express.Router();

const controllerApi = require("../app/controllers/Controller__api");

router.get("/product/new", controllerApi.productNew);
router.get("/product/hot", controllerApi.productHot);
router.get("/product/highlight", controllerApi.productHighlight);
router.get("/product/sale-week", controllerApi.productSaleWeek);
router.get("/product/:id", controllerApi.getProductById);

router.get("/cart/:id", controllerApi.cartItem);
router.put("/cart/:id", controllerApi.updateQtyCart);
router.delete("/cart/:id", controllerApi.deleteCart);
router.post("/cart", controllerApi.addCart);

router.get("/categories", controllerApi.category);
router.get("/search", controllerApi.search);

router.post("/account/login", controllerApi.handingLogin);
router.post("/account/register", controllerApi.handingRegister);

router.get("/register", controllerApi.sendmail);

router.get("/:category/:slug", controllerApi.showDetail);
router.get("/:category", controllerApi.shopCategory);

router.get("/", controllerApi.index);

module.exports = router;
