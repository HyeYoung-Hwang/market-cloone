const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form); //form값을 가져옴
  const sha256Password = sha256(formData.get("password")); //sha256으로 보안해줌
  formData.set("password", sha256Password); // 그 값을 다시 password에 넣어줌

  const res = await fetch("/login", {
    method: "post",
    body: formData,
  });
  const data = await res.json();
  const accessToken = data.access_token;
  window.localStorage.setItem("token", accessToken);
  alert("로그인되었습니다!");

  window.location.pathname = "/";
};

form.addEventListener("submit", handleSubmit);
