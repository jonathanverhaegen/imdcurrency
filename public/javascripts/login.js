let btnLogin = document.querySelector(".btn");

btnLogin.addEventListener("click", function(e){
    
    e.preventDefault();
    
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;

    fetch('http://localhost:3000/api/v1/users/login', {
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
            if(json.status === "succes"){
                
                let token = json.data.token;
                localStorage.setItem("token", token);
                window.location.href = "index.html";
                
            }else{

                let feedback = document.querySelector(".alert");
                feedback.textContent = "Login failed";
                feedback.classList.remove("hidden");

            }
        })

})