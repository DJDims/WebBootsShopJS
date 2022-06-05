import {checkMenu} from "./App.js";
import {viewModule} from "./ViewModule.js";

class LoginModule {
    sendCredential(){
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        const credential = {
            "login": login,
            "password": password
        };
        
        let promise = fetch("login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(credential)
        });
        
        promise.then(response => response.json()).then(response => {
            document.getElementById("info").innerHTML = response.info;
            if (response.auth){
                sessionStorage.setItem("user", JSON.stringify(response.user));
                sessionStorage.setItem("role", JSON.stringify(response.role));
                checkMenu();
                document.getElementById("content").innerHTML = "";
            }
        }).catch(error => {
            document.getElementById("info").innerHTML = "Ошибка сервера:" + error;
            checkMenu();
            document.getElementById("content").innerHTML = "";
        });
    }
    
    logout(){
        let promiseLogout = fetch('logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        promiseLogout.then(response => response.json()).then(response => {
            document.getElementById('info').innerHTML = response.info;
            if(!response.auth){
                if(sessionStorage.getItem('user')){
                    sessionStorage.removeItem('user');
                }
                if(sessionStorage.getItem('role')){
                    sessionStorage.removeItem('role');
                }
               checkMenu();
            }
        });
    }
    
    register(){
        let login = document.getElementById("login").value;
        let password = document.getElementById("password1").value;
        let confirmPassword = document.getElementById("password2").value;
        let firstName = document.getElementById("firstName").value;
        let sureName = document.getElementById("sureName").value;
        let phone = document.getElementById("phone").value;
        
        if (password !== confirmPassword) {
            document.getElementById("info").innerHTML = "Пароли не совпадают";
//            break;
        }
        
        const newUserData = {
            "login": login,
            "password": password,
            "firstName": firstName,
            "sureName": sureName,
            "phone": phone
        };
        let promise = fetch('register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(newUserData)
        });
        
        promise.then(response => response.json()).then(response => {
            document.getElementById('info').innerHTML = response.info;
            viewModule.showLoginForm();
        });
    }
}

const loginModule = new LoginModule();
export {loginModule};