// form validation starts
let nameInp = document.querySelector("#nm-inp");
let emailInp = document.querySelector("#em-inp");
let subInp = document.querySelector("#sub-inp");
let msgInp = document.querySelector("#msg-inp");
let form = document.querySelector("#form");

const errormsg = (element, message) => {
  let formControl = element.parentElement;
  let errorDis = formControl.querySelector(".error");
  errorDis.innerText = message;

  element.style.border = "1px solid red";
};
const success = (element) => {
  let formControl = element.parentElement;
  let errorDis = formControl.querySelector(".error");
  errorDis.innerText = "";

  element.style.border = "1px solid greenyellow";
};

const validateForm = () => {
  let nameVal = nameInp.value;
  let emailVal = emailInp.value;
  let subVal = subInp.value;
  let msgVal = msgInp.value;
  let isTrue = true;
  if (nameVal == "") {
    errormsg(nameInp, "please enter your full name");
    isTrue = false;
  } else {
    success(nameInp);
  }
  if (subVal == "") {
    errormsg(subInp, "please enter subject");
    isTrue = false;
  } else {
    success(subInp);
  }

  if (emailVal == "") {
    errormsg(emailInp, "please enter your email Address");
    isTrue = false;
  } else if (!emailVal.includes("@gmail.com")) {
    errormsg(emailInp, "please enter valid email");
    isTrue = false;
  } else {
    success(emailInp);
  }

  if (msgVal == "") {
    errormsg(msgInp, "please write your message");
    isTrue = false;
  } else {
    success(msgInp);
  }

  if (isTrue) {
    alert("Successfully submitted. Click OK to continue. Thank you!");
  }

  return isTrue;
};
// form validation ends
