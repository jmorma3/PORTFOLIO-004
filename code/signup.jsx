//Primero, identificamos el elemento del DOM que será la reaíz
const container = document.getElementById("main-container")

//y luego la asignamos como raíz de REACT:
const root = ReactDOM.createRoot(container)

//para usar "useState" debemos importarlo de REACT:
const { useState } = React

//Creamos la función que creará el formulario:
const SignUpForm = () => {
    //con destructuring, creamos la variable "email" con su setter ("setEmail") y le damos el valor de "useState()" (con valor por defecto string vacío "")
    const [email, setEmail] = useState("")

    //y creamos también la función que manejará el evento ("e") del cambio en el input de "Email:"
    const handleEmailChange = (e) => {
        //y mediante el setter de "email" ("setEmail"), cambiamos el valor de "email" por la propiedad ".value", que se encuentra dentro de "e.target..."
        setEmail(e.target.value)
    }

    //Aquí creamos la función que manejará el evento del click en el botón "submit"
    const handleSignupButtonClick = (e) => {
        e.preventDefault()  //esto previene que se resetee el formulario con cada click
        console.log("Sign Up button clicked!")
        if (validateEmail() && validatePassword() && validatePassword2() && country != "" && gender != "" && birthDate != "" && checkAdult() && termsChecked) {
            return alert("You are IN!")
        } else if (!validateEmail() || !validatePassword() || !validatePassword2()) {
            return alert("Invalid Email or Password")
        } else if (country === "") {
            return alert("Select your country!")
        } else if (gender === "") {
            return alert("Choose your gender!")
        } else if (birthDate === "") {
            return alert("Introduce your birth date!")
        } else if (!checkAdult()) {
            return alert("You must be an ADULT to sign up!")
        } else if (!termsChecked) {
            return alert("You must accept Terms and Conditions")
        }
    }

    //Con esta función validaremos el "email"
    const validateEmail = () => {
        //Aplicamos una regex y ".testeamos" el "email"
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    }

    //con esta función validamos el "password"
    const validatePassword = () => {
        return password.length > 5
    }

    //Esta función la creamos para validar en vivo el input "Email:"
    const styleEmail = () => {
        //si se cumple la validación, retornará "valid", si no "invalid"
        if (validateEmail()) {
            return "valid"
        } else {
            return "invalid"
        }
    }

    //Creamos la variable "password", su setter y la función que maneja su cambio:
    const [password, setPassword] = useState("")
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    //y creamos la función de estilado del input "password" 
    const stylePassword = () => {
        //usando operador ternario para practicar...
        return validatePassword() ? "valid" : "invalid"
    }

    //Chequear el password por 2ª vez:
    const [password2, setPassword2] = useState("")
    const handlePassword2Change = (e) => {
        setPassword2(e.target.value)
    }

    //Función para validar "password2":
    const validatePassword2 = () => {
        return password2 === password ? true : false
    }

    //variable "country", su setter y la función que maneja su cambio:
    const [country, setCountry] = useState("")
    const handleCountryChange = (e) => {
        setCountry(e.target.value)
    }

    //Creamos una función que genere una opción para cada country: 
    const createCountryOptions = () => {
        //para ello, creamos una variable cuyo valor será un "array" de "options", cada una con un elemento DOM de tipo "option", con el "value" del código del país ("country.code") y como texto aparecerá el nombre del país ("country.name"):
        const countryName = countries.map((country, index) => {
            return (<option key={index} value={country.code}> {country.name} </option>)
        })
        //y retornamos ese "array":
        return countryName
    }

    //variable "gender", setter y función que maneja su cambio:
    const [gender, setGender] = useState("")
    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    //Función que crea "array" con diferentes "gender" de tipo "radio":
    const createGenderRadios = () => {
        //Primero creo un array con los diferentes géneros:
        const gendersArr = ["Male", "Female", "Undisclosed"]

        //recorro el array y creo un "input" de tipo "radio" para cada elemento del array ("genderOption"):
        const genderOptions = gendersArr.map((genderOption, index) => {
            return (
                <label key={index}> {genderOption}
                    <input name="gender" type="radio" checked={gender === genderOption} value={genderOption} onChange={handleGenderChange} />
                </label>
            )
        })

        return genderOptions
    }

    //variable "birthDate", setter y función que maneja su cambio:
    const [birthDate, setBirthDate] = useState("")
    const handleBirthDate = (e) => {
        setBirthDate(e.target.value)
    }

    //función que comprueba si el usuario es mayor de edad ("adult"):
    const checkAdult = () => {
        //para no liarme con los meses, he decidido que si a 2023 se le resta el año de nacimiento del usuario (los 4 primeros caracteres del "birthDate" corresponden al año) y es >= 18, entonces es "adult":
        return (2023 - birthDate.slice(0, 4)) >= 18 ? true : false
    }

    //variable "termsChecked" (con valor por defecto "false"), setter y función que maneja su cambio:
    const [termsChecked, setTermsChecked] = useState(false)
    const handleTermsCheck = (e) => {
        //En este caso, la propiedad del evento que nos interesa es ".checked"
        setTermsChecked(e.target.checked)
    }

    //lo mismo con "mailListChecked":
    const [mailListChecked, setMailListChecked] = useState(false)
    const handleMailListCheck = (e) => {
        setMailListChecked(e.target.checked)
    }

    const securityPassword = () => {
        if (password.length > 10 && /\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
            return "hard"
        } else if (password.length >= 5 && /\d/.test(password)) {
            return "medium"
        } else {
            return "weak"
        }
    }

    //BONUS 1: creamos una variable "needSignUp" para comprobar si el usuario necesita crear una cuenta o no. Por defecto, le damos el valor "false". También creamos su setter y la función que maneja su cambio. 
    const [needSignUp, setNeedSignUp] = useState(false)
    const handleNeedSignUpChange = (e) => {
        //le metemos un ".preventDefault" para que al pulsar no resetee al valor original ("false")
        e.preventDefault()
        //si la variable "needSignUp" es "false", la pasamos a "true"
        if (needSignUp === false) {
            setNeedSignUp(true)
            //y lo contrario aquí:
        } else {
            setNeedSignUp(false)
        }
    }

    //Esta función cambiará la clase del div que contiene el resto del formulario (la parte del "signup-form") en función del valor de "needSignUp":
    const showHideSignupForm = () => {
        return needSignUp === true ? "signup-form" : "hide"
    }

    //esta función mostrará u ocultará el botón de "Log In" y el mensaje de "Don´t you have an account?" en función del valor de "needSignUp"
    const showHideLoginSignupMessage = () => {
        return needSignUp === true ? "hide" : ""
    }

    //Por último, creamos la función para manejar el "click" del botón "Log In":
    const handleLoginButtonClick = (e) => {
        e.preventDefault()
        console.log("Log In button clicked!")
        if (validateEmail() && validatePassword()) {
            return alert("You are IN!")
        } else {
            return alert("Invalid Email or Password!")
        }
    }

    //Función que muestra u oculta el "securityPassword": 
    const showHidePasswordSecurity = () => {
        if (password != "" && needSignUp === true) {
            //show:
            return ""
        }
        else {
            //hide...
            return "hide"
        }
    }

    //El retorno de esta función creará el formulario:
    return (
        <>
            <form>
                <h1>Registration Form</h1>
                <br />
                <label> Email: </label>
                {/* Al campo "input" le asignamos como "value" el valor de la variable "email", y en la prop "onChange" le asignamos la variable "handleEmailChange" */}
                {/* mediante "className = {styleEmail()}" validamos en vivo la introducción del email: */}
                <input className={email != "" ? styleEmail() : ""} type="text" value={email} onChange={handleEmailChange} />
                

                <label> Password: </label>
                <input className={password != "" ? stylePassword() : ""} type="password" value={password} onChange={handlePasswordChange} />

                {/* Bonus 2: comprobar la seguridad del "password" */}
                {/* creo un div que estará escondido mientras la "password" sea un string vacío y "needSignUp" sea "false" */}
                <div className={showHidePasswordSecurity()}>
                    {/* y una vez comience a introducir el "password", mostrará una "label" u otra en función de la condición de "securityPassword()" que se cumpla... */}
                    <label className={securityPassword() === "weak" ? "weak" : "hide"}> WEAK </label>
                    <label className={securityPassword() === "medium" ? "medium" : "hide"}> MEDIUM </label>
                    <label className={securityPassword() === "hard" ? "hard" : "hide"}> HARD </label>
                </div>

                {/* añadimos el botón de "Log In" */}
                <div className="button-div">
                    <button type="submit" className={showHideLoginSignupMessage()} onClick={handleLoginButtonClick}> Log In </button>
                </div>


                {/* y añadimos el mensaje de "Don´t have an account?" como un enlace ("<a> </a>") */}
                <a href="" className={showHideLoginSignupMessage()} onClick={handleNeedSignUpChange}> Don´t have an account? </a>

                {/* Bonus 1: alternar entre Login o  Signup: */}
                {/* este div, que contiene el resto del formulario (la parte del "Sign Up") se mostrará u ocultará en función del valor de la variable "needSignUp" */}
                <div className={showHideSignupForm()}>
                    <label> Re-write your password: </label>
                    <input className={validatePassword2() ? "valid" : "invalid"} type="password" value={password2} onChange={handlePassword2Change} />
                    <br />

                    <label> Country: </label>
                    {/* y agregamos al "select" la función que maneja el cambio de "country" */}
                    <select onChange={handleCountryChange}>
                        {/* aquí añadimos un valor por defecto para que no aparezca el nombre de ningún país en el "select" */}
                        <option value="default"> Select your country </option>
                        {/* y ejecutamos la función "createCountryOption" para que añada todas las "options" del array: */}
                        {createCountryOptions()}
                    </select>
                    <br />

                    <label> Choose your gender: </label>
                    <div id="gender-radios-div">
                        {createGenderRadios()}
                    </div>
                    <br />

                    <label> Introduce your birth date: </label>
                    <input type="date" value={birthDate} onChange={handleBirthDate} />
                    <br />

                    <label> <input type="checkbox" checked={termsChecked} onChange={handleTermsCheck} /> I accept the Terms and Conditions </label>
                    <label> <input type="checkbox" checked={mailListChecked} onChange={handleMailListCheck} /> I accept to join the Mailing List </label>
                    <br />

                    <div className="button-div">
                        <button type="submit" onClick={handleSignupButtonClick}> Sign Up </button>
                    </div>
                    {/* y este enlace permitirá al usuario volver a la pantalla de "Log In" (ocultar "signup-form"), ya que al clicar sobre él cambiaremos el valor de "needSignUp" a false: */}
                    <a href="" onClick={handleNeedSignUpChange}> Already have an account? </a>
                </div>
            </form>
        </>
    )
}

const element = < SignUpForm />

root.render(element)