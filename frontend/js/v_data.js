const params= new URLSearchParams(window.location.search);//getting url of current page
const id=params.get("id");//fetching id of current page from the url

async function loadData() {
    const response=await fetch(`/api/data/${id}`);  //fetch data by actually going to this api
    const result=await response.json();//stores the fetched data
    console.log(result);
    document.getElementById("title").textContent = result.title;

    document.getElementById("description").textContent = result.description;

    document.getElementById("name").textContent = result.name;

    document.getElementById("uid").textContent ="uid:"+result.uid;
}

loadData();

const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", async () => {

  const response = await fetch(`/api/data/${id}`, {
    method: "DELETE"
  });

  const result = await response.json();

  window.location.href = "/";//redirecting to home page

});

//redirecting to edit while clicking edit btn
const editBtn = document.getElementById("editBtn");

editBtn.addEventListener("click", () => {
  window.location.href = `/add.html?id=${id}`;
});