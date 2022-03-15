import { delCookie, getCookie, fetchAll } from "../global.js";

// render menu categories
let nav_cat = document.querySelector(".nav__cat");

fetchAll("http://localhost:3000/api/categories", (data) => {
  data.forEach((cat) => {
    nav_cat.innerHTML += `
          <li class="nav-item">
            <a class="nav-link" href="../${cat.slug}"> ${cat.cat_name} </a>
          </li>
      `;
  });
});

let accNav = document.querySelector(".account");
if (getCookie("id") == "")
  accNav.innerHTML = `<a class="nav-link" href="../user/login">Đăng nhập/Đăng ký</a>`;
else {
  let name = getCookie("name").split(" ");
  accNav.classList.add("submenu");
  accNav.innerHTML = `
          <a
              href="#"
              class="nav-link dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >${name[name.length - 1]}</a
            >
            <ul class="dropdown-menu nav__cat">
              <li class="nav-item">
                <a class="nav-link logout" href="">Đăng xuất</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="">Thông tin</a>
              </li>
            </ul>
  `;

  if (getCookie("role") == 1) {
    document.querySelector(".account .nav__cat").innerHTML += `
      <li class="nav-item">
        <a class="nav-link" href="../admin">Admin</a>
      </li>
  `;
  }
}

let logout = document.querySelector(".logout");
if (logout) {
  logout.addEventListener("click", () => {
    delCookie("id");
    delCookie("name");
  });
}
