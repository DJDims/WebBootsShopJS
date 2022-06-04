
class ProductModule {
    createNewProduct(){
        const title = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const size = document.getElementById("size").value;
        const price = document.getElementById("price").value;
        const count = document.getElementById("quantity").value;
        const productFields = {
            "title": title,
            "description": description,
            "size": size,
            "price": price,
            "count": count
            
        };
        let promiseCreateNewProduct = fetch("createNewProduct", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include',
            body: JSON.stringify(productFields)
        });
        
        promiseCreateNewProduct.then(response => response.json()).then(response => {
            if (response.status){
                document.getElementById('info').innerHTML = "Товар успешно добавлен";
            }
        }).catch(error => {
            document.getElementById("info").innerHTML = "Ошибка сервера:" + error;
        });
    }
    
    showListProducts(){
        let promiseGetListProducts = fetch("getListProducts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset:utf8'
            },
            credentials: 'include'
        });
        
        promiseGetListProducts.then(response => response.json()).then(response => {
            if (response.status){
                document.getElementById('info').innerHTML = "Продукт успешно добавлен";
                
            }
        }).catch(error => {
            document.getElementById("info").innerHTML = "Ошибка сервера:" + error;
        });
    }
}

const productModule = new ProductModule(); 
export {productModule};