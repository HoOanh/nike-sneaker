import { create } from "../global.js";

const accUrl = "http://localhost:3000/api/account/register";

let submitBtn = document.querySelector(".sub-btn");
let err = document.querySelector(".err");
let mess = document.querySelector(".mess");

//title page
document.querySelector(".title-page").innerHTML = "Đăng ký";

submitBtn.addEventListener("click", () => {
  handingRegister();
});

let inputFil = document.querySelectorAll("input");

inputFil.forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
      handingRegister();
    }
  });
});

function handingRegister(e) {
  let inputName = document.querySelector("input[name=name]");
  let inputEmail = document.querySelector("input[name=email]");
  let inputPass = document.querySelector("input[name=password]");
  let inputRePass = document.querySelector("input[name=re-password]");

  if (
    !inputEmail.value ||
    !inputPass.value ||
    !inputName.value ||
    !inputRePass.value
  )
    return (err.innerHTML = "Vui lòng nhập đủ thông tin!");

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!regex.test(inputEmail.value))
    return (err.innerHTML = "Email nhập không đúng");

  if (inputPass.value != inputRePass.value)
    return (err.innerHTML = "Mật khẩu nhập lại không chính xác!");

  let user = {
    email: inputEmail.value,
    password: inputPass.value,
    username: inputName.value,
  };

  create(accUrl, user, (data) => {
    if (data.err != undefined) return (err.innerHTML = data.err);
    if (data.mess != undefined) {
      err.innerHTML = "";
      mess.innerHTML = data.mess;
      mess.innerHTML += "<p>Sẽ quay lại trang chủ trong 2s</p>";
      setTimeout(() => {
        location.href = "../user/login";
      }, 2000);
    }
  });
}

main();
