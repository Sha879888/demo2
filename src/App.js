import React, { useState, useEffect } from 'react';

import './App.css';

let App = () => {

  let [usersTable, setUsersTable] = useState([]);
  let [ordersTable, setOrdersTable] = useState([]);
  let [UUID, setUUID] = useState(0);
  let [UOID, setUOID] = useState(0);

  // . . . UID SYSTEM . . . //

  let [isLogin, setLoginState] = useState(false);
  let [isLogined, setLoginedState] = useState(false);

  // . . . LOGIN SYSTEM . . . //

  let [login, setLogin] = useState("");
  let [password, setPassword] = useState("");
  let [fullname, setFullname] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");

  let [type, setType] = useState("");
  let [paytype, setPayType] = useState("");
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  let [adress, setAdress] = useState("");
  
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => { getUUID(); getUsers(); }, []);

  let getUUID = async () => {
    let response = await fetch("http://localhost:5000/dusers");

    let data = await response.json();

    for (let i of data) {
      setUUID(data[data.length - 1].id);
    }
  }

  let getUOID = async () => {
    let response = await fetch("http://localhost:5000/dorders");

    let data = await response.json();

    for (let i of data) {
      setUOID(data[data.length - 1].id);
    }
  }

  let getUsers = async () => {
    let response = await fetch("http://localhost:5000/dusers");

    let data = await response.json();

    setUsersTable(data);
  }

  let addUser = async () => {
    let response = await fetch("http://localhost:5000/dusers", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({ id: UUID + 1, login: login, password: password, fullname: fullname, phone: phone, email: email })
    })

    let data = await response.json();

    setUsersTable([...usersTable, data]);

    getUUID();
  }

  let addOrder = async () => {
    let response = await fetch("http://localhost:5000/dorders", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({ id: UOID + 1, userID: currentUser.user.id, type: type, paytype: paytype, date: date, time: time, adress: adress, phone: currentUser.user.phone})
    })

    let data = await response.json();

    setOrdersTable([...ordersTable, data]);

    getUOID();

    console.log(data);
  }

  let LogIn = () => {
    let l = false;

    for (let user of usersTable) {
      console.log(usersTable);
      if (login == user.login && password == user.password) {
        l = true;

        localStorage.setItem("currentUser", JSON.stringify({user}));

        break;
      } else {
        l = false;
      }
    }

    if (l) {
      setLoginedState(l);
    }
    else
      alert("Неправильный логин или пароль");
  }

  let t = () => {
    //console.log(currentUser.phone);
    //return new Number(currentUser.phone);
  }

  return (
    <div className="App">
      { !isLogined ? (
         <div className='LoginForm'>
         { !isLogin ? (
           <div>
               <span>Логин</span><input type='text' onChange={(e) => setLogin(e.target.value)}></input>
               <span>Пароль</span><input type='text' onChange={(e) => setPassword(e.target.value)}></input>
               <button onClick={() => {
                LogIn();
               }}>Войти</button>
 
               <span>Регистрация</span><input onChange={() => setLoginState(!isLogin)} checked={isLogin} type='checkbox'></input>
           </div>
         ) : (
           <div>
               <span>Логин</span><input type='text' onChange={(e) => setLogin(e.target.value)}></input>
               <span>Пароль</span><input type='text' onChange={(e) => setPassword(e.target.value)}></input>
               <span>ФИО</span><input type='text' onChange={(e) => setFullname(e.target.value)}></input>
               <span>Телефон</span><input type='text' onChange={(e) => setPhone(e.target.value)}></input>
               <span>Почта</span><input type='text' onChange={(e) => setEmail(e.target.value)}></input>
               <button onClick={() => {
                 addUser()
                 getUsers();
 
               }}>Зарегистрироваться</button>
               
               <span>Регистрация</span><input onChange={() => setLoginState(!isLogin)} checked={isLogin} type='checkbox'></input>
           </div>
         )}
       </div>
      ) : (
        <div className='Orders'>
          <h1>Заявки</h1>
          <div className='OrdersInput'>
            <span>Адрес</span><input type='text' onChange={(e) => setAdress(e.target.value)}></input>
            <span>Телефон</span><input type='text' value={currentUser.user.phone} onChange={(e) => setPassword(e.target.value)}></input>
            <span>Дата получения услуги</span><input type='text' onChange={(e) => setDate(e.target.value)}></input>
            <span>Время получения услуги</span><input type='text' onChange={(e) => setTime(e.target.value)}></input>
            <span>Вид услуги</span><input type='text' onChange={(e) => setType(e.target.value)}></input>
            <span>Тип оплаты</span><input type='text' onChange={(e) => setPayType(e.target.value)}></input>
            <button onClick={() => addOrder()}>Добавить</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

