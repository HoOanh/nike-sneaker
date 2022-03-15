export const fetchAll = (url, cb) => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => cb(data));
};

export const fetchById = (url, id, cb) => {
  fetch(`${url}/${id}`)
    .then((res) => res.json())
    .then((data) => cb(data));
};

export const create = (url, value, cb) => {
  fetch(url, {
    method: "post",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => cb(data));
};

export const update = (url, id, value, cb) => {
  fetch(`${url}/${id}`, {
    method: "put",
    body: JSON.stringify(value),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => cb(data));
};

export const deleteSite = (url, id, cb) => {
  fetch(`${url}/${id}`, { method: "delete" })
    .then((res) => res.json())
    .then(() => cb());
};

export const deleted = (url, id) => {
  // function show modal confirm
  showModal("Sẽ xóa thật đó!");

  // if click cancel then id='' and return;
  $(".cancel-model").on("click", function (e) {
    $("#model1").removeClass("open");
    setTimeout(function () {
      $(".overlay").removeClass("open");
    }, 350);
    id = "";
  });

  // click delete cat
  $(".close-model").on("click", function (e) {
    if (!id) return;
    fetch(`${url}/${id}`, { method: "delete" });
  });
};

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function delCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function checkCookie(loginUrl, dasUrl) {
  let id = getCookie("id");
  if (id == "") return (location.href = loginUrl);

  if (dasUrl) return (location.href = dasUrl);
}

export function goBackAndRefresh() {
  location.href = document.referrer;
}
