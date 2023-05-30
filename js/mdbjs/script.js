//-------------------------------for home page form functionality------------------------------------------
      
var radioButtons = document.getElementsByName("college_type");
var district = document.getElementById("employeeHomedistrict");
var button = document.getElementById('regmod');

district.addEventListener('change', function () {
  if (district.value == "Select a district") {
    button.disabled = true;
    const kgidField = document.querySelector('#textKGID');
  }
  });

for (var i = 0; i < radioButtons.length; i++) {
  radioButtons[i].addEventListener('change', function () {
    if (district.value !== "Select a district") {
      let button = document.getElementById('regmod');
      button.removeAttribute('disabled');const kgidField = document.querySelector('#textKGID');
    } else{
      alert('first select the DISTRICT of College');
      this.checked=false;
    }
  })
}
//--------------------------------------for admin redirection--------------------------------------------

function redirect() {
  console.log('checked')
  if (localStorage['valid']){
    window.location='dashboard.html';
  } else {
    window.location='auth-login-basic.html';
  }
}

//------------------------------for uploading the Potrait image------------------------------------------

const fileInputElement = document.querySelector("input#input1");
const clearButton = document.querySelector(".clear_button");
const imagePreview = document.querySelector(".preview-image");
const videoScreen = document.querySelector("#video");

const changePreviewOnUpload = (fileName, fileType, fileSize, previewURL) => {
  if (fileType.includes("image")) {
    imagePreview.setAttribute("src", previewURL);
  } else {
    imagePreview.setAttribute("src", "images/placeholder-file.png");
  }

  clearButton.style.display = "inline-flex";
};

fileInputElement.addEventListener("change", (e) => {
  console.log(fileInputElement.files[0]);
  const fileObject = fileInputElement.files[0];
  const objectURL = URL.createObjectURL(fileObject);
  console.log(objectURL);

  changePreviewOnUpload(
    fileObject.name,
    fileObject.type,
    fileObject.size,
    objectURL
  );
});

clearButton.addEventListener("click", (e) => {
  imagePreview.setAttribute("src", "images/placeholder-image.png");
  videoScreen.setAttribute("video");
  clearButton.style.display = "none";
});
//---------------------Function to disable previous date section for issue date nd payment date-----------------------------------
$(function () {
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var maxDate = year + "-" + month + "-" + day;

  // or instead:
  // var maxDate = dtToday.toISOString().substr(0, 10);

  /*     alert(maxDate);
   */ $(".disableDate").attr("min", maxDate);
});
//------------------------------for Getting Receipt Number onclick of checkbox------------------------------------------

// Get the checkbox element
const checkbox = document.getElementById("employeeSalaryVariableCheck");

// Get the receipt number input element
const receiptNumInput = document.getElementById("employeeLastName");

// Add an event listener to the checkbox
checkbox.addEventListener("click", function () {
  // Check if the checkbox is checked
  if (checkbox.checked) {
    // Generate the receipt number using the current date and time
    const date = new Date();
    const receiptNum =
      date.getHours().toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0") +
      date.getMinutes().toString().padStart(2, "0") +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getSeconds().toString().padStart(2, "0") +
      date.getFullYear().toString();

    // Set the value of the receipt number input
    receiptNumInput.value = receiptNum;

    // Enable the receipt number input
    receiptNumInput.disabled = false;
  } else {
    // Clear the value of the receipt number input
    receiptNumInput.value = "";

    // Disable the receipt number input
    receiptNumInput.disabled = true;
  }
});
//------------------------------for printing the state , city------------------------------------------
// print_state("employeeHomeState");

print_state("employeeCommunicationState");

//------------------------------for Changing the language------------------------------------------

function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

//------------------------------Dynamic Creation of Elements------------------------------------------

// tableEle = document.getElementById("employees");
// let cnt = 0;
// function row(user) {
//   const empId = user["emp_contact"];
//   trEle = document.createElement("tr");
//   trEle.classList.add("user");
//   tdEle = document.createElement("td");
//   var checkbox = document.createElement("INPUT"); //Added for checkbox
//   checkbox.type = "checkbox"; //Added for checkbox
//   checkbox.id = empId;
//   var editIcon = document.createElement("i");
//   editIcon.classList.add("fa-solid", "fa-pen-to-square", "editbtn");
//   editIcon.id = empId;
//   tdEle.append(checkbox); //Added for checkbox
//   tdEle.append(editIcon); //Added for edit icon
//   trEle.appendChild(tdEle);
//   tdEle = document.createElement("td");
//   cnt += 1;
//   aEle = document.createElement("a");
//   aEle.href = "login.html";
//   console.log(aEle)
//   // aEle.href = "login.html?id=" + empId;
//   aEle.textContent = cnt;
//   tdEle.appendChild(aEle);
//   trEle.appendChild(tdEle);
//   for (let detail of Object.keys(user)) {
//     tdEle = document.createElement("td");
//     tdEle.textContent = user[detail];
//     tdEle.classList.add("editable");
//     trEle.appendChild(tdEle);
//   }
//   tableEle.appendChild(trEle);
// }

// function appendData(data) {
//   // console.log(data)
//   for (let i = 0; i < data.length; i++) {
//     row(data[i]);
//   }
//   createEditBtns();
// }

//------------------------------Dynamic Creation of Edit Buttons with icon------------------------------------------

function createEditBtns() {
  let editableCells = ""; // for editing the specified row cells
  let editButtons = document.querySelectorAll(".editbtn"); // for edit icons

  function edit(editableCells) {
    editableCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        let input = document.createElement("input");
        input.type = "text";
        input.value = cell.innerText;
        input.addEventListener("blur", () => {
          cell.innerText = input.value;
        });
        cell.innerText = input.value;
        cell.appendChild(input); // here the new value getting stored
        input.focus(); // function exit by lossing it's focus
      });
    });
  }
  async function postReq(req, empCon) {
    const url = serverAddress + "admin/dashboard/" + empCon;
    let data = req;
    // PUT request using fetch with async/await
    console.log("before:", typeof data);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    console.log("after:", typeof requestOptions["body"]);
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log(result);
    location.reload();
  }

  editButtons.forEach((i) => {
    i.addEventListener("click", (event) => {
      console.log("clicked");
      let empId = event.target.id;
      let rows = document.querySelectorAll(".user");
      // console.log(rows)
      rows.forEach((row) => {
        let rowEmpId = row.firstChild.lastChild.id;
        if (rowEmpId === empId) {
          // console.log(row.childNodes[6])
          if (
            row.firstChild.childNodes[1].classList.value.includes(
              "text-success"
            )
          ) {
            row.firstChild.childNodes[1].classList.remove(["text-success"]);
            const data = {
              full_name: row.childNodes[2].textContent,
              content_subject: row.childNodes[3].textContent,
              eligibility: row.childNodes[4].textContent,
              clg_street_name: row.childNodes[5].textContent,
              clg_state: row.childNodes[6].textContent,
              clg_city: row.childNodes[7].textContent,
              clg_contry: row.childNodes[8].textContent,
              clg_zip_code: row.childNodes[9].textContent,
              clg_code: row.childNodes[10].textContent,
              emp_street_name: row.childNodes[11].textContent,
              emp_state: row.childNodes[12].textContent,
              emp_city: row.childNodes[13].textContent,
              emp_contry: row.childNodes[14].textContent,
              emp_zip_code: row.childNodes[15].textContent,
              // emp_contact: row.childNodes[16].textContent,
              emp_alt_contact: row.childNodes[17].textContent,
              issue_date: row.childNodes[18].textContent,
              joining_date: row.childNodes[19].textContent,
              fee: row.childNodes[20].textContent,
              transact_date: row.childNodes[21].textContent,
              reciept_num: row.childNodes[22].textContent,
              blood_grp: row.childNodes[23].textContent,
            };
            console.log(data);
            postReq(data, row.childNodes[16].textContent);
            // fetch('http://127.0.0.1:5000/admin/dashboard/'+empId,{
            //   method: 'PUT',
            //   headers: {
            //     'Content-Type':'application/json'
            //   },
            //   body: JSON.stringify()
            // })
            //   .then(x => x.json())
            //   .then(y => console.log(y))
            // window.location.assign("http://localhost:3000/html/dashboard.html")
            return;
          }
          row.firstChild.childNodes[1].classList.add("text-success");
          console.log(row.firstChild.childNodes[1]);
          let cells = row.querySelectorAll(".editable");
          console.log(cells);
          cells.forEach((cell) => {
            edit(cells);
          });
        }
      });
    });
  });
}

//------------------------------ for Getting The final data with appended values ------------------------------------------

// fetch("http://localhost:5000/admin/dashboard/0")
//   .then((x) => x.json())
//   .then((y) => appendData(y));

//------------------------------ Master CheckBox to check the values ------------------------------------------

function checkAll(o) {
  var boxes = document.getElementsByTagName("input");
  for (var x = 0; x < boxes.length; x++) {
    var obj = boxes[x];
    if (obj.type == "checkbox") {
      if (obj.name != "check") obj.checked = o.checked;
    }
  }
}
//------------------------------ Delete Function to delete the records from table ------------------------------------------
function delData(empPh) {
  const url = serverAddress + "admin/dashboard/" + empPh;
  (async () => {
    // PUT request using fetch with async/await
    const requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(url, requestOptions);
    const result = await response.text();
    console.log(result);
  })();
}
const tableEle = document.getElementById("employees");
async function deleteRow() {
  let checkboxs = tableEle.querySelectorAll("input[type='checkbox']:checked");
  await checkboxs.forEach((checkbox) => {
    delData(checkbox.id);
    checkbox.parentElement.parentElement.remove();
  });
  console.log("done");
  // location.reload();
}
// ().then(location.reload());

//------------------------------ Radio Click Show Text Box ------------------------------------------

function showGov() {
  document.getElementById("textKGID").style.display = "block";
  document.getElementById("textHRMS").style.display = "none";
}
function showAid() {
  document.getElementById("textHRMS").style.display = "block";
  document.getElementById("textKGID").style.display = "none";
}

//------------------------------ Enable any one option for image upload ------------------------------------------
function disableBtn() {
  document.getElementById("input1").disabled = true;
}

function enableBtn() {
  document.getElementById("start-camera").disabled = true;
}
//------------------------------  BLOB for image upload ------------------------------------------

function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    var a = reader.result.replace(/^.+,/, "");
   
    console.log(a);
    document.querySelector("#base64ConvertValue").value = a;

    //   console.log('RESULT', reader.result['data'])
  };
  reader.readAsDataURL(file);
  // console.log(reader)
}

//------------------------------  BLOB for image Capture ------------------------------------------
function encodeCaptureImageFileAsURL(element) {
  var captureFile = element.files[0];
  var imageReader = new canvas();
  reader.onloadend = function () {
    console.log("RESULT", reader.result);
  };
  reader.readAsDataURL(captureFile);
}
//------------------------------------------------------------------------------------------------------
function showClearButton() {
  document.getElementById("clear-photo").style.display = "block";
}
function showClickPhotoButton() {
  document.getElementById("click-photo").style.display = "block";
}

//-----------------------------------------------------------------------------------------------
const clearCaptureButton = document.querySelector("#clear-photo");
clearCaptureButton.addEventListener("click", (e) => {
  imagePreview.setAttribute("src", "images/placeholder-image.png");
  videoScreen.setAttribute("video");
  clearButton.style.display = "none";
});
