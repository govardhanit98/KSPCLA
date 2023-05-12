//------------------------------ Registration Form API Call ------------------------------------------
// $(function () {
//   $("#formAuthentication").submit(function (event) {
//     event.preventDefault();
//     var data = {
//       full_name: $("[name='full_name']").val(),
//       college_type: $("[name='college_type']").val(),
//       kgid_hrms: $("[name='kgid_hrms']").val(),
//       mode_of_recuritment_or_aided_date: $(
//         "[name='mode_of_recuritment_or_aided_date']"
//       ).val(),
//       subject: $("[name='subject']").val(),
//       qualification: $("[name='qualification']").val(),
//       date_of_birth: $("[name='date_of_birth']").val(),
//       clg_street_name: $("[name='clg_street_name']").val(),
//       clg_state: $("[name='clg_state']").val(),
//       clg_city: $("[name='clg_city']").val(),
//       clg_taluk: $("[name='clg_taluk']").val(),
//       clg_country: $("[name='clg_country']").val(),
//       clg_zip_code: $("[name='clg_zip_code']").val(),
//       clg_code: $("[name='clg_code']").val(),
//       emp_street_name: $("[name='emp_street_name']").val(),
//       emp_state: $("[name='emp_state']").val(),
//       emp_city: $("[name='emp_city']").val(),
//       emp_taluk: $("[name='emp_taluk']").val(),
//       emp_country: $("[name='emp_country']").val(),
//       emp_zip_code: $("[name='emp_zip_code']").val(),
//       emp_contact: $("[name='emp_contact']").val(),
//       emp_alt_contact: $("[name='emp_alt_contact']").val(),
//       issue_date: $("[name='issue_date']").val(),
//       joining_date: $("[name='joining_date']").val(),
//       fee: $("[name='fee']").val(),
//       transact_date: $("[name='transact_date']").val(),
//       reciept_num: $("[name='reciept_num']").val(),
//       blood_grp: $("[name='blood_grp']").val(),
//       // image_name:$("[name='image_name'").val(),
//       image_name: $("[name='base64ConvertValue'").val(),
//     };
//     console.log(data);
//     $.ajax({
//       method: "POST",
//       url: " http://127.0.0.1:5000/register/success/" + data["emp_contact"],

//       data: JSON.stringify(data),
//       contentType: "application/json",
//       success: function (response) {
//         console.log(response);
//         alert("Data Saved successful");
//         //On Success the page will popped by razorpay
//         console.log(window.location.href);
//         alert("hello");
//         window.location.href = "http://www.google.com";
//       },
//       error: function (xhr, status, error) {
//         alert("An error occurred: " + error);
//         window.location.href = "http://www.google.com";
//       },
//     });
//   });
// });

// function routeToPayment() {
//   console.log('Function is working')
//   window.location.href = "https://www.google.com"
// }

// $("#teachers-information").click(function (event) {
//   event.preventDefault();
//   var data = {
//     full_name: $("[name='full_name']").val(),
//     college_type: $("[name='college_type']").val(),
//     kgid_hrms: $("[name='kgid_hrms']").val(),
//     mode_of_recuritment_or_aided_date: $(
//       "[name='mode_of_recuritment_or_aided_date']"
//     ).val(),
//     subject: $("[name='subject']").val(),
//     qualification: $("[name='qualification']").val(),
//     date_of_birth: $("[name='date_of_birth']").val(),
//     clg_street_name: $("[name='clg_street_name']").val(),
//     clg_state: $("[name='clg_state']").val(),
//     clg_city: $("[name='clg_city']").val(),
//     clg_taluk: $("[name='clg_taluk']").val(),
//     clg_country: $("[name='clg_country']").val(),
//     clg_zip_code: $("[name='clg_zip_code']").val(),
//     clg_code: $("[name='clg_code']").val(),
//     emp_street_name: $("[name='emp_street_name']").val(),
//     emp_state: $("[name='emp_state']").val(),
//     emp_city: $("[name='emp_city']").val(),
//     emp_taluk: $("[name='emp_taluk']").val(),
//     emp_country: $("[name='emp_country']").val(),
//     emp_zip_code: $("[name='emp_zip_code']").val(),
//     emp_contact: $("[name='emp_contact']").val(),
//     emp_alt_contact: $("[name='emp_alt_contact']").val(),
//     issue_date: $("[name='issue_date']").val(),
//     joining_date: $("[name='joining_date']").val(),
//     fee: $("[name='fee']").val(),
//     transact_date: $("[name='transact_date']").val(),
//     reciept_num: $("[name='reciept_num']").val(),
//     blood_grp: $("[name='blood_grp']").val(),
//     // image_name:$("[name='image_name'").val(),
//     image_name: $("[name='base64ConvertValue'").val(),
//   };
//   console.log(data);
//   $.ajax({
//     type: "POST",

//     url: "http://127.0.0.1:5000/register/success/" + data["emp_contact"],
//     contentType: "application/json",

//     data: JSON.stringify(data),

//     success: function (data, textStatus, jqXHR) {
//       console.log(jqXHR.status);
//       console.log(data);
//       alert("Data saved Successfully");
//       routeToPayment();
//     },
//     error: function (xhr, status, error) {
//       alert("An error occurred: " + error);
//       window.location.href = "http://www.google.com";
//     },
//   });
// });



function routeToPayment() {
  alert("routing to payment");
  window.open("https://www.google.com/");
}

$("#teachers-information").click(function (event) {
  event.preventDefault();

  var data = {
    full_name: $("[name='full_name']").val(),
    college_type: $("[name='college_type']").val(),
    kgid_hrms: $("[name='kgid_hrms']").val(),
    mode_of_recuritment_or_aided_date: $(
      "[name='mode_of_recuritment_or_aided_date']"
    ).val(),
    subject: $("[name='subject']").val(),
    qualification: $("[name='qualification']").val(),
    date_of_birth: $("[name='date_of_birth']").val(),
    clg_street_name: $("[name='clg_street_name']").val(),
    clg_state: "Karnataka",
    clg_city: $("[name='clg_city']").val(),
    clg_taluk: $("[name='clg_taluk']").val(),
    clg_country: $("[name='clg_country']").val(),
    clg_zip_code: $("[name='clg_zip_code']").val(),
    clg_code: $("[name='clg_code']").val(),
    emp_street_name: $("[name='emp_street_name']").val(),
    emp_state: $("[name='emp_state']").val(),
    emp_city: $("[name='emp_city']").val(),
    emp_taluk: $("[name='emp_taluk']").val(),
    emp_country: $("[name='emp_country']").val(),
    emp_zip_code: $("[name='emp_zip_code']").val(),
    emp_contact: $("[name='emp_contact']").val(),
    emp_alt_contact: $("[name='emp_alt_contact']").val(),
    issue_date: $("[name='issue_date']").val(),
    joining_date: $("[name='joining_date']").val(),
    fee: $("[name='fee']").val(),
    transact_date: $("[name='transact_date']").val(),
    reciept_num: $("[name='reciept_num']").val(),
    blood_grp: $("[name='blood_grp']").val(),
    // image_name:$("[name='image_name'").val(),
    image_name: $("[name='base64ConvertValue'").val(),
  };
  console.log(data);
  let filled = validateForm()

  if (filled){
    let url = "http://localhost:5000/register/success/" + data["emp_contact"];
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("data saved successfully");
      orderId = data["razorpay_order_id"];

      if (confirm("do you wish to make payment") == true) {
        let url = `/templates/pay.html?oi=${orderId}`;
        alert(url);
        window.location.href = `http://13.234.186.61/kspcla_client/templates/pay.html?oi=${orderId}`;
        // // window.open(url)
        // routeToPayment()
        // alert('somehting')
      }
    })
    .catch((error) => console.log(error));
  }
});
	
  

//------------------------------ Admin Login API Call ------------------------------------------

              $(function() {
                // Handle form submission
                $('#formAdminLogin').submit(function(event) {
                  event.preventDefault();
                  var data = {
                    email_id: $('#email_id').val(),
                    password: $('#password').val()
                  };
                  console.log(data);
                  $.ajax({
                    method: 'POST',
                    url: 'http://localhost:5000/login',
                    
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    success: function(response) {
                      console.log(response);
                        
                        alert('Login successful');
                        // Redirect to admin dashboard
                        window.location='http://localhost:3000/kspcla_client/templates/dashboard.html';
                    }, 
                    error: function(xhr, status, error) {
                      alert('An error occurred: ' + error);
                    }
                  });
                });
              });

//------------------------------ Admin Registration API Call ------------------------------------------
$(function() {
  // Handle form submission
  $('#formAdminRegister').submit(function(event) {
    event.preventDefault();
    var data = {
      full_name:$('#username').val(),
      email_id: $('#email').val(),
      password: $('#password').val(),

    };
    console.log(data);
    $.ajax({
      method: 'PUT',
      url: 'http://localhost:5000/login',
      
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(response) {
        console.log("Registration Successfull");
        alert("User Registered Successfully")
          // Redirect to admin dashboard
        window.location='http://localhost:3000/kspcla_client/templates/auth-login-basic.html'
        event.preventDefault();
      },
      error: function(response){
        console.log('error');
        alert('error');
        console.log(response);
      }
    });
  });
});


