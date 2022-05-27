package servlets;

import enitys.Role;
import enitys.User;
import enitys.UserRoles;
import facades.RoleFacade;
import facades.UserFacade;
import facades.UserRolesFacade;
import java.io.IOException;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import tools.PasswordProtector;

@WebServlet(name = "LoginServlet", urlPatterns = {
    "/login",
    "/logout",
    "/registration",
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
        role.setRoleName("USER");
        roleFacade.create(role);
        
        UserRoles ur = new UserRoles();
        ur.setRole(role);
        ur.setUser(user);
        userRolesFacade.create(ur);
        role = new Role();
        role.setRoleName("MANAGER");
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
        try (PrintWriter out = response.getWriter()) {
            
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
