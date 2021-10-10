import { useRef, useState } from 'react';

const isEmpty = (value) => value.trim() === '';
const isValidEmail = (email) => {
  var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

const isValidNumber = (number) => {
  var regex = /^[+]?[0-9]{2}[ ]?\d+$/gm;
  return regex.test(String(number).toLowerCase());
}

const isValidPhoto = (photo) => {
  if (typeof photo === 'undefined' || photo === null) {
    return true
  }
  return (photo.size / 1024).toFixed(4) < 500
}

const NewContact = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    email: true,
    photo: true,
    mobileNumber: true,
    landlineNumber: true
  });

  const firstNameInputRef = useRef();
  const middleNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const photoInputRef = useRef();
  const emailInputRef = useRef();
  const mobileInputRef = useRef();
  const landlineInputRef = useRef();
  const notesInputRef = useRef();
  const canvasRef = useRef();
  const image = {
    url: ''
  };

  function readImage() {
    const canvas = canvasRef.current;
    var context = canvas.getContext("2d");
    if (photoInputRef.current.files && photoInputRef.current.files[0]) {
      var FR = new FileReader();
      FR.onload = function (e) {
        var img = new Image();
        img.onload = function () {
          context.drawImage(img, 0, 0);
        };
        image.url = (e.target.result);
      };
      FR.readAsDataURL(photoInputRef.current.files[0]);
    }
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredFirstName = firstNameInputRef.current.value;
    const enteredMiddleName = middleNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredMobile = mobileInputRef.current.value;
    const enteredLandline = landlineInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    const enteredPhoto = photoInputRef.current.files[0];

    const enteredFirstNameIsValid = !isEmpty(enteredFirstName);
    const enteredLastNameIsValid = !isEmpty(enteredLastName);
    const enteredPhotoIsValid = isValidPhoto(enteredPhoto);
    const enteredEmailIsValid = !isEmpty(enteredEmail) ? isValidEmail(enteredEmail) : true;
    const enteredMobileIsValid = !isEmpty(enteredMobile) ? isValidNumber(enteredMobile) : true;
    const enteredLandlineIsValid = !isEmpty(enteredLandline) ? isValidNumber(enteredLandline) : true;

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      photo: enteredPhotoIsValid,
      email: enteredEmailIsValid,
      mobileNumber: enteredMobileIsValid,
      landlineNumber: enteredLandlineIsValid,
    });

    const formIsValid =
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredEmailIsValid &&
      enteredMobileIsValid &&
      enteredPhotoIsValid &&
      enteredLandlineIsValid;

    if (!formIsValid) {
      return;
    } else {
      props.onSubmit({
        firstName: enteredFirstName,
        middleName: enteredMiddleName,
        lastName: enteredLastName,
        photo: image.url,
        email: enteredEmail,
        mobileNumber: enteredMobile,
        landlineNumber: enteredLandline,
        notes: enteredNotes
      });
    }
  };

  return (
    <div>
      <form onSubmit={confirmHandler}>
        <div>
          <label htmlFor='FirstName'>FirstName</label><br />
          <input type='text' id='firstName' ref={firstNameInputRef} />
          {!formInputsValidity.firstName && <p style={{ color: 'red', fontSize: '15px' }}>Please enter a valid FirstName!</p>}
        </div>
        <div>
          <label htmlFor='MiddleName'>MiddleName</label><br />
          <input type='text' id='middleName' ref={middleNameInputRef} />
        </div>
        <div>
          <label htmlFor='LastName'>LastName</label><br />
          <input type='text' id='lastName' ref={lastNameInputRef} />
          {!formInputsValidity.lastName && <p style={{ color: 'red', fontSize: '15px' }}>Please enter a valid LastName!</p>}
        </div>
        <div>
          <label htmlFor='Photo' style={{ cursor: 'pointer' }}>Photo</label><br />
          <p><input type="file" accept="image/jpeg, image/png" name="image" id="file" ref={photoInputRef} onChange={readImage} /></p>
          {!formInputsValidity.photo && <p style={{ color: 'red', fontSize: '15px' }}>File Size should be smaller than 500kb!</p>}
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
        <div>
          <label htmlFor='Email'>Email</label><br />
          <input type='text' id='email' ref={emailInputRef} />
          {!formInputsValidity.email && <p style={{ color: 'red', fontSize: '15px' }}>Please enter a valid Email!</p>}
        </div>
        <div>
          <label htmlFor='Mobile'>Mobile</label><br />
          <input type='text' id='mobile' ref={mobileInputRef} />
          {!formInputsValidity.mobileNumber && <p style={{ color: 'red', fontSize: '15px' }}>Please enter a valid Mobile!</p>}
        </div>
        <div>
          <label htmlFor='Landline'>LandLine</label><br />
          <input type='text' id='landline' ref={landlineInputRef} />
          {!formInputsValidity.landlineNumber && <p style={{ color: 'red', fontSize: '15px' }}>Please enter a valid LandLine!</p>}
        </div>
        <div>
          <label htmlFor='Notes'>Notes</label><br />
          <input type='textArea' id='notes' ref={notesInputRef} />
        </div>
        <img src=""></img>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewContact;
