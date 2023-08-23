

$(document).ready(function(){
$.ajax({
    url: "https://63407044d1fcddf69cb8c368.mockapi.io/academies",
    type: 'GET',

    success: function(academii){
        
        elements = ""
        for (let i = 0; i < academii.length; i++) {
            const academija = academii[i];
           
           
            elements += '<div class="card ml-2px mr-5px kart" style="display:inline-block ">\
            <img src='+ academija.image+' class="card-img-top" alt="...">\
            <div class="card-body text-center ">\
              <h5 class="card-title ">'+academija.name+'</h5>\
              <p class="card-text">'+academija.price+'</p>\
              <a href="#" class="btn btn-primary" id='+academija.id+' onclick=addToCart('+academija.id+')>Додади во кошничка</a>\
            </div>\
          </div>'
           
           
            
        }
        $("#akademii").html(elements)
        for (let i = 0; i < academii.length; i++) {
          checkAcademyInCart(i)
        }

    }
})

$("#numAcademies").text(getNumAcademiesInCart())


$("#academies-cart").click(function(){
  $.ajax({
    url: "https://63407044d1fcddf69cb8c368.mockapi.io/academies",
    type: 'GET',

    success: function(academii){
        elements = ""
        academies_id = localStorage.getItem("academiesInCart")
        let totalSum = 0
        if(academies_id !== null) {
          academies_id = academies_id.split(";")
          for (let i = 0; i < academies_id.length; i++) {//ids in local storage
            for (let y = 0; y < academii.length; y++) { //academies from api
              if (academies_id[i] == academii[y].id){
                console.log(academii[y].name)
                elements+='<div class="row" id="incart-'+academii[y].id+'">\
                <div class="col-md-3">\
                    <img src="'+academii[y].image+'" alt="" class="mt-4 ml-3">\
                </div>    \
                <div class="col-md-9">\
                    <h2 class="text-center pt-1 ">'+academii[y].name+'</h2>\
                    <p class="text-center">'+academii[y].price+'</p>\
                    <button type="button" class="text-center pt-1 pb-1 pl-2 pr-2" onclick="removeAcademy('+academii[y].id+')">Remove</button></div></div> '
              
              totalSum+=academii[y].price
                  }
              
            }
          }
          $("#added-academies").html(elements)
          $("#totalSum").text(totalSum)
    }
  }
})



})})

function checkAcademyInCart(id){
  academies_id = localStorage.getItem("academiesInCart")
  if(academies_id !== null) {
    academies_id = academies_id.split(";")
    if (academies_id.includes(id.toString())){
      $("#"+id).addClass("disabled-btn")
    }
 }
 else{
 return false;

 }
}


function getNumAcademiesInCart(){
  academies_id = localStorage.getItem("academiesInCart")
 if(academies_id === null) {
  return 0

 }
 else{
  num = academies_id.split(";")

 return num.length

 }
}

function addToCart(akademija){
 console.log(akademija)

 //ako ima akademija u local storage da se zeme i da se dodadeno novoto id

 academies_id = localStorage.getItem("academiesInCart")
 if(academies_id === null) {
  console.log(academies_id)
  localStorage.setItem("academiesInCart", akademija)

 }
 else{
  academies_id += ";"+akademija
  localStorage.setItem("academiesInCart", academies_id)

 }
 
 $("#numAcademies").text(getNumAcademiesInCart())


// tuka dodadi ja klasata na kopceto so toa id na akademija
$("#"+akademija).addClass("disabled-btn")
}

function removeAcademy(id) {
  let academies_id = localStorage.getItem("academiesInCart");
  
  if (academies_id !== null) {
    academies_id = academies_id.split(";");
    console.log(academies_id);
    
    const index = academies_id.indexOf(id.toString());  // Convert id to string and find its index
    if (index !== -1) {
      academies_id.splice(index, 1);  // Use index to remove the item
    }
    
    academies_id = academies_id.join(";");
    console.log(academies_id);
    if (academies_id === ""){
      localStorage.removeItem("academiesInCart",);
    }
    else{
      localStorage.setItem("academiesInCart", academies_id);

    }
    $("#incart-"+id).remove();
    $("#"+id).removeClass("disabled-btn");
    $("#numAcademies").text(getNumAcademiesInCart());
  }
}