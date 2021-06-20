// Here my profile information appear
const overview = document.querySelector(".overview");
const username = "Doileo";

const getInfo = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const info = await res.json();
    displayUserInfo(info);
};

getInfo();

// here is displayed the fetched user information on the page
const displayUserInfo = function (info) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
      <figure>
        <img alt="user avatar" src=${info.avatar_url} />
      </figure>
      <div>
        <p><strong>Name:</strong> ${info.name}</p>
        <p><strong>Bio:</strong> ${info.bio}</p>
        <p><strong>Location:</strong> ${info.location}</p>
        <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
      </div>
    `;
    overview.append(div);
};

