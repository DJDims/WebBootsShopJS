import {viewModule} from './ViewModule.js';

class RolesModule {
    changeRole(){
        const userName = document.getElementById("select_user").value;
        const roleName = document.getElementById("select_role").value;
        
        const role = {
            "userName": userName,
            "roleName": roleName
        };
        
        const promise = fetch('changeRole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(role)
        });
        
        promise.then(response => response.json())
                .then(response => {
                    if(response.status){ 
                        document.getElementById('info').innerHTML = "Роль успешно обновлена";
                    }else{
                        document.getElementById('info').innerHTML = response.info;
                    }
        }).catch (error => {
            document.getElementById('info').innerHTML = 'Ошибка сервера: '+error;
        });

    }
    
    insertListUsers(){
        const promiseListUsers = fetch('getListUsers',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        
        promiseListUsers.then(responseListUsers => responseListUsers.json()).then(responseListUsers =>{
            if(responseListUsers.status){
                let userCombobox = document.getElementById("select_user");
                userCombobox.options.length=0;
                let option = null;
                for (let i = 0; i < responseListUsers.users.length; i++) {
                    option = document.createElement('option');
                    option.text = responseListUsers.users[i].firstName + ' ' + responseListUsers.users[i].sureName;
                    option.value = responseListUsers.users[i].id;
                    userCombobox.add(option);
                }
            }else{
                document.getElementById('info').innerHTML = insertListUsers.info;  
            }
        }).catch(error=>{
            document.getElementById('info').innerHTML = 'Ошибка сервера insertListUsers: '+error;
        });
    }
    
    insertListRoles(){
        const promiseListRoles = fetch('getListRoles',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        
        promiseListRoles.then(responseListRoles => responseListRoles.json()).then(responseListRoles =>{
            if(responseListRoles.status){
                let roleCombobox = document.getElementById("select_role");
                roleCombobox.options.length=0;
                let option = null;
                for (let i = 0; i < responseListRoles.roles.length; i++) {
                    option = document.createElement('option');
                    option.text = responseListRoles.roles[i].roleName;
                    option.value = responseListRoles.roles[i].id;
                    roleCombobox.add(option);
                }
            }else{
                document.getElementById('info').innerHTML = responseListRoles.info;  
            }
        }).catch(error=>{
            document.getElementById('info').innerHTML = 'Ошибка сервера insertListRoles: '+error;
        });
    }
}

const rolesModule = new RolesModule();
export {rolesModule};