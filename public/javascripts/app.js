
fetch('http://localhost:3000/api/v1/users', {
    "headers": {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }).then(result => {
            return result.json();
        }).then(json => {
            
            let userId = json.id;
            localStorage.setItem('id', userId);
            
            
            let amount =  json.amount;
            let currentAmount = document.querySelector(".wallet__amount");
            currentAmount.innerHTML = amount;
            
        }).catch(error => {

            console.log(error)

        })




primus = Primus.connect("/", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });

primus.on('data', (data) => {
    if(data.action === "add transfer"){

        let userId = localStorage.getItem('id');
        let receiverId = data.data.transfer.receiverId;
        let senderId = data.data.transfer.senderId;

        console.log(userId);
        console.log(receiverId);
        console.log(senderId);

        updateWallet(data, userId, receiverId, senderId);
        
    }
})



//fucntie die de amount in de wallet update
let updateWallet = (data, userId, receiverId, senderId) => {

    if(userId === receiverId){
        let amount = data.data.transfer.amount;
        let wallet = parseInt(document.querySelector(".wallet__amount").innerHTML);
        let newWallet = wallet + amount;
        document.querySelector(".wallet__amount").innerHTML = newWallet;
    }

    if(userId === senderId){
        let amount = data.data.transfer.amount;
        let wallet = parseInt(document.querySelector(".wallet__amount").innerHTML);
        let newWallet = wallet - amount;
        document.querySelector(".wallet__amount").innerHTML = newWallet;
    }

    
}

let updateTransactions = (data) => {
    
    let transfer = data.data.transfer;
    let userId = data.data.user;

    let amount = transfer.amount;
    let senderId = transfer.senderId;
    let receiverId = transfer.receiverId;

    let recentList = document.querySelector(".transactions__list");

    if(receiverId === userId){
        let recent = document.createElement('li');
        let recentAmount = document.createElement('p');
        let recentName = document.createElement('p');

        recent.className = "transactions__item";
        recentAmount.className = "transaction__item__amount";
        recentName.className = "transaction__item__name";
            
        recentList.appendChild(recent);
        recent.appendChild(recentName);
        recent.append(recentAmount);

        fetch('http://localhost:3000/api/v1/users/' + senderId, {
                "headers": {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
                }).then(result => {
                    return result.json();
                }).then(json => {
                    console.log(json);
                   let firstName = json.user.firstname;
                   recentName.innerHTML = firstName;
                }).catch(error => {
    
                    console.log(error)
    
                })

        //amount invullen en inkleuren
        recentAmount.innerHTML = amount;
        
    }
}



//transfers ophalen

    
    fetch('http://localhost:3000/api/v1/transfers', {
    "headers": {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    // console.log(json);
    addTransfer(json);
    

}).catch(error => {
    
    console.log(error)
    
})





// let logout = document.querySelector("#logout");

// logout.addEventListener("click", (e) => {
//     e.preventDefault();
//     localStorage.clear();
//     window.location.href = "login.html";
// })


let addTransfer = (json) =>{
    let transfers = json.data.transfers;
    let userId = json.user;

    //lopen over de transfers
    transfers.forEach((transfer) => {
        let amount = transfer.amount;
        let senderId = transfer.senderId;
        let receiverId = transfer.receiverId;
        
        let recentList = document.querySelector(".transactions__list");
        
        //checken of het verstuurd is of ontvangen
        if(senderId === userId){
            //verstuurd dus moet de tekst in roodz

            let recent = document.createElement('li');
            let recentAmount = document.createElement('p');
            let recentName = document.createElement('p');

            recent.className = "transactions__item";
            recentAmount.className = "transaction__item__amount";
            recentName.className = "transaction__item__name";
            
            recentList.appendChild(recent);
            recent.appendChild(recentName);
            recent.append(recentAmount);

            //naam van de reciever gaan halen en invullen
            
                fetch('http://localhost:3000/api/v1/users/' + receiverId, {
                "headers": {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
                }).then(result => {
                    return result.json();
                }).then(json => {
                    console.log(json);
                   let firstName = json.user.firstname;
                   recentName.innerHTML = firstName;
                }).catch(error => {
    
                    console.log(error)
    
                })
            
            

            //amount invullen en inkleuren
            recentAmount.innerHTML = "-" + amount;
            recentAmount.style.color = "#C83E4D"


        }

        if(receiverId === userId){
            let recent = document.createElement('li');
            let recentAmount = document.createElement('p');
            let recentName = document.createElement('p');

            recent.className = "transactions__item";
            recentAmount.className = "transaction__item__amount";
            recentName.className = "transaction__item__name";
            
            recentList.appendChild(recent);
            recent.appendChild(recentName);
            recent.append(recentAmount);

            //naam van de reciever gaan halen en invullen
            
                fetch('http://localhost:3000/api/v1/users/' + senderId, {
                "headers": {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
                }).then(result => {
                    return result.json();
                }).then(json => {
                    
                   let firstName = json.user.firstname;
                   recentName.innerHTML = firstName;
                }).catch(error => {
    
                    console.log(error)
    
                })
            
            

            //amount invullen en inkleuren
            recentAmount.innerHTML = amount;
        }



    })
}


