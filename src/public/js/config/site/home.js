import { create, fetchAll, getCookie } from "../global.js";

const url = "http://localhost:3000/api";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    //title page
    document.querySelector(".title-page").innerHTML = "Trang chủ";
    // render banner
    let banner = document.querySelector(".active-banner-slider");
    data.banner.forEach((ban) => {
      if (ban.cat_banner == "head") {
        banner.innerHTML += `
      <div class="row single-slide align-items-center d-flex">
            <div class="col-lg-5 col-md-6">
              <div class="banner-content">
                <h1> ${ban.name} </h1>
                <h4>${ban.description} </h4>
              </div>
            </div>
            <div class="col-lg-7">
              <div class="banner-img">
                <img class="img-fluid" src="../${ban.images} " alt="" />
              </div>
            </div>
          </div>
      `;
      }
    });

    // render banner area
    let bannerArea = document.querySelector(".banner__area");
    data.banner.forEach((ban) => {
      if (ban.cat_banner == "area") {
        bannerArea.innerHTML += `
        <div class="${ban.description}">
          <div class="single-deal">
            <div class="overlay"></div>
            <img class="img-fluid w-100" src="../${ban.images}" alt="" />
            <a href="../${ban.images}" class="img-pop-up" target="_blank">
              <div class="deal-details">
                <h6 class="deal-title">${ban.name}</h6>
              </div>
            </a>
          </div>
        </div>
    `;
      }
    });
  })
  .then(() => productNew())
  .then(() => productHighlight())
  .then(() => productHot());

function addCart() {
  let btnAddCart = document.querySelectorAll(".add-cart");
  btnAddCart.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let userId = getCookie("id");

      if (!userId) return (location.href = "../user/login");

      let proId = e.target.parentElement.getAttribute("data");

      let url = "http://localhost:3000/api/cart";

      let value = {
        user_id: userId,
        pro_id: proId,
        quantify: 1,
      };

      create(url, value, (cb) => {
        alert("Thêm thành công!");
      });
    });
  });
}

function productNew() {
  const urlProductNew = "http://localhost:3000/api/product/new";

  fetch(urlProductNew)
    .then((res) => res.json())
    .then((data) => {
      let productNew = document.querySelector(".product__new");
      data.forEach((sne) => {
        // render product new
        let sale =
          sne.sale != 0
            ? `
            <h6 class="l-through">
                ${new Intl.NumberFormat().format(
                  sne.price + sne.price * sne.sale
                )} VNĐ
              </h6>`
            : "";

        productNew.innerHTML += `
        <div class="col-lg-3 col-md-6">
        <div class="single-product">
          <a href="./${sne.cate_slug}/${sne.slug}">
            <img class="img-fluid" src="../${sne.image}" alt=""
          /></a>
          <div class="product-details">
            <h6>${sne.pro_name}</h6>
            <div class="price">
              <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
              ${sale}
            </div>
            <div class="prd-bottom">
              <a data="${sne.id}" href="" class="social-info add-cart">
                <span class="ti-bag"></span>
                <p class="hover-text">Thêm vào túi</p>
              </a>
              <a href="" class="social-info">
                <span class="lnr lnr-heart"></span>
                <p class="hover-text">Yêu thích</p>
              </a>
              <a
                href="./${sne.cate_slug}/${sne.slug}"
                class="social-info"
              >
                <span class="lnr lnr-move"></span>
                <p class="hover-text">Xem chi tiết</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
      });
    });
}

function productHighlight() {
  const urlProductHot = "http://localhost:3000/api/product/highlight";

  fetch(urlProductHot)
    .then((res) => res.json())
    .then((data) => {
      //render product area
      let productHighlight = document.querySelector(".product__highlight");
      data.forEach((sne) => {
        // render product highlight
        let sale =
          sne.sale != 0
            ? `
              <h6 class="l-through">
                  ${new Intl.NumberFormat().format(
                    sne.price + sne.price * sne.sale
                  )} VNĐ
                </h6>`
            : "";

        productHighlight.innerHTML += `
          <div class="col-lg-3 col-md-6">
            <div class="single-product">
              <a href="./${sne.cate_slug}/${sne.slug}">
                <img class="img-fluid" src="../${sne.image}" alt=""/>
              </a>
              <div class="product-details">
                <h6>${sne.pro_name}</h6>
                <div class="price">
                  <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
                  ${sale}
                </div>
                <div class="prd-bottom">
                  <a data="${sne.id}" href="" class="social-info add-cart">
                    <span class="ti-bag"></span>
                    <p class="hover-text">Thêm vào túi</p>
                  </a>
                  <a href="" class="social-info">
                    <span class="lnr lnr-heart"></span>
                    <p class="hover-text">Yêu thích</p>
                  </a>
                  <a
                    href="./${sne.cate_slug}/${sne.slug}"
                    class="social-info"
                  >
                    <span class="lnr lnr-move"></span>
                    <p class="hover-text">Xem chi tiết</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
      `;
      });
    });
}

function productHot() {
  const urlProductHot = "http://localhost:3000/api/product/hot";
  // render sale exclusive Product
  let exclusiveProduct = document.querySelector(".exclusive__product");
  fetch(urlProductHot)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((sne) => {
        exclusiveProduct.innerHTML += `
            <div class="single-exclusive-slider">
              <img class="img-fluid" src="../${sne.image}" alt="" />
              <div class="product-details">
                <div class="price">
                  <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
                  <h6 class="l-through">
                    ${new Intl.NumberFormat().format(
                      sne.price + sne.price * sne.sale
                    )} VNĐ
                  </h6>
                </div>
                <h4>${sne.pro_name}</h4>
                <div
                  class="add-bag d-flex align-items-center justify-content-center"
                >
                  <a data="${sne.id}" class="add-btn add-cart" href=""
                    ><span class="ti-bag"></span
                  ></a>
                  <span class="add-text text-uppercase ">Thêm vào túi</span>
                </div>
              </div>
            </div>
    `;
      });
      // call main js
      main();
      // call countdown js
      countdown();

      addCart();
    });
}

let searchBtn = document.querySelector(".btn-search");
let input = document.querySelector("#search_input");

input.addEventListener("keyup", (e) => {
  e.preventDefault();
  search(e.target.value);
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  search(input.value);
});

function search(value) {
  let searchBox = document.querySelector("#box-search");

  if (value == "") return (searchBox.innerHTML = "");
  fetchAll(`http://localhost:3000/api/search?key=${value}`, (data) => {
    let str = "";

    if (data.length == 0)
      return (searchBox.innerHTML = `Không tìm thấy sản phẩm nào`);
    data.forEach((item) => {
      let price =
        item.sale == 0
          ? ` <h6>${item.price}</h6>`
          : `
              <h6>${item.price}</h6>
              <h6 class="l-through">${item.price - item.price * item.sale}</h6>
            `;
      str += `
          <div class="col-lg-6 mb-20 bg-light">
          <div class="single-related-product d-flex">
            <a href="">
              <img width="70px" src="../${item.image}" />
            </a>
            <div class="desc">
              <a href="/${item.cate_slug}/${item.slug}"
              class="title">${item.pro_name}</a>
              <div class="price">
                ${price}
              </div>
            </div>
          </div>
        </div>
      `;
    });

    searchBox.innerHTML = str;

    let close = document.querySelector("#close_search");
    close.addEventListener("click", () => {
      searchBox.innerHTML = "";
      input.value = "";
    });
  });
}
