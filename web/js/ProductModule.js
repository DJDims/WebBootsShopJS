
import {viewModule} from "./ViewModule.js";

class ProductModule {
    createNewProduct(){
        const title = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const size = document.getElementById("size").value;
        const price = document.getElementById("price").value;
        const count = document.getElementById("quantity").value;
        const picture = document.getElementById("image").value;
        
        const productFields = {
            "title": title,
            "description": description,
            "size": size,
            "price": price,
            "count": count,
            "picture": picture
            
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
                let tablePsesset = 
                    `<table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Название</th>
                                <th scope="col">Описание</th>
                                <th scope="col">Размер</th>
                                <th scope="col">Цена</th>
                            </tr>
                        </thead>
                        <tbody id="table_body" id="table_body">
                            <tr class="table-default">
                            </tr>
                        </tbody>
                    </table>`;
                document.getElementById("content").innerHTML = tablePsesset;
                for (var i = 0; i < response.products.length; i++) {
                    if (response.products[i].quanity === 0){
                        continue;
                    }
                    this.createProductRow(response.products[i]);
                }
            }
        }).catch(error => {
            document.getElementById("info").innerHTML = "Ошибка сервера:" + error;
        });
    }
    
    createProductRow(product) {
        let row = document.createElement("tr");
        row.classList.add("table-default");
        let title = document.createElement("td");
        title.innerText = product.title;
        row.appendChild(title);
        
        let description = document.createElement("td");
        description.innerText = product.description;
        row.appendChild(description);
        
        let size = document.createElement("td");
        size.innerText = product.size;
        row.appendChild(size);
        
        let price = document.createElement("td");
        price.innerText = product.price;
        row.appendChild(price);
        
        let buy = document.createElement("p");
        buy.innerText = "Купить";
//        let func = userModule.buyProduct(product.id);
        buy.addEventListener('click', (e)=>{
            viewModule.showBuyForm(product);
        });
        row.appendChild(buy);
        
        let table = document.getElementById("table_body");
        table.appendChild(row);
    }
    
}

const productModule = new ProductModule(); 
export {productModule};