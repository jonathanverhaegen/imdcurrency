let btnLogin = document.querySelector(".btn");

btnLogin.addEventListener("click", function(e){
    
    e.preventDefault();
    
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    fetch('https://imdcoin-imd.herokuapp.com/api/v1/acounts/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": email,
            "password": password
        })
        }).then(result =>{
            return result.json();
        }).then(json => {
            if(json.status === "success"){
                
                let token = json.data.token;
                
                
                localStorage.setItem("token", token);
                
                window.location.href = "index.html";
                
            }else{

                let feedback = document.querySelector(".form__alert");
                feedback.textContent = "Wrong email or password";
                feedback.classList.remove("hidden");

            }
        })

})