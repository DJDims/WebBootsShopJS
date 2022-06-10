
package servlets;

import entitys.History;
import entitys.Product;
import entitys.Role;
import entitys.User;
import entitys.UserRoles;
import facades.HistoryFacade;
import facades.ProductFacade;
import facades.RoleFacade;
import facades.UserFacade;
import facades.UserRolesFacade;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import jsontools.ProductJsonBuilder;
import jsontools.RoleJsonBuilder;
import jsontools.UserJsonBuilder;
import tools.PasswordProtector;

@WebServlet(name = "MainServlet", urlPatterns = {
    "/changeRole",
    "/getListUsers",
    "/getListRoles",
    "/showIncomes",
    "/createNewProduct",
    "/getListProducts",
    "/editUser",
    "/addMoney",
    "/register",
    "/buyProduct"
})
@MultipartConfig
public class MainServlet extends HttpServlet {
    @EJB private UserFacade userFacade;
    @EJB private RoleFacade roleFacade;
    @EJB private UserRolesFacade userRolesFacade;
    @EJB private HistoryFacade historyFacade;
    @EJB private ProductFacade productFacade;
    
    private final String uploadDir = "D:\\UploadDir\\JPTV20BootsShop";
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        HttpSession session = null;
        JsonObjectBuilder job = Json.createObjectBuilder();
        String path = request.getServletPath();
        switch (path) {
            case "/changeRole":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jsonObject = jsonReader.readObject();
                String userId = jsonObject.getString("userName", "");
                String roleId = jsonObject.getString("roleName", "");
                
                User user = userFacade.findById(Long.parseLong(userId));
                Role role = roleFacade.findById(Long.parseLong(roleId));
                
                userRolesFacade.setRoleToUser(role, user);
                job.add("status", true);
                job.add("info", "Роль успешно изменена");
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/getListUsers":
                List<User> listUsers = userFacade.findAll();
                List<User> listUsersWithoutAdmin = new ArrayList<>();
                for (User user1 : listUsers) {
                    if (user1.getId() == 1) {
                        continue;
                    }
                    listUsersWithoutAdmin.add(user1);
                }
                UserJsonBuilder ujb = new UserJsonBuilder();
                job.add("status", true);
                job.add("info", "Создан массив пользователей");
                job.add("users", ujb.getUsersJsonArray(listUsersWithoutAdmin));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/getListRoles":
                List<Role> listRoles = roleFacade.findAll();
                RoleJsonBuilder rjb = new RoleJsonBuilder();
                job.add("status", true);
                job.add("info", "Создан массив ролей");
                job.add("roles", rjb.getRolesJsonArray(listRoles));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/showIncomes":
                String month = LocalDate.now().getMonth().getDisplayName(TextStyle.FULL, Locale.US);
                int monthInt = LocalDate.now().getMonth().getValue();
                List<History> historys = historyFacade.findAll();
                List<History> monthHistorys = historyFacade.findAllForMonth(monthInt);
                double monthIncome = 0;
                double allIncome = 0;
                for (History history : monthHistorys) {
                    monthIncome += history.getProduct().getPrice();
                }
                for (History history : historys) {
                    allIncome += history.getProduct().getPrice();
                }
                
                job.add("status", true);
                job.add("info", "Создан массив доходов");
                job.add("month", month);
                job.add("monthIncome", monthIncome);
                job.add("allIncome", allIncome);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/createNewProduct":
//                jsonReader = Json.createReader(request.getReader());
//                jsonObject = jsonReader.readObject();
                String title = request.getParameter("name");
                String description = request.getParameter("description");
                String size = request.getParameter("size");
                String price = request.getParameter("price");
                String count = request.getParameter("quantity");
                
                Product product = new Product();
                product.setTitle(title);
                product.setDescription(description);
                product.setSize(Integer.parseInt(size));
                product.setPrice(Integer.parseInt(price));
                product.setQuantity(Integer.parseInt(count));
                
                String coverFileName;
                try {
                    product.setPicture(getPathToCover(request.getPart("picture")));
                } catch (IOException | ServletException e) {
                    coverFileName = request.getParameter("coverFileName");
                    product.setPicture(getPathToCover(coverFileName));
                }
                
                productFacade.create(product);
                
                job.add("status", true);
                job.add("info", "Создан новый товар");
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/getListProducts":
                List<Product> productList = productFacade.findAll();
                ProductJsonBuilder pjb = new ProductJsonBuilder();
                job.add("status", true);
                job.add("info", "Создан массив товаров");
                job.add("products", pjb.getProductsJsonArray(productList));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/editUser":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String firstName = jsonObject.getString("firstName", "");
                String sureName = jsonObject.getString("sureName", "");
                String phone = jsonObject.getString("phone", "");
                String login = jsonObject.getString("login", "");
                String currentUser = jsonObject.getString("currentUser", "");
                
                User editedUser = userFacade.findByLogin(currentUser);
                editedUser.setFirstName(firstName);
                editedUser.setSureName(sureName);
                editedUser.setPhone(phone);
                editedUser.setLogin(login);
                
                userFacade.edit(editedUser);
                ujb = new UserJsonBuilder();
                
                job.add("status", true);
                job.add("info", "Данные пользователя изменены");
                job.add("newUserData", ujb.getUserJsonObject(editedUser));
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/addMoney":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String money = jsonObject.getString("money", "");
                String loginToAdd = jsonObject.getString("login", "");
                
                User userToAdd = userFacade.findByLogin(loginToAdd);
                
                userToAdd.setWallet(userToAdd.getWallet() + Double.parseDouble(money));
                userFacade.edit(userToAdd);
                
                job.add("status", true);
                job.add("info", "Деньги добавлены");
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/register":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String newLogin = jsonObject.getString("login", "");
                String newPassword = jsonObject.getString("password", "");
                String newFirstName = jsonObject.getString("firstName", "");
                String newSureName = jsonObject.getString("sureName", "");
                String newPhone = jsonObject.getString("phone", "");
                
                User newUser = new User();
                newUser.setFirstName(newFirstName);
                newUser.setSureName(newSureName);
                newUser.setLogin(newLogin);
                newUser.setPhone(newPhone);
                PasswordProtector pp = new PasswordProtector();
                String salt = pp.getSalt();
                newUser.setSalt(salt);
                String password = pp.getProtectedPassword(newPassword, salt);
                newUser.setPassword(password);
                
                userFacade.create(newUser);
                
                Role newRole = roleFacade.findRoleByRoleName("CUSTOMER");
                UserRoles newUserRole = new UserRoles();
                newUserRole.setUser(newUser);
                newUserRole.setRole(newRole);
                
                userRolesFacade.create(newUserRole);
                
                job.add("status", true);
                job.add("info", "Новый пользователь зарегистрирован");
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/buyProduct":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String productId = jsonObject.getString("productId", "");
                String customerId = jsonObject.getString("userId", "");
                
                User buyer = userFacade.findById(Long.parseLong(customerId));
                Product productToBuy = productFacade.findById(Long.parseLong(productId));
                if (buyer.getWallet() < productToBuy.getPrice()) {
                    job.add("status", false);
                    job.add("info", "Недостаточно денег");
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                History history = new History();
                history.setProduct(productToBuy);
                history.setUser(buyer);
                history.setPurchaseDate(localdateToDate(LocalDate.now()));
                
                historyFacade.create(history);
                
                buyer.setWallet(buyer.getWallet() - productToBuy.getPrice());
                userFacade.edit(buyer);
                
                productToBuy.setQuantity(productToBuy.getQuantity()-1);
                productFacade.edit(productToBuy);
                
                job.add("status", true);
                job.add("info", "Продукт куплен");
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
        }
    }
    
    private Date localdateToDate(LocalDate dateToConvert){
        return Date.from(dateToConvert.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
    
    private String getPathToCover(Part part) throws IOException {
        String pathToCover = uploadDir + File.separator + getFileName(part);
        File file = new File(pathToCover);
        file.mkdirs();
        try(InputStream fileContent = part.getInputStream()){
            Files.copy(fileContent, file.toPath(), StandardCopyOption.REPLACE_EXISTING);
        }
        return pathToCover;
    }
    private String getPathToCover(String coverFileName){
        File uploadDirFolder = new File(uploadDir);
        File[] listOfFiles = uploadDirFolder.listFiles();
        for (int i = 0; i < listOfFiles.length; i++) {
            if(listOfFiles[i].isFile()){
                if(coverFileName.equals(listOfFiles[i].getName())){
                    return listOfFiles[i].getPath();
                }
            }
        }
        return "";
    }
    private String[] getCoversFileName(){
        Set<String> setPathToCover = new HashSet<>();
        File uploadDirFolder = new File(uploadDir);
        File[] listOfFiles = uploadDirFolder.listFiles();
        if (listOfFiles == null) return null;
        for (int i = 0; i < listOfFiles.length; i++) {
            if(listOfFiles[i].isFile()){
                setPathToCover.add(listOfFiles[i].getName());
            }
        }
        return setPathToCover.toArray(new String[setPathToCover.size()]);
    }
    private String getFileName(Part part){
        final String partHeader = part.getHeader("content-disposition");
        for (String content : part.getHeader("content-disposition").split(";")){
            if(content.trim().startsWith("filename")){
                return content
                        .substring(content.indexOf('=')+1)
                        .trim()
                        .replace("\"",""); 
            }
        }
        return null;
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
