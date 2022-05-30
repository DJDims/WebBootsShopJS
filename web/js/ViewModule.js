import {loginModule} from "./LoginModule.js"

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
        
    };
    
    showAddProductFrom(){
        
    };
    
    showChangeDataFrom(){
        
    };
    
    showAddMoneyFrom(){
        
    };
    
    showStatistic(){
        
    };
    
    showStore(){
        
    };
    
    showMyPurchases(){
        
    };
    
    showUsersList(){
        
    };
    
}

const viewModule = new ViewModule();
export {viewModule};