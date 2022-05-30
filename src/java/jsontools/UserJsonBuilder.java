package jsontools;

import entitys.User;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

public class UserJsonBuilder {
    public JsonArray getUsersJsonArray(List<User> listUser){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for(int i=0;i<listUser.size();i++){
            jab.add(getUserJsonObject(listUser.get(i)));
        }
        return jab.build();
    }
    public JsonObject getUserJsonObject(User User){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", User.getId());
		job.add("login", User.getLogin());
		job.add("password", User.getPassword());
		job.add("firstName", User.getFirstName());
		job.add("sureName", User.getSureName());
		job.add("phone", User.getPhone());
		job.add("wallet", User.getWallet());
		job.add("salt", User.getSalt());

        return job.build();
    }
}