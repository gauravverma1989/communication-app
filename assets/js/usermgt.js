
tableIteration();

function tableIteration() {
    var data = getFromLocalStorage();
    var tableData = document.getElementById("userTable");
    tableData.innerHTML = '';
    if (tableData) {
        for (var i = 0; i < data.length; i++) {
            var row = `<tr>
                  <td>${data[i].name}</td>
                  <td  class="text-center">${data[i].email}</td>
                  <td class="text-center"><a href="edit.html?userId=${data[i].id}">Edit</a> | <a onclick="deleteConfirmBox(${i});">Delete</a></td>
             </tr>`

            tableData.innerHTML += row;
        }
    }
}