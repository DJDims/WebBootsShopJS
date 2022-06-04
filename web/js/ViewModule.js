import {loginModule} from "./LoginModule.js";
import {rolesModule} from "./RolesModule.js";
import {incomeModule} from "./IncomeModule.js";
import {productModule} from "./ProductModule.js";
import {userModule} from "./UserModule.js";

class ViewModule {
    showLoginForm(){
        const content = document.getElementById('content');
        content.innerHTML = 
               `<div class="card border-secondary mb-3 mx-auto" style="max-width: 30rem;">
                    <h3 class="card-header w-100 text-center ">Авторизация</h3>
                    <div class="card-body">
                      <div class="form-group">
                        <label for="login" class="form-label mt-4">Логин</label>
                        <input type="text" class="form-control" id="login" placeholder="Login">
                      </div>
                      <div class="form-group">
                        <label for="password" class="form-label mt-4">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password">
                      </div>
                      <button id='button_login' type="submit" class="btn btn-primary my-3">Войти</button>
                    </div>
                </div>`;
        const buttonLogin = document.getElementById("button_login");
        buttonLogin.addEventListener('click', (e)=>{
            e.preventDefault();
            loginModule.sendCredential();
        });
    };
    
    showChangeRoleForm(){
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="card text-white border-primary mb-3" style="width: 30rem;">
                    <div class="card-header">Назначение роли</div>
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label mt-1">Выбор пользователя</label>
                            <select class="form-select" id="select_user">
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label mt-1">Выбор роли</label>
                            <select class="form-select" id="select_role">
                            </select>
                        </div>
                        <div class="d-flex justify-content-center">
                            <button id="btn_submit" type="submit" class="btn btn-success mt-3">Назначить роль</button>
                        </div>
                    </div>
                </div>
            </div>`;
        document.getElementById("btn_submit").addEventListener('click', (e)=>{
            e.preventDefault();
            rolesModule.changeRole();
        });
        rolesModule.insertListUsers();
        rolesModule.insertListRoles();
    };
    
    showAddProductForm(){
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="w-100 d-flex justify-content-center">
                <div class="card border-0 mb-3 px-3" style="width: 40em;">
                    <h2 class="my-3 w-100 d-flex justify-content-center">Добавить обувь</h2>
                    <!--<a href="showUploadFile" class="my-1 w-100 d-flex justify-content-center">Загрузить изображение</a>-->
                    <div class="form-group">
                        <label class="form-label mt-2 mx-2">Название</label>
                        <input type="text" class="form-control" id="name">
                    </div>
                    <div class="form-group">
                        <label class="form-label mt-2 mx-2">Описание</label>
                        <textarea class="form-control" id="description" rows="3""></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label mt-2 mx-2">Размер</label>
                        <input type="number" min="31" max="48" class="form-control" id="size">
                    </div>
                    <div class="form-group">
                        <label class="form-label mt-2 mx-2">Цена</label>
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-text">€</span>
                                <input type="number" min="1.00" step="0.01" id="price" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label mt-2 mx-2">Количество</label>
                        <input type="number" min="1" class="form-control mb-4" id="quantity">
                    </div>
                    <input class="btn btn-primary mb-2" type="submit" value="Добавить товар" id="btn_submit">
                </div>
            </div>`;
        
        document.getElementById("btn_submit").addEventListener('click', (e)=>{
            e.preventDefault();
            productModule.createNewProduct();
            this.showAddProductForm();
        });
    };
    
    showChangeDataForm(){
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="container-fluid">
                <div class="w-100 d-flex justify-content-evenly">
                    <div class="card border-primary mb-3" style="max-width: 20rem;">
                        <div class="card-header">Личные данные</div>
                        <div class="card-body">
                            <div class="form-group">
                                <label class="col-form-label mt-1">Имя</label>
                                <input type="text" class="form-control" id="firstName" value="">
                            </div>
                            <div class="form-group">
                                <label class="col-form-label mt-1">Фамилия</label>
                                <input type="text" class="form-control" id="sureName" value="">
                            </div>
                            <div class="form-group">
                                <label class="col-form-label mt-1">Телефон</label>
                                <input type="text" class="form-control" id="phone" value="">
                            </div>
                        </div>
                    </div>
                    <div class="card border-primary mb-3" style="max-width: 20rem;">
                        <div class="card-header">Данные аккаунта</div>
                        <div class="card-body">
                            <div class="form-group">
                                <label class="col-form-label mt-1">Логин</label>
                                <input type="text" class="form-control" id="login" value="">
                            </div>
                            <div class="form-group">
                                <label class="col-form-label mt-1">Старый пароль</label>
                                <input type="password" class="form-control" id="oldPassword">
                            </div>
                            <div class="form-group">
                                <label class="col-form-label mt-1">Новый пароль</label>
                                <input type="password" class="form-control" id="newPassword1">
                            </div>
                            <div class="form-group">
                                <label class="col-form-label mt-1">Подтвердите новый пароль</label>
                                <input type="password" class="form-control" id="newPassword2">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <input class="btn btn-success mt-1" id="submit" value="Подтвердить изменения">
                </div>
            </div>`;
        userModule.showUser();
        document.getElementById("submit").addEventListener('click', (e) => {
            e.preventDefault();
            userModule.editUser();
        });
    };
    
    showAddMoneyForm(){
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="card border-primary mb-3" style="max-width: 20rem;">
                    <div class="card-header">Добавление денег</div>
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label mt-1">Добавить денег</label>
                            <div class="form-group">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">€</span>
                                    <input type="text" min="5" max="500" step="5" class="form-control" id="money">
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success" id="btn_submit">Внести деньги</button>
                    </div>
                </div>
            </div>`;
    };
    
    showStatistic(){
        const content = document.getElementById('content');
        content.innerHTML = `
            <div class="card border-primary mb-3" style="max-width: 20rem;">
                <div class="card-header">
                    <p class="card-text" id="p_month"></p>
                </div>
                <div class="card-body">
                    <p class="card-text" id="p_month_income"></p>
                </div>
            </div>

            <div class="card border-primary mb-3" style="max-width: 20rem;">
                <div class="card-header">Доход за все время</div>
                <div class="card-body">
                    <p class="card-text" id="p_all_income"></p>
                </div>
            </div>`;
        incomeModule.showIncome();
    };
    
    showStore(){
        const content = document.getElementById('content');
        content.innerHTML = ``;
    };
    
    showMyPurchases(){
        const content = document.getElementById('content');
        content.innerHTML = `
        <div class="album">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <c:forEach var="history" items="">
                        <div class="col">
                            <div class="card border-primary mb-3" style="max-width: 20rem;">
                                <div class="card-body">
                                    <h4 class="card-title"></h4>
                                    <p class="card-text"></p>
                                    <p class="card-text">Размер:</p>
                                    <p class="card-text">Цена:€</p>
                                    <p class="card-text">Дата покупки:</p>
                                </div>
                            </div>
                        </div>   
                    </c:forEach>
                </div>
            </div>
        </div>
        `;
    };
    
    showUsersList(){
        const content = document.getElementById('content');
        content.innerHTML = ``;
    };
    
}

const viewModule = new ViewModule();
export {viewModule};