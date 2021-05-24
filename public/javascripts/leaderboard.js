var url = "http://localhost:3000"

primus = Primus.connect(url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });

  primus.on('data', (json)=> {
      if(json.action === "updateLeaderboard"){
          addToLeaderboard(json.data);
      }
  })

  let addToLeaderboard = (json) => {
      json.transfer.forEach((e) => {
          var record = `<li class="">${e.firstname} ${e.lastname} <span>${e.coins} coins</span></li>`;
          document.querySelector("#leaderboard").insertAdjacentHTML('beforeend', record);
      })
  }

  fetch(url+"/api/v1/users/leaderboard", {
      method: "get",
      headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
  }).then(result =>{
      return result.json();
  }).then(json => {
      primus.write({
          "action": "updateLeaderboard",
          "data": json
      })
  })