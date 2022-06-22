import { useEffect, useRef, useState } from "react";
import './App.css';


function App() {

  const [name, setName] = useState(' ')
  const [surname, setSurname] = useState(' ')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const nameRef = useRef()
  const surnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const emailregex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
  const passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})")


  useEffect(() => {
    name !== '' ? nameRef.current.classList.add('close') : nameRef.current.classList.remove('close')
  }, [name]);

  useEffect(() => {
    surname !== '' ? surnameRef.current.classList.add('close') : surnameRef.current.classList.remove('close')
  }, [surname])

  useEffect(() => {
    if(email === ''){
      emailRef.current.classList.add('close')
    } else{
      emailregex.test(email) ? emailRef.current.classList.add('close') : emailRef.current.classList.remove('close')
    }
  }, [email])

  useEffect(() => {
    if(pass === ''){
      passwordRef.current.classList.add('close')
    } else{
      passRegex.test(pass) ? passwordRef.current.classList.add('close') : passwordRef.current.classList.remove('close')
    }
  }, [pass])



  function checkInputs() {
    if (name === ' ') {
      nameRef.current.classList.remove('close')
    } else {
      nameRef.current.classList.add('close')
    }


    if (surname === ' ') {
      surnameRef.current.classList.remove('close')
    } else {
      surnameRef.current.classList.add('close')
    }


    if (emailregex.test(email) || email !== '') {
      emailRef.current.classList.add('close')
    } else {
      emailRef.current.classList.remove('close')
    }


    if (passRegex.test(pass) || pass !== '') {
      passwordRef.current.classList.add('close')
    } else {
      passwordRef.current.classList.remove('close')
    }

    if (name !== " " && surname !== " " && emailregex.test(email) && passRegex.test(pass)) {
      return true
    } else return false
  }


  async function login() {

    let body = {
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      email: email,
      password: pass
    }

    let login = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-type": 'application/json'
      }
    })

    login = await login.json()

    if(login.token){
      window.location.href = 'https://www.google.com'
    }else{
      alert(login.error)
    }

  }



  return (
    <>
      <div className="app row bg-dark align-items-center justify-content-center">
        <div className="conatiner row align-items-center justify-content-center">
          <h1></h1>
          <form className="form col-3" autoComplete="off">

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} placeholder="Name" />
              <span className="erorr close" ref={nameRef}>Ismingizni kiriting</span>
            </div>


            <div className="mb-3">
              <label htmlFor="surname" className="form-label">Surname</label>
              <input type="text" className="form-control" id="surname" onChange={(e) => setSurname(e.target.value)} placeholder="Surname" />
              <span className="erorr close" ref={surnameRef}>Familyangizni kiriting</span>
            </div>


            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <span className="erorr close" ref={emailRef}>Email noto'g'ri</span>
            </div>


            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
              <span className="erorr close" ref={passwordRef}>Parol 8 simvoldan kop bolishi kerak, kamida 1ta kichkin register, 1ta kotta register va sonlardan iborat bolishi kerak </span>
            </div>

            <div className="mb-3">
              <button type="button" className="btn btn-primary w-100" onClick={() => {
                checkInputs()
                if(checkInputs()) login()
              }}>Login</button>
            </div>

          </form>

          <h3>Email: eve.holt@reqres.in</h3>
        </div>
      </div>
    </>
  );
}

export default App;
