function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector('.form__message')

  messageElement.textContent = message
  messageElement.classList.remove('form__message--error') //success removed redirect to landing after login
  messageElement.classList.add(`form__message--${type}`)
}

function setInputError(inputElement, message) {
  inputElement.classList.add('form__input--error')
  inputElement.parentElement.querySelector(
    '.form__input-error-message',
  ).textContent = message
}

function clearInputError(inputElement) {
  inputElement.classList.remove('form__input--error')
  inputElement.parentElement.querySelector(
    '.form__input-error-message',
  ).textContent = ''
}

//----------------function to validate Email---------------------------//
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
//---------------End of function to validate Email----------------------//

document.addEventListener('DOMContentLoaded', () => {


        document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id == "document" && !e.target.value )  {
                setInputError(inputElement, "You must provide the file");
              }
            if (e.target.id == "firstName" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile First Name");
              }
            if (e.target.id === "lastName" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Last Name");
            }
            if (e.target.id === "emailAddress" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Email Address");
            }   
            if (e.target.id === "phoneNumber" && !e.target.value )  {
                setInputError(inputElement, "You must provide profile Phone Number");
            }  
            if (e.target.id === "gender" && !e.target.value )  {
                setInputError(inputElement, "You must provide Gender");
            }
     
            if (e.target.id === "firstName" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "Firstname cannot be empty");
            }
            if (e.target.id === "lastName" && (/^ *$/.test(e.target.value)))  {
            setInputError(inputElement, "Lastname cannot be empty");
            } 
            if (e.target.id === "emailAddress" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "emailAddress cannot be empty");
            }
            if (e.target.id === "phoneNumber" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "phoneNumber cannot be empty");
            } 
            if (e.target.id === "gender" && (/^ *$/.test(e.target.value)))  {
                setInputError(inputElement, "genderList cannot be empty");
            }  

            if(e.target.id === "emailAddress" && !validateEmail(e.target.value)){
                setInputError(inputElement, "Please enter valid Email Address");
            }

            let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;
            if(e.target.id === "phoneNumber" && !e.target.value.match(phoneRe)){
                setInputError(inputElement, "Phone number must be of correct format and all numbers");
            }

            let gen = ["Female", "Male", "Other"]
            if(e.target.id === "gender" && !gen.includes(e.target.value)){
                setInputError(inputElement, "Please Enter valid gender");
            }
    
        });
        


        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });


})
