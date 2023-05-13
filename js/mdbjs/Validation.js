// console.log('loaded')
function myf(e) {
  var c = ((e.which >= 65 && e.which < 91) || (e.which == 8))
  {
    document.getElementById("error").style.display = c ? "none" : "inline"
  }
  return c;
}
let isNumber = (evt) => {
  let iKeyCode = (evt.which) ? evt.which : evt.keyCode
  if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
    return false;

  return true;

}
//---------------------------------Validations -----------------------------------------------
// --------------------------------For Register---------------------------------------------
function validateF() {
  
  let button = document.getElementById('regmod');
  button.removeAttribute('data-bs-toggle')
  button.removeAttribute('data-bs-target')
  var district = document.getElementById("employeeHomedistrict");
  var radioButtons = document.getElementsByName("college_type");
  var checked = false;
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      checked = true;
      break;
    }
  }

  if (district.value === "Select a district") {
    alert("District cannot be blank");
    return false;
  } else if (!checked) {
    alert("Please select one of the college types");
    college_type.classList.add("highlight");
    setTimeout(function () {
      college_type.classList.remove("highlight");
    }, 3000);
    return false;
  } else {
    const kgidField = document.querySelector('#textKGID');
    const selectedOption = document.querySelector('input[name="college_type"]:checked');
    if (selectedOption.value === 'government') {
      if (kgidField.value === '') {
        alert('Please enter a value for KGID');
        return false;
      }
    }

    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#staticBackdrop');

    return true;

  }
}







function validateForm() {
  const nameInput = document.getElementById("employeeFirstName");
  const subjectInput = document.getElementById('employeeSubject');
  const KgidInput = document.getElementById('textkg');
  const qualificationInput = document.getElementById('employeeQualification');
  const clgStreet = document.getElementById('clg_street_name');
  const clgTaluka = document.getElementById('employeeCollegeTaluk');
  const empStreet = document.getElementById('streetName');
  const empTaluk = document.getElementById('employeeHomeTaluk');
  const zipcode = document.getElementById('zipCode');
  const collegecode = document.getElementById('collegeCode');
  const emphomezipCode = document.getElementById('emphomezipCode');
  const contact = document.getElementById('contactNumber');
  const altcontact = document.getElementById('altcontactNumber');
  const fee = document.getElementById('fee');

  console.log('triggered')

  // Check if name field is empty
  if (nameInput.value.trim() === "") {
    alert("Full Name Can't be Blank!!!!");
    nameInput.classList.add("highlight");
    setTimeout(function () {
      nameInput.classList.remove("highlight");
    }, 3000);
    return false;
  }



  // Check if name field contains only letters
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(nameInput.value)) {
    alert("Full Name contains only Alphabets Enter only Alphabets ");
    nameInput.classList.add("highlight");
    setTimeout(function () {
      nameInput.classList.remove("highlight");
    }, 3000);
    return false;
  }



  if (subjectInput.value.trim() === "") {
    alert("Subject Field Cant be Blank..Please Mention Subject....");
    subjectInput.classList.add("highlight");
    setTimeout(function () {
      subjectInput.classList.remove("highlight");
    }, 3000);
    return false;
  }

  const subjectRegex = /^[a-zA-Z\s]+$/;
  if (!subjectRegex.test(subjectInput.value)) {
    alert("Subject field Contains Only Alphabets Enter only Alphabets...");
    subjectInput.classList.add("highlight");
    setTimeout(function () {
      subjectInput.classList.remove("highlight");
    }, 3000);
    return false;
  }

  if (qualificationInput.value.trim() === '') {
    alert("Qualification Field Cant be Blank..Please Mention Qualification....");
    qualificationInput.classList.add("highlight");
    setTimeout(function () {
      qualificationInput.classList.remove("highlight");
    }, 3000);
    return false;
  }

  const qualificationRegex = /^[a-zA-Z\s.]+$/;
  if (!qualificationRegex.test(qualificationInput.value)) {
    alert("Qualifcation field Contains Only Alphabets Enter only Alphabets...");
    qualificationInput.classList.add("highlight");
    setTimeout(function () {
      qualificationInput.classList.remove("highlight");
    }, 3000);
    return false;
  }
  var birthdateInput = document.getElementById("employeeDateofBirth");
  var birthdateValue = birthdateInput.value;

  if (!birthdateValue) {
    alert("Please select a Birth Date.");
    birthdateInput.classList.add("highlight");
    setTimeout(function () {
      birthdateInput.classList.remove("highlight");
    }, 3000);
    return false;
  }

  if (clgStreet.value.trim() === "") {
    alert("College Street Cant Be blank");
    clgStreet.classList.add("highlight");
    setTimeout(function () {
      clgStreet.classList.remove("highlight");
    }, 3000);
    return false;
  }
  const clgstreetRegex = /^[a-zA-Z\s]+$/;
  if (!clgstreetRegex.test(clgStreet.value)) {
    alert("College Street Contains Only Alphabets Enter only Alphabets...");
    clgStreet.classList.add("highlight");
    setTimeout(function () {
      clgStreet.classList.remove("highlight");
    }, 3000);
    return false;
  }

  // var statedropdown = document.getElementById("employeeHomeState");
  // var stateValue = statedropdown.value;

  // if (stateValue === "") {
  //   alert("Please select a College State.");
  //   statedropdown.classList.add("highlight");
  //   setTimeout(function() {
  //     statedropdown.classList.remove("highlight");
  //       }, 3000);
  //   return false;
  // }

  // var clgcitydropdown = document.getElementById("employeeHomeCity");
  // var clgcityValue = clgcitydropdown.value;

  // if (clgcityValue === "") {
  //   alert("Please select a College City.");
  //   clgcitydropdown.classList.add("highlight");
  //   setTimeout(function() {
  //     clgcitydropdown.classList.remove("highlight");
  //       }, 3000);
  //   return false;
  // }

  if (clgTaluka.value.trim() === "") {
    alert("College Taluk Cant Be blank");
    clgTaluka.classList.add("highlight");
    setTimeout(function () {
      clgTaluka.classList.remove("highlight");
    }, 3000);
    return false;
  }

  if (zipcode.value.trim() === "") {
    alert("Zip Code Cant Be blank");
    zipcode.classList.add("highlight");
    setTimeout(function () {
      zipcode.classList.remove("highlight");
    }, 3000);
    return false;
  }
  const zipcodeRegex = /^\d{6}$/;
  if (!zipcodeRegex.test(zipcode.value)) {
    alert("ZipCode Contains only 6 digits ");
    zipcode.classList.add("highlight");
    setTimeout(function () {
      zipcode.classList.remove("highlight");
    }, 3000);
    return false;
  }

  if (collegecode.value.trim() === "") {
    alert("College Code Cant Be blank");
    collegecode.classList.add("highlight");
    setTimeout(function () {
      collegecode.classList.remove("highlight");
    }, 3000);
    return false;
  }

  const clgcodeRegex = /^\d{5}$/;
  if (!clgcodeRegex.test(collegecode.value)) {
    alert("College Code Contains only 5 digits ");
    collegecode.classList.add("highlight");
    setTimeout(function () {
      collegecode.classList.remove("highlight");
    }, 3000);
    return false;
  }

  const clgtalukRegex = /^[a-zA-Z\s]+$/;
  if (!clgtalukRegex.test(clgTaluka.value)) {
    alert("College Taluk Contains Only Alphabets Enter only Alphabets...");
    clgTaluka.classList.add("highlight");
    setTimeout(function () {
      clgTaluka.classList.remove("highlight");
    }, 3000);
    return false;
  }

  if (empStreet.value.trim() === "") {
    alert("Employee Home Street Cant Be blank");
    empStreet.classList.add("highlight");
    setTimeout(function () {
      empStreet.classList.remove("highlight");
    }, 3000);
    return false;
  }
  const empstreetRegex = /^[a-zA-Z\s]+$/;
  if (!empstreetRegex.test(empStreet.value)) {
    alert("Employee Home Street Contains Only Alphabets Enter only Alphabets...");
    empStreet.classList.add("highlight");
    setTimeout(function () {
      empStreet.classList.remove("highlight");
    }, 3000);
    return false;
  }
  var empstatedropdown = document.getElementById("employeeCommunicationState");
  var empstateValue = empstatedropdown.value;

  if (empstateValue === "") {
    alert("Please select a Employer Home State.");
    empstatedropdown.classList.add("highlight");
    setTimeout(function () {
      empstatedropdown.classList.remove("highlight");
    }, 3000);
    return false;
  }

  var empcitydropdown = document.getElementById("employeeCommunicationCity");
  var empcityValue = empcitydropdown.value;

  if (empcityValue === "") {
    alert("Please select a Employer Home City.");
    empcitydropdown.classList.add("highlight");
    setTimeout(function () {
      empcitydropdown.classList.remove("highlight");
    }, 3000);
    return false;
  }

  if (empTaluk.value.trim() === "") {
    alert("Employee Home Taluk Cant be Blank!!!");
    empTaluk.classList.add("highlight");
    setTimeout(function () {
      empTaluk.classList.remove("highlight");
    }, 3000);
    return false;
  }

  const empTalukRegex = /^[a-zA-Z\s]+$/;
  if (!empTalukRegex.test(empTaluk.value)) {
    alert("Employee Home Taluk Contains Only Alphabets Enter only Alphabets...");
    empTaluk.classList.add("highlight");
    setTimeout(function () {
      empTaluk.classList.remove("highlight");
    }, 3000);
    return false;
  }

  if (emphomezipCode.value.trim() === "") {
    alert("Employee Home Zip Code Cant Be blank");
    emphomezipCode.classList.add("highlight");
    setTimeout(function () {
      emphomezipCode.classList.remove("highlight");
    }, 3000);
    return false;
  }

  const emphomezipCodeRegex = /^\d{6}$/;
  if (!emphomezipCodeRegex.test(emphomezipCode.value)) {
    alert("Employee Home ZipCode Contains only 6 digits ");
    emphomezipCode.classList.add("highlight");
    setTimeout(function () {
      emphomezipCode.classList.remove("highlight");
    }, 3000);
    return false;
  }
  if (contact.value.trim() === "") {
    alert("Employee Contact Cant be Blank!!!");
    contact.classList.add("highlight");
    setTimeout(function () {
      contact.classList.remove("highlight");
    }, 3000);
    return false;
  }


  // const contactRegex = /^[1-9][0-9]{9}$/;
  // if (!contactRegex.test(contact.value)) {
  //   alert("Contact Number should be 10 digits only...");
  //   contact.classList.add("highlight");
  //   setTimeout(function() {
  //     contact.classList.remove("highlight");
  //       }, 3000);
  //   return false;
  // }

  const contactRegex = /^[6-9][0-9]{9}$/;
  if (!contactRegex.test(contact.value) || contact.value.startsWith("0")) {
    alert("Enter a Valid contact Number");
    contact.classList.add("highlight");
    setTimeout(function () {
      contact.classList.remove("highlight");
    }, 3000);
    return false;
  }


  if (altcontact.value.trim() === "") {
    alert("Employee Alternate Contact Cant be Blank!!!");
    altcontact.classList.add("highlight");
    setTimeout(function () {
      altcontact.classList.remove("highlight");
    }, 3000);
    return false;
  }

  // const altcontactRegex = /^[1-9][0-9]{9}$/;
  // if (!altcontactRegex.test(altcontact.value)) {
  //   alert("Alternate Contact Number should be 10 digits only...");
  //   altcontact.classList.add("highlight");
  //   setTimeout(function() {
  //     altcontact.classList.remove("highlight");
  //       }, 3000);
  //   return false;
  // }
  const altcontactRegex = /^[6-9][0-9]{9}$/;
  if (!altcontactRegex.test(altcontact.value) || altcontact.value.startsWith("0")) {
    alert("Enter a Valid Alternate Contact Number");
    altcontact.classList.add("highlight");
    setTimeout(function () {
      altcontact.classList.remove("highlight");
    }, 3000);
    return false;
  }

  var issuedateInput = document.getElementById("employeeDateofissue");
  var dateValue = issuedateInput.value;

  if (!dateValue) {
    alert("Please select a Issue Date.");
    issuedateInput.classList.add("highlight");
    setTimeout(function () {
      issuedateInput.classList.remove("highlight");
    }, 3000);
    return false;
  }
  var joindateInput = document.getElementById("employeeDateofJoin");
  var dateValue = joindateInput.value;

  if (!dateValue) {
    alert("Please select a Employee Joining Date.");
    joindateInput.classList.add("highlight");
    setTimeout(function () {
      joindateInput.classList.remove("highlight");
    }, 3000);
    return false;
  }
  if (fee.value.trim() === "") {
    alert("Please Enter the Fees Amount");
    fee.classList.add("highlight");
    setTimeout(function () {
      fee.classList.remove("highlight");
    }, 3000);
    return false;
  }
  const feeRegex = /^\d{3}$/;
  if (!feeRegex.test(fee.value)) {
    alert("fee value should be in digits and upto 3 decimals");
    fee.classList.add("highlight");
    setTimeout(function () {
      fee.classList.remove("highlight");
    }, 3000);
    return false;
  }
  var transactdateInput = document.getElementById("employeeDateoftransact");
  var dateValue = transactdateInput.value;

  if (!dateValue) {
    alert("Please select a Fee Transaction Date.");
    transactdateInput.classList.add("highlight");
    setTimeout(function () {
      transactdateInput.classList.remove("highlight");
    }, 3000);
    return false;
  }
  var dropdown = document.getElementById("bloodgroup");
  var selectedbloodValue = dropdown.value;

  if (selectedbloodValue === "") {
    alert("Please select a Blood Group.");
    dropdown.classList.add("highlight");
    setTimeout(function () {
      dropdown.classList.remove("highlight");
    }, 3000);
    return false;
  }

  return true;
}


