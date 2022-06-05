package servlets;

import entitys.Role;
import entitys.User;
import entitys.UserRoles;
import facades.RoleFacade;
import facades.UserFacade;
import facades.UserRolesFacade;
import java.io.IOException;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jsontools.RoleJsonBuilder;
import jsontools.UserJsonBuilder;
import tools.PasswordProtector;

@WebServlet(name = "LoginServlet", urlPatterns = {
    "/login",
    "/logout",
})
public class LoginServlet extends HttpServlet {
    @EJB private UserFacade userFacade;
    @EJB private RoleFacade roleFacade;
    @EJB private UserRolesFacade userRolesFacade;
    
    @Override
    public void init() throws ServletException {
        super.init();
        if (userFacade.count() > 0) {
            return;
        }
        
        User user = new User();
        user.setFirstName("Dmitrii");
        user.setSureName("Kreivald");
        user.setPhone("+37253064458");
        user.setLogin("admin");
        PasswordProtector pp = new PasswordProtector();
        String salt = pp.getSalt();
        user.setSalt(salt);
        String password = pp.getProtectedPassword("12345", salt);
        user.setPassword(password);
        user.setWallet(1000);
        userFacade.create(user);
        
        Role role = new Role();
        role.setRoleName("CUSTOMER");
        roleFacade.create(role);
        
        UserRoles ur = new UserRoles();
        ur.setRole(role);
        ur.setUser(user);
        userRolesFacade.create(ur);
        role = new Role();
        role.setRoleName("SELLER");
        roleFacade.create(role);
        
        ur = new UserRoles();
        ur.setRole(role);
        ur.setUser(user);
        userRolesFacade.create(ur);
        role = new Role();
        role.setRoleName("ADMINISTRATOR");
        roleFacade.create(role);
        
        ur = new UserRoles();
        ur.setRole(role);
        ur.setUser(user);
        userRolesFacade.create(ur);
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        HttpSession session = null;
        JsonObjectBuilder job = Json.createObjectBuilder();
        
        String path = request.getServletPath();
        switch(path) {
            case "/login":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jsonObject = jsonReader.readObject();
                String login = jsonObject.getString("login","");
                String password = jsonObject.getString("password","");
                User authUser = userFacade.findByLogin(login);
                if (authUser == null) {
                    job.add("info", "Нет такого пользователя").add("auth", false);
                    try(PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                PasswordProtector pp = new PasswordProtector();
                password = pp.getProtectedPassword(password, authUser.getSalt());
                if (!password.equals(authUser.getPassword())) {
                    job.add("info", "Неверный пароль").add("auth", false);
                    try(PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                String roleName = userRolesFacade.getTopRole(authUser);
                Role role = roleFacade.findRoleByRoleName(roleName);
                session = request.getSession(true);
                session.setAttribute("authUser", authUser);
                job.add("info", "Вы вошли как "+authUser.getLogin())
                   .add("auth", true)
                   .add("user", new UserJsonBuilder().getUserJsonObject(authUser))
                   .add("role", new RoleJsonBuilder().getRoleJsonObject(role));
                try(PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            
            case "/logout":
                 session = request.getSession(false);
                if(session != null){
                    session.invalidate();
                }
                job.add("info", "Вы вышли")
                   .add("status", false);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
        }
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
