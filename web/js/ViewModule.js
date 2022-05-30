import {loginModule} from "./LoginModule.js";

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
                <div class="card text-white border-primary mb-3" style="max-width: 20rem;">
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
    };
    
    showAddProductFrom(){
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
    };
    
    showChangeDataFrom(){
        const content = document.getElementById('content');
        content.innerHTML = ``;
    };
    
    showAddMoneyFrom(){
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
    };
    
    showStore(){
        const content = document.getElementById('content');
        content.innerHTML = ``;
    };
    
    showMyPurchases(){
        const content = document.getElementById('content');
        content.innerHTML = ``;
    };
    
    showUsersList(){
        const content = document.getElementById('content');
        content.innerHTML = ``;
    };
    
}

const viewModule = new ViewModule();
export {viewModule};