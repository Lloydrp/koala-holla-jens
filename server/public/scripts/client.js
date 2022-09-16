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



  // call saveKoala with the new obejct
  saveKoala(koalaToSend);



  //   }
  // })

}
