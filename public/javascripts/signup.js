let btnSignup = document.querySelector(".btn-signup");



btnSignup.addEventListener("click", function(e){
    e.preventDefault();

    let username = document.querySelector(".username-signup").value;
    let password = document.querySelector(".password-signup").value;

    

    fetch('http://localhost:3000/api/v1/users/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
        }).then(result =>{
            return result.json();
        }).then(json => {
            if(json.status === "succes"){
                let feedback = document.querySelector(".alert");
                feedback.textContent = "signup completed";
                feedback.classList.remove("hidden");

                let token = json.data.token;
                localStorage.setItem("token", token);
                window.location.href = "index.html";
            }
        })
})