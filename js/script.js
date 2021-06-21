// Here my profile information appear
const overview = document.querySelector(".overview");
const username = "Doileo";
// Here it goes global variable that select the unordered list and to display the repos list
const reposList = document.querySelector(".repo-list");

const getInfo = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const info = await res.json();
    displayUserInfo(info);
};

getInfo();

// Here is displayed the fetched user information on the page
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
    myRepos();
};

// Here is the function to fetch my repos
const myRepos = async function () {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

// Here are displayed information about each repo
const displayRepos = async function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(repoItem);
  }
};

