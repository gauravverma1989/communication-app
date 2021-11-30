
let files = localStorage.getItem("files");

if (files) {
    files = JSON.parse(files)
} else {
    files = [];
}

let user = getLoggedInUser();

function tableIteration() {
    var preData = localStorage.getItem("files");
    var data = JSON.parse(preData);
    var tableData = document.getElementById("userTable");
    tableData.innerHTML = '';
    if (tableData) {
        for (var i = 0; i < data.length; i++) {
            var row = `<tr>
                  <td>${data[i].label}</td>
                  <td  class="text-center">${data[i].filename}</td>
                  <td class="text-center"><a data-toggle="modal" data-target="#myModal-a" href="">Edit</a> | <a href=""
            onclick="deleteConfirmBox()">Delete</a> | <a href="#">Share</a></td>
             </tr>`

            tableData.innerHTML += row;
        }
    }
}
tableIteration();

function addFile() {
    let fileName = document.getElementById('fileName').value;
    if (fileName) {
        files.push({
            label: files.length + 1,
            name: user.name,
            filename: fileName
        })

        localStorage.setItem("files", JSON.stringify(files));
        tableIteration();
        document.getElementById('fileName').value = "";
    }

}
