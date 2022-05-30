
package facades;

import entitys.History;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class HistoryFacade extends AbstractFacade<History> {

    @PersistenceContext(unitName = "WebBootsShopJSPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public HistoryFacade() {
        super(History.class);
    }

    public List<History> findAllForUserByLogin(String login) {
        try {
            return em.createQuery("SELECT h FROM History h WHERE h.user.login=:login").setParameter("login", login).getResultList();
        } catch (Exception e) {
            return null;
        }
    }
    
    public List<History> findAllForMonth(int month) {
        try {
            return em.createQuery("SELECT h FROM History h WHERE EXTRACT(MONTH FROM h.purchaseDate) =:month").setParameter("month", month).getResultList();
        } catch (Exception e) {
            return null;
        }
    }
}
