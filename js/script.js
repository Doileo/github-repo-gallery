// Here my profile information appear
const overview = document.querySelector(".overview");
const username = "Doileo";
// Here it goes global variable that select the unordered list and to display the repos list
const reposList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const individualRepoData = document.querySelector(".repo-data");


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
const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(repoItem);
  }
};

reposList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
  // Grab languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  // Make a list of languages
  const languages = [];
  for(const language in languageData) {
    languages.push(language);
  }

  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  individualRepoData.innerHTML = "";
  individualRepoData.classList.remove("hide");
  allRepos.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Defaul Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer nooper">View Repo on GitHub!</a>
  `;
  individualRepoData.append(div);
};

