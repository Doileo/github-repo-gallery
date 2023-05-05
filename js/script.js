// Get the DOM element for the user profile overview
const overview = document.querySelector(".overview");
// Set the username to "Doileo"
const username = "Doileo";
// Get the DOM element for the list of repositories
const reposList = document.querySelector(".repo-list");
// Get the DOM element for the container of all repositories
const allRepos = document.querySelector(".repos");
// Get the DOM element for the repository data display
const repoData = document.querySelector(".repo-data");
// Get the DOM element for the "View Repos" button
const backButton = document.querySelector(".view-repos");
// Get the DOM element for the input field used to filter repositories
const filterInput = document.querySelector(".filter-repos");

// The 'getInfo' function fetches user information and calls the 'displayUserInfo' function to display it on the page.
const getInfo = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const info = await res.json();
    displayUserInfo(info);
};

// Calls the 'getInfo' function to fetch user information as soon as the page loads.
getInfo();

// The 'displayUserInfo' function creates a 'div' element with user information and appends it to the '.overview' section.
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
    // Calls the 'myRepos' function to fetch and display the user's repositories.
    myRepos(username);
};

// The 'myRepos' function fetches the user's repositories and calls the 'displayRepos' function to display them on the page.
const myRepos = async function (username) {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=update&per_page=100`);
  const repoData = await fetchRepos.json();
  displayRepos(repoData);
};

// The 'displayRepos' function creates an 'li' element for each repository and appends it to the '.repo-list' section.
const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(repoItem);
  }
};

// Event listener that listens for clicks on repository names and calls the 'getRepoInfo' function.
reposList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

// The 'getRepoInfo' function fetches information for a specific repository and calls the 'displayRepoInfo' function to display it.
const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();

  // Fetches information on the repository's languages and creates a list of them to display.
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  // The 'displayRepoInfo' function creates a 'div' element with repository information and appends it to the '.repo-data' section.
  const languages = [];
  for(const language in languageData) {
    languages.push(language);
  }

  displayRepoInfo(repoInfo, languages);
};

// displayRepoInfo function displays information about a repository on the web page
const displayRepoInfo = function (repoInfo, languages) {
  backButton.classList.remove("hide"); // Show the back button
  repoData.innerHTML = ""; // Clear the repository data div
  repoData.classList.remove("hide"); // Show the repository data div
  allRepos.classList.add("hide"); // Hide the list of all repositories

  // Create a div element to display the repository information
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoData.append(div); // Append the div element to the repository data div
};

// Event listener for the back button to show the list of all repositories
backButton.addEventListener("click", function () {
  allRepos.classList.remove("hide"); // Show the list of all repositories
  repoData.classList.add("hide"); // Hide the repository data div
  backButton.classList.add("hide"); // Hide the back button
});

// Event listener for the dynamic search feature
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value; // Get the search text from the input field
  const repos = document.querySelectorAll(".repo"); // Get all the repository elements
  const searchLowerText = searchText.toLowerCase(); // Convert the search text to lowercase

  // Loop through all the repository elements
  for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase(); // Convert the repository text to lowercase
    if (repoLowerText.includes(searchLowerText)) { // Check if the repository text includes the search text
      repo.classList.remove("hide"); // Show the repository element
    } else {
      repo.classList.add("hide"); // Hide the repository element
    }
  }
});

