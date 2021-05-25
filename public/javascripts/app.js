//redirecten als een user niet is ingelogd

if(localStorage.getItem('token') === null){
    window.location.href = "login.html";    
}

const url = "http://localhost:3000";



fetch(url + '/api/v1/users', {
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

        updateWallet(data, userId, receiverId, senderId);
        updateTransfers(data, userId, receiverId, senderId);
        
    }
})



//fucntie die de amount in de wallet update
const updateWallet = (data, userId, receiverId, senderId) => {

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

const updateTransfers = (data, userId, receiverId, senderId) =>{

    if(userId === receiverId){

        let transfer = data.data.transfer;
        let amount = transfer.amount;

        let recentList = document.querySelector(".transactions__list");

        let recent = document.createElement('li');
        let recentAmount = document.createElement('p');
        let recentName = document.createElement('p');

        recent.className = "transactions__item";
        recentAmount.className = "transaction__item__amount";
        recentName.className = "transaction__item__name";

        recentList.appendChild(recent);
        recent.appendChild(recentName);
        recent.append(recentAmount);

        //naam van de sender gaan opzoeken en invullen

        fetch(url +'/api/v1/users/' + senderId, {
            "headers": {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }).then(result => {
                return result.json();
        }).then(json => {
            
            let firstName = json.user.firstname;
            recentName.innerHTML = firstName;
            recentAmount.innerHTML = amount;
        }).catch(error => {
    
            console.log(error)
    
        })

        
        


    }

    if(userId === senderId){
        let transfer = data.data.transfer;
        let amount = transfer.amount;

        let recentList = document.querySelector(".transactions__list");

        let recent = document.createElement('li');
        let recentAmount = document.createElement('p');
        let recentName = document.createElement('p');

        recent.className = "transactions__item";
        recentAmount.className = "transaction__item__amount";
        recentName.className = "transaction__item__name";

        recentList.appendChild(recent);
        recent.appendChild(recentName);
        recent.append(recentAmount);

        //naam van de receiver gaan opzoeken en invullen

        fetch(url + '/api/v1/users/' + receiverId, {
            "headers": {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
        }).then(result => {
                return result.json();
        }).then(json => {
            
            let firstName = json.user.firstname;
            recentName.innerHTML = firstName;
            recentAmount.innerHTML = "-" + amount;
            recentAmount.style.color = "#C83E4D"
        }).catch(error => {
    
            console.log(error)
    
        })
    }

}





//transfers ophalen

    
    fetch(url + '/api/v1/transfers', {
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



const addTransfer = (json) =>{
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
            
                fetch(url + '/api/v1/users/' + receiverId, {
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
            
                fetch(url + '/api/v1/users/' + senderId, {
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

let logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
})


