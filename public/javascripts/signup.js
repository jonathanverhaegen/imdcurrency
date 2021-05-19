let btnSignup = document.querySelector(".btn");



btnSignup.addEventListener("click", function(e){
    e.preventDefault();
    

    let firstname = document.querySelector(".firstname").value;
    let lastname = document.querySelector(".lastname").value;
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;

    

    fetch('http://localhost:3000/api/v1/users/signup', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "firstname": firstname,
            "lastname": lastname,
            "username": email,
            "password": password
        })
        }).then(result =>{
            return result.json();
        }).then(json => {
            if(json.status === "success"){
                let feedback = document.querySelector(".alert");
                feedback.textContent = "signup completed";
                feedback.classList.remove("hidden");

                let token = json.data.token;
                
                localStorage.setItem("token", token);
                window.location.href = "index.html";
            }
        })
})