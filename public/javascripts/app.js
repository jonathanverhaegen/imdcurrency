//data van de user ophalen
    fetch('http://localhost:3000/api/v1/users', {
        "headers": {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            }).then(result => {
                return result.json();
            }).then(json => {
                    console.log(json);
                    let amount =  json.amount;
                    let currentAmount = document.querySelector(".wallet__amount");
                    currentAmount.innerHTML = amount
                
            }).catch(error => {
    
                console.log(error)
    
            })




//transfers ophalen
fetch('http://localhost:3000/api/v1/transfers', {
    "headers": {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    // console.log(json);

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

}).catch(error => {
    
    console.log(error)
    
})


let logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
})


