let checks = {
  nameCheck: true,
  jobCheck: true,
  introCheck: true,
  phoneCheck: true,
  emailCheck: true,
};

const checkFail = (errorId, inputId, checkValue) => {
  $(`${errorId}`).addClass("invalid");
  $(`${inputId}`).addClass("invalid");
  checks[`${checkValue}`] = false;
  return false;
};

const checkSuccess = (errorId, inputId, checkValue) => {
  $(`${errorId}`).removeClass("invalid");
  $(`${inputId}`).removeClass("invalid");
  checks[`${checkValue}`] = true;
  return true;
};

//

const validateName = () => {
  let nameValue = $("#nomeCognome").val();
  if (nameValue === "") {
    checkFail("#nomeError", "#nomeCognome", checks.nameCheck);
    // } else if (nameValue.length < 2) {
    //   checkFail("#nomeError", "#nomeCognome", checks.nameCheck);
    //   $("#nomeError").text("LUNGHEZZA NON VALIDA");
  } else if (/\d/.test(nameValue)) {
    checkFail("#nomeError", "#nomeCognome", checks.nameCheck);
    $("#nomeError").text("NUMERI NON ACCETTATI");
  } else {
    checkSuccess("#nomeError", "#nomeCognome", checks.nameCheck);
  }
};

const validateJob = () => {
  let jobValue = $("#occupazione").val();
  if (jobValue === "" || jobValue.length < 5) {
    checkFail("#occupazioneError", "#occupazione", checks.jobCheck);
  } else {
    checkSuccess("#occupazioneError", "#occupazione", checks.jobCheck);
  }
};

const validateIntro = () => {
  let introValue = $("#intro").val();
  if (introValue === "" || introValue.length < 10) {
    checkFail("#introError", ".introInput", checks.introCheck);
  } else {
    checkSuccess("#introError", ".introInput", checks.introCheck);
  }
};

const validatePhone = () => {
  let phoneValue = $("#cell").val();
  let pattern = /^((00|\+)39[\. ]??)??3\d{2}[\. ]??\d{6,7}$/;
  if (phoneValue === "") {
    checkFail("#cellError", "#cell", checks.phoneCheck);
  } else if (!pattern.test(phoneValue)) {
    checkFail("#cellError", "#cell", checks.phoneCheck);
    $("#cellError").text("NUMERO NON VALIDO");
  } else {
    checkSuccess("#cellError", "#cell", checks.phoneCheck);
  }
};

const validateEmail = () => {
  const emailValue = $("#email").val();
  let pattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailValue === "") {
    checkFail("#emailError", "#email", checks.emailCheck);
  } else if (!pattern.test(emailValue)) {
    checkFail("#emailError", "#email", checks.emailCheck);
    $("#emailError").text("EMAIL NON VALIDA");
  } else {
    checkSuccess("#emailError", "#email", checks.emailCheck);
  }
};

$("#nomeCognome").keyup(function () {
  validateName();
});

// $("#email").keyup(function () {
//   validateEmail();
// });

$("#contactForm").on("submit", function (e) {
  e.preventDefault();
  validateName();
  validateJob();
  validateEmail();
  validateIntro();
  validatePhone();
  if (Object.values(checks).includes(false)) {
    return false;
  } else {
    return true;
  }
});

// Chat

const theirReply = () => {
  $("#chatMessages").append(
    $("<div/>").addClass("chatMessage theirs").append("<div/>").text("...")
  );
  setTimeout(() => {
    $(".chatMessage.theirs").last().text("Miiinchia!");
  }, 2000);
};

$("#sendMessageForm").on("submit", function (e) {
  e.preventDefault();
  let myMessage = $("#messageInput").val();
  if (myMessage !== "") {
    $("#chatMessages").append(
      $("<div/>")
        .addClass("chatMessage mine")
        .append("<div/>")
        .text(`${myMessage}`)
    );
    $("#messageInput").val("");
    theirReply();
    $("#chatMessages").scrollTop(function () {
      return this.scrollHeight;
    });
  }
});

$("#gift a, #giftIcon").click(() => {
  $("#gift").toggleClass("clicked");
});

// Tabella

