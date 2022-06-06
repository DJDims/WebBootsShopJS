import {productModule} from "./ProductModule.js";

class UserModule {
    showUser(){
        const firstNameInp = document.getElementById("firstName");
        const sureNameInp = document.getElementById("sureName");
        const phoneInp = document.getElementById("phone");
        const loginInp = document.getElementById("login");
        
        const user = sessionStorage.getItem("user");
        
        
        firstNameInp.value = JSON.parse(user).firstName;
        sureNameInp.value = JSON.parse(user).sureName;
        phoneInp.value = JSON.parse(user).phone;
        loginInp.value = JSON.parse(user).login;
    }
    
    editUser(){
        const login = document.getElementById("login").value;
        const firstName = document.getElementById("firstName").value;
        const sureName = document.getElementById("sureName").value;
        const phone = document.getElementById("phone").value;
        const oldPas = document.getElementById("oldPassword").value;
        const newPas1 = document.getElementById("newPassword1").value;
        const newPas2 = document.getElementById("newPassword2").value;
        
        if (oldPas !== ""){
            if (newPas1 !== newPas2){
                document.getElementById("info").innerHTML = "Новые пароли не совпадают";
                return;
            }
        }
        
        const userData = {
            "login": login,
            "firstName": firstName,
            "sureName": sureName,
            "phone": phone,
            "currentUser": JSON.parse(sessionStorage.getItem("user")).login
        };
        
        let promise = fetch("editUser",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(userData)
        });
        
        promise.then(response => response.json()).then(response => {
            if (response.status){
                document.getElementById("info").innerHTML = "Ваши данные успешно изменены";
                sessionStorage.setItem("user", JSON.stringify(response.newUserData));
                document.getElementById("oldPassword").value = "";
                document.getElementById("newPassword1").value = "";
                document.getElementById("newPassword2").value = "";
            } 
        }).catch(error => {
            document.getElementById("info").innerHTML = "Ошибка сервера:" + error;
        });
    }
    
    addMoney(){
        const money = document.getElementById("moneyInput").value;
        const addMoneyData = {
            "money": money,
            "login": JSON.parse(sessionStorage.getItem("user")).login
        };
        
        let promise = fetch("addMoney",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(addMoneyData)
        });
        
        promise.then(response => response.json()).then(response => {
            if (response.status){
                document.getElementById("info").innerHTML = "Деньги успешно начислены";
                document.getElementById("moneyInput").value = "";
            } 
        }).catch(error => {
            document.getElementById("info").innerHTML = "Ошибка сервера:" + error;
        });
    }
    
    buyProduct(id){
        const productData = {
            "productId": id.toString(),
            "userId": JSON.parse(sessionStorage.getItem("user")).id.toString()
        };
        let promise = fetch("buyProduct",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(productData)
        });
        
        promise.then(response => response.json()).then(response => {
            if (response.status){
                document.getElementById("info").innerHTML = response.info;
                productModule.showListProducts();
                
            } else {
                document.getElementById("info").innerHTML = response.info;
            }
        }).catch(error => {
            document.getElementById("info").innerHTML = "Ошибка сервера:" + error;
        });
    }
}

const userModule = new UserModule();
export{userModule};