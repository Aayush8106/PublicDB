let textarea=document.getElementById("textarea");
let max=document.getElementById("max");
let form=document.querySelector(".form");
max.textContent="0/255";  

//creating event for gatting length of textarea
textarea.addEventListener('input',function(){
 let char=textarea.value;//getting everything from the char
 let val=char.length;//getting final value
  max.textContent=val+"/255";//adding the derived value to html
});

//checking if page opened in edit mode
const params = new URLSearchParams(window.location.search);
const editId = params.get("id");

//fetching existing data and filling form
if(editId){

  fetch(`/api/data/${editId}`)
  .then(response => response.json())
  .then(data => {

    document.getElementById("id").value = data.uid;
    document.getElementById("name").value = data.name;
    document.getElementById("title").value = data.title;
    document.getElementById("textarea").value = data.description;

    //updating character counter
    max.textContent = data.description.length + "/255";
  });

}

//form validation
form.addEventListener("submit",(e)=>{

const uid=document.getElementById("id").value;
const inputs=document.querySelectorAll('input[type="text"]');//taking all input at once

const name=inputs[0].value;
const title=inputs[1].value;

const desc=textarea.value;

//checking for blank input 
if(uid.trim()==="" || name.trim()==="" || title.trim()==="")
{
  e.preventDefault();
  alert("Fields cannot be empty.");
  return;
}

if (desc.trim()==="" ||desc.length === 0) {
  e.preventDefault();
  alert("Description cannot be empty.");
  return;
}

//checking if page opened in edit mode
if(editId){

  e.preventDefault();

  fetch(`/api/data/${editId}`,{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      uid,
      name,
      title,
      textarea:desc
    })
  })
  .then(response => response.json())
  .then(data => {

    alert(data.message);

    window.location.href=`/v_data.html?id=${editId}`;

  })
  .catch(error=>{
    console.log(error);
    alert("Update Failed");
  });

}

});