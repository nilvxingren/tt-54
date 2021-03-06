package valueobject.activity.page;

import java.io.Serializable;

public class PageItemName implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer iid;

    private Integer ipageitemid;

    private String cname;

    private Integer ilanguageid;

    public Integer getIid() {
        return iid;
    }

    public void setIid(Integer iid) {
        this.iid = iid;
    }

    public Integer getIpageitemid() {
        return ipageitemid;
    }

    public void setIpageitemid(Integer ipageitemid) {
        this.ipageitemid = ipageitemid;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname == null ? null : cname.trim();
    }

    public Integer getIlanguageid() {
        return ilanguageid;
    }

    public void setIlanguageid(Integer ilanguageid) {
        this.ilanguageid = ilanguageid;
    }
}