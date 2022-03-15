function filerByPrice(lower, upper) {
  let slugCat = location.href.split("/")[3];

  let url = `http://localhost:3000/api/${slugCat}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let mainProduct = document.querySelector(".main-product");
      let str = "";
      let count = 0;
      data.sneaker.forEach((sne) => {
        if (sne.price >= lower && sne.price <= upper && count < 6) {
          let sale =
            sne.sale != 0
              ? `
              <h6 class="l-through">
                  ${new Intl.NumberFormat().format(
                    sne.price + sne.price * sne.sale
                  )} VNĐ
                </h6>`
              : "";
          str += `
          <!-- single product -->
          <div class="col-lg-4 col-md-6">
            <div class="single-product">
              <a href="./product-details.html?slug=${sne.cate_slug}/${sne.slug}"
                ><img class="img-fluid" src="../${sne.image}" alt=""
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
                    href="./product-details.html?slug=${sne.cate_slug}/${
            sne.slug
          }"
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
          count++;
        }
      });
      mainProduct.innerHTML =
        count == 0
          ? "<h3 class='col-lg-4'>Không có sản phẩm nào trong tầm giá!</h3>"
          : str;
    });
}
