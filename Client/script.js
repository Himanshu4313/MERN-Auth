//signup
const namesInput = document.getElementById("name");
const userNameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const bioInput = document.getElementById("bio");

const formSubmit = document.getElementById("submit");

const userRegistration = async (payload) => {
  const res = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const result = await res.json();
  // console.log(result);
  alert(result.message);

  window.location.href = "http://127.0.0.1:5500/Client/login.html";
};

function form(event) {
  event.preventDefault();
  const name = namesInput.value;
  const userName = userNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const bio = bioInput.value;

  if (!name || !userName || !email || !password || !bio) {
    alert("All fields are required.");
    return;
  }

  const userRegData = {
    name: name,
    userName: userName,
    email: email,
    password: password,
    bio,
  };
  console.log(userRegData);

  userRegistration(userRegData);
}

formSubmit.addEventListener("click", form);
