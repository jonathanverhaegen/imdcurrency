//redirecten als een user niet is ingelogd

if(localStorage.getItem('token') === null){
    window.location.href = "login.html";    
}

const url = process.env.url;

primus = Primus.connect("/", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
      , min: 500 // Number: The minimum delay before we try reconnect.
      , retries: 10 // Number: How many times we should try to reconnect.
    }
  });

  

let sendBtn = document.querySelector('#sendCoins');

sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    let amount = parseInt(document.querySelector("#amount").value);
    // let receiver = document.querySelector("#receiver").value
    let firstname = document.querySelector("#firstname").value;
    let lastname = document.querySelector("#lastname").value
    let reason =  document.querySelector("#reason").value;
    let message =  document.querySelector("#message").value;

    if(amount > 0){
        
        fetch(url + "/api/v1/transfers", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            // "receiverMail": receiver,
            "firstname": firstname,
            "lastname": lastname,
            "amount": amount,
            "reason": reason,
            "text": message
        })
        }).then(result =>{
            return result.json();
        }).then(json => {
            if(json.status === "success"){

                primus.write({
                    "action": "add transfer",
                    "data": json
                });

                //terug sturen naar de wallet
                window.location.href = "index.html";

            }

            if(json.status === "error"){
                let error = json.message
                let feedback = document.querySelector(".form__alert");
                feedback.textContent = error;
                feedback.classList.remove("hidden");

            }

            

            

        }).catch(error => {
    
            console.log(error)
            
        })


    }else{
        
        let feedback = document.querySelector(".form__alert");
        feedback.textContent = "Please enter a valid number that is higher than 0";
        feedback.classList.remove("hidden");
    }

    
    
})

// Logout
logout.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "login.html";
})

//list van de voornamen in de datalink zetten

const listFirstnames = () => {
    fetch(url + '/api/v1/users', {
        "headers": {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            }).then(result => {
                return result.json();
            }).then(json => {
                let users = json.user;
                
                users.forEach((user)=>{
                    let firstnames = document.createElement("option");
                    firstnames.className = "form__option"
                    firstnames.innerHTML = user.firstname;
                    document.querySelector("#listFirstname").appendChild(firstnames);
                    
                })    
            }).catch(error => {
    
                console.log(error)
    
            })
}

//kijken welke voornaam er is ingeven en op basis daarvan de achternamen zoeken 

const listLastnames = () => {
    let firstname = document.querySelector("#firstname").value;
    
    fetch(url + '/api/v1/users/firstname/' + firstname, {
        "headers": {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            }).then(result => {
                return result.json();
            }).then(json => {
                let users = json.user;
                
                users.forEach((user)=>{
                    let lastnames = document.createElement("option");
                    lastnames.className = "form__option"
                    lastnames.innerHTML = user.lastname;
                    document.querySelector("#listLastname").appendChild(lastnames);
                })    
            }).catch(error => {
    
                console.log(error)
    
            })
}

//bij het opstarten van de pagina wordt er een lijst gemaakt 

listFirstnames();

//als 
document.querySelector("#firstname").addEventListener("change", (e)=>{
    listLastnames();
})




    
