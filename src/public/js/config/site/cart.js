import { update, deleteSite, fetchById, getCookie } from "../global.js";

let user_id = getCookie("id");
let table = document.querySelector(".table");
let mainCart = document.querySelector(".cart-body");
let mainTotal = 0;

if (!user_id) {
  alert("Vui lòng đăng nhập để xem giỏ hàng!");
  location.href = "../user/login";
} else cart();

function cart() {
  let url = "http://localhost:3000/api/cart";

  fetchById(url, user_id, (data) => {
    if (data.length == 0)
      return (table.innerHTML =
        "<h3>Bạn chưa mua sản phẩm nào! Hãy bắt đầu mua sắm đi nào</h3>");

    data.forEach((e, index) => {
      fetchById("http://localhost:3000/api/product", e.pro_id, (item) => {
        // Fetch and render cart item
        renderCart(index, data, item, e);

        // when input qty change then update cart
        let inputQty = document.querySelectorAll('input[name="qty"]');
        inputQty.forEach((qty) => {
          qty.addEventListener("change", (e) => {
            updateQty(e.target.id, e.target.value);
          });
        });
      });
    });
  });
}

function renderCart(index, data, item, e) {
  let total = (item[0].price - item[0].price * item[0].sale) * e.quantify;
  mainTotal += total;
  mainCart.innerHTML += `
      <tr>
          <td>
              <div class="media">
                  <div class="d-flex">
                  <img
                      width="150px"
                      src="../${item[0].image}"
                      alt=""
                  />
                  </div>
                  <div class="media-body">
                  <p>${item[0].pro_name}</p>
                  </div>
              </div>
              </td>
          <td>
              <h5 id="price-${e.id}" data="${item[0].price}">
                ${new Intl.NumberFormat().format(item[0].price)} VNĐ
                </h5>
          </td>
          <td>
              <div class="product_count">
                  <input
                  type="text"
                  name="qty"
                  id="${e.id}"
                  maxlength="12"
                  value="${e.quantify}"
                  title="Quantity:"
                  class="input-text qty"
                  />
                  <button onclick="var result = document.getElementById('${
                    e.id
                  }'); var sst = result.value; if( !isNaN( sst )) result.value++;return false;"
                    class="increase items-count" type="button">
                  <i class="lnr lnr-chevron-up"></i>
                  </button>
                  <button onclick="var result = document.getElementById('${
                    e.id
                  }'); var sst = result.value; if( !isNaN( sst ) && sst > 0 ) result.value--;return false;"
                  class="reduced items-count" type="button">
                  <i class="lnr lnr-chevron-down"></i>
                  </button>
              </div>
          </td>
          <td id="sale-${e.id}">${item[0].sale * 100}%</td>
          <td>
              <h5 id="total-${e.id}">
              ${new Intl.NumberFormat().format(total)} VNĐ
              </h5>
          </td>
          <td>
          <a href="" data="${e.id}" class="lnr lnr-trash del-btn"></a>
          </td>

      </tr>
    `;

  if (index == data.length - 1) {
    mainCart.innerHTML += `
        <tr class="bottom_button">
            <td>
            <a class="gray_btn" href="#">Cập nhật giỏ hàng</a>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
            <h5>Tổng tiền:</h5>
            </td>
            <td>
            <h5 class="main-price">${new Intl.NumberFormat().format(
              mainTotal
            )} VNĐ</h5>
            </td>
        </tr>
        <tr class="shipping_area">
            <td></td>
            <td></td>
            <td>
            <h5>Giao hàng:</h5>
            </td>
            <td></td>
            <td>
            <div class="shipping_box">
                <ul class="list">
                <li><a href="#">Miễn phí vận chuyển</a></li>
                <li><a href="#">Giao hàng mặc định: 30.000 VNĐ</a></li>
                <li class="active">
                    <a href="#">Giao hàng nhanh: 60.000 VNĐ</a>
                </li>
                </ul>

            </td>
        </tr>
        <tr class="out_button_area">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
            <div class="checkout_btn_inner d-flex align-items-center">
                <a class="gray_btn" href="#">Tiếp tục mua sắm</a>
                <a class="primary-btn ml-3" href="#">Thanh toán</a>
            </div>
            </td>
        </tr>
    `;
  }

  let btnCount = document.querySelectorAll("button.items-count");
  btnCount.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let input = e.target.parentElement.parentElement.querySelector("input");
      updateQty(input.id, input.value);
    });
  });

  let btnDel = document.querySelectorAll(".del-btn");
  btnDel.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      let id = e.target.getAttribute("data");
      let total = document.querySelector(`#total-${id}`);

      deleteSite("http://localhost:3000/api/cart", id, (cb) => {
        e.target.parentElement.parentElement.remove();

        let mainPrice = document.querySelector(".main-price");

        mainPrice.innerHTML =
          new Intl.NumberFormat().format(
            mainPrice.innerHTML.replace(/ VNĐ|\./g, "") -
              parseFloat(total.innerHTML.replace(/ VNĐ|\./g, ""))
          ) + " VNĐ";
      });
    });
  });
}

function updateQty(id, value) {
  let updateUrl = "http://localhost:3000/api/cart";

  let data = {
    quantify: parseInt(value),
  };
  update(updateUrl, id, data, (cb) => {
    let price = parseInt(
      document.querySelector(`#price-${id}`).getAttribute("data")
    );
    let sale = parseFloat(
      document.querySelector(`#sale-${id}`).innerHTML.split("%")[0]
    );
    let total = document.querySelector(`#total-${id}`);

    let priceUp = parseInt(value * (price - (price * sale) / 100));

    let mainPrice = document.querySelector(".main-price");

    mainPrice.innerHTML =
      new Intl.NumberFormat().format(
        mainPrice.innerHTML.replace(/ VNĐ|\./g, "") -
          parseFloat(total.innerHTML.replace(/ VNĐ|\./g, "")) +
          priceUp
      ) + " VNĐ";

    total.innerHTML = new Intl.NumberFormat().format(priceUp) + " VNĐ";
  });
}

main();
