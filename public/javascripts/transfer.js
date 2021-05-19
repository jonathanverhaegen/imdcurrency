let sendBtn = document.querySelector('#sendCoins');

sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    let amount = parseInt(document.querySelector("#amount").value);
    let receiver = document.querySelector("#receiver").value
    let reason =  document.querySelector("#reason").value;
    let message =  document.querySelector("#message").value;

    if(amount > 0){
        
        fetch('http://localhost:3000/api/v1/transfers', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            "receiverMail": receiver,
            "amount": amount,
            "reason": reason,
            "text": message
        })
        }).then(result =>{
            return result.json();
        }).then(json => {
            
            //terug sturen naar de wallet
            window.location.href = "index.html";

        }).catch(error => {
    
            console.log(error)
            
        })


    }else{
        let feedback = document.querySelector(".alert");
                feedback.textContent = "Please enter a valid number that is higher than 0";
                feedback.classList.remove("hidden");
    }

    
    
})