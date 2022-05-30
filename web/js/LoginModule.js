import {checkMenu} from "./App.js";

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
        
        promise.then(response => response.json())
                .then(response => {
                    document.getElementById("info").innerHTML = response.info;
                    if (response.auth){
                        sessionStorage.setItem("user", JSON.stringify(response.user));
                        sessionStorage.setItem("role", JSON.stringify(response.role));
                        checkMenu();
                        document.getElementById("content").innerHTML = "";
                    }
                })
                .catch(error => {
                    document.getElementById("info").innerHTML = "Ошибка сервера:" + error;
                    checkMenu();
                    document.getElementById("content").innerHTML = "";
                });
    }
    
    logOut(){
        let promiseLogout = fetch('logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        promiseLogout.then(response => response.json()) 
                .then(response => {
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
}

const loginModule = new LoginModule();
export {loginModule};