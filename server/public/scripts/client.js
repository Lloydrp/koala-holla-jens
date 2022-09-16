console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $("#addButton").on("click", saveKoala);
}

function getKoalas() {
  console.log("in getKoalas");
  // ajax call to server to get koalas
  $.ajax({
    method: "GET",
    url: "/koalas",
  })
    .then((result) => {
      console.log("result :>> ", result);
      for (const koala of result) {
        $("#viewKoalas").append(`
          <tr data-koalaid=${koala.id}>
            <td>${koala.name}</td>
            <td>${koala.age}</td>
            <td>${koala.gender}</td>
            <td>${koala.ready_to_transfer ? "Ready" : "Not Ready"}</td>
            <td>${koala.notes}</td>
            <td>
              <button class="transfer-button">Transfer</button>
              <button class="delete-button">Delete</button>
            </td>
          </tr>        
        `);
      }
    })
    .catch((error) => {
      console.log("error in getKoalas :>> ", error);
    });
} // end getKoalas

function saveKoala(newKoala) {
  console.log("in saveKoala", newKoala);
  // convert yes/no to true/false
  let readyBinary = $('#readyForTransferIn').val();

  readyBinary === 'Yes' ? readyBinary = true : readyBinary = false;

  console.log('ready to transfer', readyBinary);

  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data: {
        name: $('#nameIn').val(),
        age: $('#ageIn').val(),
        gender: $('#genderIn').val(),
        readyForTransfer: $('#readyForTransferIn').val(),
        notes: $('#notesIn').val()
    }
    }).then( ()=> {
      console.log("POST Sucessful");
  })
}

function deleteKoala(event) {
  const currentKoala = $(event.target).data("koalaid");
  console.log("currentKoala :>> ", currentKoala);

  $.ajax({
    method: "DELETE",
    url: `/koalas/${currentKoala}`,
  })
    .then(() => {
      getKoalas();
    })
    .catch((error) => {
      console.log("error in delete koala :>> ", error);
    });
}
