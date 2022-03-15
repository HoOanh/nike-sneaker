import { fetchAll } from "../global.js";

let slugCat = location.href.split("?slug=")[1];

let url = `http://localhost:3000/api/${slugCat}`;

fetchAll(url, (data) => {
  //render title page
  let title = document.querySelector(".title-page");
  title.innerHTML = `${data.titlePage}`;

  // render location nav
  let locaNav = document.querySelector(".loca-nav");

  locaNav.innerHTML = `
          <a href="../">Trang chủ<span class="lnr lnr-arrow-right"></span></a>
          <a href="">Shop<span class="lnr lnr-arrow-right"></span></a>
    <a href="../${slugCat}" class="cat_name">
      ${slugCat.split("-")[0]}

    </a>
  `;

  //main category
  let mainCate = document.querySelector(".main-categories");

  data.categories.forEach((cat) => {
    let active =
      cat.slug == slugCat
        ? `href="./${cat.slug}" style="color:#ffba00"`
        : `href="./${cat.slug}"`;
    mainCate.innerHTML += `
    <li class="main-nav-list">
      <a ${active}>
        <span class="lnr lnr-arrow-right"></span>
         ${cat.cat_name}
         <span class="number">(${cat.cat_product})</span>
      </a>
    </li>
 `;
  });

  let mainProduct = document.querySelector(".main-product");
  data.sneaker.forEach((sne) => {
    let sale =
      sne.sale != 0
        ? `
          <h6 class="l-through">
              ${new Intl.NumberFormat().format(
                sne.price + sne.price * sne.sale
              )} VNĐ
            </h6>`
        : "";
    mainProduct.innerHTML += `
      <!-- single product -->
      <div class="col-lg-4 col-md-6">
        <div class="single-product">
          <a href="./${sne.cate_slug}/${sne.slug}"
            ><img class="img-fluid" src="../assets/${sne.image}" alt=""
          /></a>
          <div class="product-details">
            <h6>${sne.pro_name}</h6>
            <div class="price">
              <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
             ${sale}
            </div>
            <div class="prd-bottom">
              <a href="" data="${sne.image}" class="social-info">
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

  saleWeek();
});

function saleWeek() {
  let saleUrl = "http://localhost:3000/api/product/sale-week";

  fetchAll(saleUrl, (data) => {
    let saleWeek = document.querySelector(".sale-week");

    data.forEach((sne) => {
      saleWeek.innerHTML += `
        <div class="col-lg-4 col-md-4 col-sm-6 mb-20">
          <div class="single-related-product d-flex">
            <a href="#">
              <img width='70px' src="../assets/${sne.image}"/>
            </a>
            <div class="desc">
              <a href="#" class="title">${sne.pro_name}</a>
              <div class="price">
                <h6>${new Intl.NumberFormat().format(sne.price)} VNĐ</h6>
                <h6 class="l-through">
                  ${new Intl.NumberFormat().format(
                    sne.price + sne.price * sne.sale
                  )} VNĐ
                </h6>
              </div>
            </div>
          </div>
        </div>
    `;
    });

    main();
  });
}
