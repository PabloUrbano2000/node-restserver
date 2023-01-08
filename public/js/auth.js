const miFormulario = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api/auth/"
  : null;

miFormulario.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = {};
  for (let el of miFormulario.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url + "login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location = "chat.html";
    })
    .catch((err) => console.log(err));
});

function handleCredentialResponse(response) {
  // Google Token : ID_TOKEN
  fetch(url + "google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_token: response.credential,
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      localStorage.setItem("email", resp.usuario.correo);
      localStorage.setItem("token", resp.token);
      window.location = "chat.html";
    })
    .catch(console.warn);
}
const button = document.getElementById("google_signout");
button.onclick = () => {
  console.log(google.accounts.id);
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
