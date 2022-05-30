"use strict";

import {viewModule} from './ViewModule.js';
import {loginModule} from './LoginModule.js';

const menuChangeRole = document.getElementById("menu_change_role");
menuChangeRole.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuChangeRole);
});
const menuStatistic = document.getElementById("menu_statistic");
menuStatistic.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuStatistic);
});
const menuAddProdut = document.getElementById("menu_add_product");
menuAddProdut.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuAddProdut);
});
const menuStore = document.getElementById("menu_store");
menuStore.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuStore);
});
const menuChangeData = document.getElementById("menu_change_data");
menuChangeData.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuChangeData);
});
const menuMyPurchases = document.getElementById("menu_my_purchases");
menuMyPurchases.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuMyPurchases);
});
const menuAddMoney = document.getElementById("menu_add_money");
menuAddMoney.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuAddMoney);
});
const menuUsersList = document.getElementById("menu_users_list");
menuUsersList.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(menuUsersList);
});
const menuLogin = document.getElementById("menu_login");
menuLogin.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(null);
    viewModule.showLoginForm();
});
const menuLogout = document.getElementById("menu_logout");
menuLogout.addEventListener('click', e => {
    e.preventDefault();
    activeBtnMenu(null);
    loginModule.logOut();
});
const infoElement = document.getElementById("info");

function activeBtnMenu(activeMenuBtn){
    if(activeMenuBtn !== null && !activeMenuBtn.classList.contains("active")){
        activeMenuBtn.classList.add("active");
    }
    deactiveMenu(activeMenuBtn);
}
function deactiveMenu(activeMenuBtn){
    const listNavLinks = document.getElementsByClassName('nav-link');
    for(let i = 0; i < listNavLinks.length; i++){
        if(listNavLinks[i] !== activeMenuBtn && listNavLinks[i].classList.contains('active')){
            listNavLinks[i].classList.remove('active');
        }
    }
}
function checkMenu() {
    let role = null;
    if(sessionStorage.getItem('role') === null){
        if(!menuChangeRole.classList.contains('d-none')){
            menuChangeRole.classList.add("d-none");
        }
        if(!menuStatistic.classList.contains('d-none')){
            menuStatistic.classList.add("d-none");
        }
        if(!menuAddProdut.classList.contains('d-none')){
            menuAddProdut.classList.add("d-none");
        }
        if(!menuStore.classList.contains('d-none')){
            menuStore.classList.add("d-none");
        }
        if(!menuChangeData.classList.contains('d-none')){
            menuChangeData.classList.add("d-none");
        }
        if(!menuMyPurchases.classList.contains('d-none')){
            menuMyPurchases.classList.add("d-none");
        }
        if(!menuAddMoney.classList.contains('d-none')){
            menuAddMoney.classList.add("d-none");
        }
        if(!menuUsersList.classList.contains('d-none')){
            menuUsersList.classList.add("d-none");
        }
        if(menuLogin.classList.contains('d-none')){
            menuLogin.classList.remove("d-none");
        }
        if(!menuLogout.classList.contains('d-none')){
            menuLogout.classList.add("d-none");
        }
        return;
    }
    role = JSON.parse(sessionStorage.getItem('role'));
    if(role.roleName === 'USER'){
        if(!menuStore.classList.contains('d-none')){
            menuStore.classList.add("d-none");
        }
        if(!menuChangeData.classList.contains('d-none')){
            menuChangeData.classList.add("d-none");
        }
        if(!menuMyPurchases.classList.contains('d-none')){
            menuMyPurchases.classList.add("d-none");
        }
        if(!menuAddMoney.classList.contains('d-none')){
            menuAddMoney.classList.add("d-none");
        }
        if(menuLogin.classList.contains('d-none')){
            menuLogin.classList.add("d-none");
        }
        if(!menuLogout.classList.contains('d-none')){
            menuLogout.classList.remove("d-none");
        }
        return;
    }
    if(role.roleName === 'MANAGER'){
        if(!menuAddProdut.classList.contains('d-none')){
            menuAddProdut.classList.add("d-none");
        }
        if(!menuStore.classList.contains('d-none')){
            menuStore.classList.add("d-none");
        }
        if(!menuChangeData.classList.contains('d-none')){
            menuChangeData.classList.add("d-none");
        }
        if(!menuMyPurchases.classList.contains('d-none')){
            menuMyPurchases.classList.add("d-none");
        }
        if(!menuAddMoney.classList.contains('d-none')){
            menuAddMoney.classList.add("d-none");
        }
        if(menuLogin.classList.contains('d-none')){
            menuLogin.classList.add("d-none");
        }
        if(!menuLogout.classList.contains('d-none')){
            menuLogout.classList.remove("d-none");
        }
        return;
    }
    if(role.roleName === 'ADMINISTRATOR'){
        if(menuChangeRole.classList.contains('d-none')){
            menuChangeRole.classList.remove("d-none");
        }
        if(menuStatistic.classList.contains('d-none')){
            menuStatistic.classList.remove("d-none");
        }
        if(menuAddProdut.classList.contains('d-none')){
            menuAddProdut.classList.remove("d-none");
        }
        if(menuStore.classList.contains('d-none')){
            menuStore.classList.remove("d-none");
        }
        if(menuChangeData.classList.contains('d-none')){
            menuChangeData.classList.remove("d-none");
        }
        if(menuMyPurchases.classList.contains('d-none')){
            menuMyPurchases.classList.remove("d-none");
        }
        if(menuAddMoney.classList.contains('d-none')){
            menuAddMoney.classList.remove("d-none");
        }
        if(menuUsersList.classList.contains('d-none')){
            menuUsersList.classList.remove("d-none");
        }
        if(!menuLogin.classList.contains('d-none')){
            menuLogin.classList.add("d-none");
        }
        if(menuLogout.classList.contains('d-none')){
            menuLogout.classList.remove("d-none");
        }
        return;
    }
}checkMenu();

export {checkMenu};