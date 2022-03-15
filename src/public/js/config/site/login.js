import { create, setCookie, goBackAndRefresh } from "../global.js";

const accUrl = "http://localhost:3000/api/account/login";

const submitBtn = document.querySelector(".sub-btn");
let mess = document.querySelector(".mess");
let err = document.querySelector(".err");

//title page
document.querySelector(".title-page").innerHTML = "Đăng nhập";

submitBtn.addEventListener("click", () => {
  handingLogin();
});

let inputFil = document.querySelectorAll("input");

inputFil.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      handingLogin();
    }
  });
});

function handingLogin(e) {
  mess.innerHTML = "";
  err.innerHTML = "";

  let inputEmail = document.querySelector("input[name=email]");
  let inputPass = document.querySelector("input[name=password]");

  if (!inputEmail.value || !inputPass.value)
    return (err.innerHTML = "Vui lòng nhập đủ thông tin");

  let user = {
    email: inputEmail.value,
    password: inputPass.value,
  };

  create(accUrl, user, (data) => {
    if (data.err != undefined) return (err.innerHTML = data.err);

    if (data.mess != undefined) return (mess.innerHTML = data.mess);

    setCookie("id", data[0].id);
    setCookie("name", data[0].username);
    setCookie("role", data[0].rank);

    goBackAndRefresh();
  });
}

main();
