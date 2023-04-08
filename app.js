//variables
const searchInput = document.querySelector('input[type=search]');
const searchBtn = document.getElementById('btn');
const result = document.getElementById('result');

// Add an event listener to the search button
searchBtn.addEventListener('click', () => {
  // Retrieve the username entered by the user
  let username = searchInput.value;
  if (username) {
    let data = fetch(`https://api.github.com/users/${username}`)
    // Parse the response as JSON
    .then(response => {
      // Check if the response status is 404 (Not Found)
      if (response.status === 404) {
        throw new Error('User not found');
      }
      // If the response status is not 404, parse the response as JSON
      return response.json();
    })
      // Display the user's information in the result element
      .then(json => {
                result.innerHTML = `
                  <div class="container">
                    <img src="${json.avatar_url}" alt="avatar">
                    <h1>${json.name}</h1>
                    <h3>${json.bio}</h3>
                    <div class="info">
                      <h3 style="display: inline;"><span>${json.followers}</span> Followers</h3>
                      <h3 style="display: inline;"><span>${json.following}</span> Following</h3>
                      <h3 style="display: inline;"><span>${json.public_repos}</span> Repos</h3>
                    </div>
                    <div class="repos">
                    </div>
                  </div>
                `;
              })
      // Display the user's repos
      .then(() => {
        let repos = document.querySelector('.repos');
        let reposData = fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=10`)
          .then(response => response.json())
          .then(json => {
            for (let i = 0; i < json.length; i++) {
              repos.innerHTML += `
                <a href="${json[i].html_url}">${json[i].name}</a>
              `
            }
          })
      })
      .catch(error => {
        // If there is an error, log it to the console
        console.log(error);
        // Display an error message to the user
        result.innerHTML = `
          <div class="container">
            <h1 class='error'>User not found</h1>
          </div>
        `;
      }); 
    }
});

// Add an event listener to the search input field that triggers when the user presses the Enter key
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchBtn.click();
  }
});

// display my Github profile when page is loaded
window.onload = () => {
  searchInput.value = 'moslihbadr'
  searchBtn.click()
}
