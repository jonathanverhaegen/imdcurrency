// Redirect to login if not logged in
if(localStorage.getItem('token') === null){
    window.location.href = "login.html";    
}

var url = process.env.url;

primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });

// Add rows to leaderboard
let addToLeaderboard = (json) => {
document.querySelector("#leaderboard").innerHTML = "";
    $position = 1;
    json.transfer.forEach((e) => {
        var record = `<li class="table__row">
        <span class="table__cell table__cell--desktop">${$position}</span>
        <span class="table__cell">${e.firstname} ${e.lastname}</span>
        <span class="table__cell table__cell--right">${e.coins} coins</span></li>`;
        document.querySelector("#leaderboard").insertAdjacentHTML('beforeend', record);
        $position++;
    })
}

// Load leaderboard data
let loadLeaderboard = () => {
    fetch(url+"/api/v1/users/leaderboard", {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(result =>{
        return result.json();
    }).then(json => {
        addToLeaderboard(json);
    })
}

// Load leaderboard on transfer
primus.on('data', (json)=> {
    if(json.action === "add transfer"){
        loadLeaderboard();
    }
})

// Initial leaderboard load
loadLeaderboard();

// Logout
logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
})
