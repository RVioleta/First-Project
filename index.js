/* Da se kreiraat register i login kopcinja vo navbar-ot. 
Register opcijata ke otvara register modal kade sto ke ima forma za register so validacii za email i password 
- podolg od 10 karakteri so barem edna golema bukva i barem eden specijalen karakter. 
Po submit na register formata da se prati povik do backend i da se otvori login modalot. 
Vo login modalot da ima 2 polinja za email i password so validacija za email poleto. 
Po submit na login formata da se zeme random (vo tocka 1 na kraj e opisano kako da se zeme random)
 korisnik od backend i da se zapise vo localstorage */
 function validacija(email, password){
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}|[\]\\:';"<>?,./]).{10,}$/;
    if (email.includes("@") && passwordRegex.test(password)){
        console.log("ke go bide")
        return true;    
    }
    else{
        return false;
    }

 }

$(document).ready(function(){
    $("#login").click(function(){
        
        const email = $("#email").val()
        const password = $("#password").val()

        if (validacija(email, password)){
            $.ajax({
                url:'https://63407044d1fcddf69cb8c368.mockapi.io/users',
                type: 'GET',

                success: function(response){
                    const numUsers = response.count;
                    let userId =  Math.floor(Math.random() * numUsers);
                    console.log(userId)
                    $.ajax({
                        url:'https://63407044d1fcddf69cb8c368.mockapi.io/users/'+userId,
                        type: 'GET',
                        success: function(response){
                            const numUsers = response.count;
                            let userId =  Math.floor(Math.random() * numUsers);
                            console.log(userId)
                        }                    
                    })
                }            
            })
        }
        else{
            console.log("validacijta ne pominuva")
        }
        
        
    })
    $("#register").click(function(){
        console.log("asdasd")
        const emailRegister = $("#email-register").val();
        const pswRegister = $("#psw-register").val();

        userObj = {
            "email":emailRegister,
            "password":pswRegister
        }
        if (validacija(emailRegister, pswRegister)){
            $.ajax({
                url:'https://63407044d1fcddf69cb8c368.mockapi.io/users',
                type: 'POST',
                body: userObj,
                success:function(response){
                    console.log(response)
                }

            })
        
        }
        else{
            console.log("validacijta ne pominuva")
        }
})
})

    
    