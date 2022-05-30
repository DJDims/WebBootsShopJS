package jsontools;

import entitys.Product;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class ProductJsonBuilder {
    public JsonArray getProductsJsonArray(List<Product> listProducts){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for(int i=0;i<listProducts.size();i++){
            jab.add(getProductJsonObject(listProducts.get(i)));
        }
        return jab.build();
    }
    public JsonObject getProductJsonObject(Product product){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", product.getId());
        job.add("title", product.getTitle());
        job.add("description", product.getDescription());
        job.add("size", product.getSize());
		job.add("price", product.getPrice());
		job.add("quanity", product.getQuantity());
        return job.build();
    }
}