const tableBody = document.getElementById("tableBody");// taking table body first

async function loadData()
{
    try{
        const response= await fetch("/api/data");//collecting data from the api where the query was runned
        const data=await response.json();//converting to json that collected data

        tableBody.innerHTML="";

        data.forEach((item) => {
         
        const row=document.createElement("tr");//creating each row for new data
        row.className ="text-black border-b border-gray-700 hover:bg-gray-800 hover:text-white"; //same class name for every row

        //inserting data in row which is in table body
        row.innerHTML= `<th class="px-6 py-4 font-medium">${item.id}</th>
        <td class="px-6 py-4">${item.name}</td>
        <td class="px-6 py-4">${item.title}</td>
        <td class="px-6 py-4">
          <a class="text-blue-400 hover:underline" href="v_data.html?id=${item.id}">
            VIEW
          </a>
        </td>`;
        
         tableBody.appendChild(row);

        });

    }catch(error){
        console.log("Error in fetching Data",error);
    }
}

loadData();