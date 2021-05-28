let btnSignup = document.querySelector(".btn");
const url = process.env.url;


btnSignup.addEventListener("click", function(e){
    e.preventDefault();
    

    let firstname = document.querySelector("#firstname").value;
    let lastname = document.querySelector("#lastname").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    

    fetch(url+'/api/v1/acounts/signup', {
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
                
                let token = json.data.token;
                localStorage.setItem("token", token);
                window.location.href = "index.html";
            }else{
                console.log(json);
                let feedback = document.querySelector(".form__alert");
                feedback.textContent = json.message;
                feedback.classList.remove("hidden");
            }
        })
})