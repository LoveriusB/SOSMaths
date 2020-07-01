package BL.SOS.ihm;

import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ConnectionServlet extends HttpServlet{

	public void doPost(HttpServletRequest req, HttpServletResponse resp){
		
		Map<String, Object> body = ServletUtils.decoderBodyJson(req);
	    String action = (String) body.get("action");
		
		switch (action) {
			case "register":
				try {
					registerUser(resp, body);
				} catch (Exception exception) {
					exception.printStackTrace();
				}
				break;
			case "connection":
				try {
					login(resp, body);
				} catch (Exception exception) {
					exception.printStackTrace();
				}
				break;
			default:
				break;
		}
	}

	private void login(HttpServletResponse resp, Map<String, Object> body) {
		System.out.println("Login " + body.toString());
		
	}

	private void registerUser(HttpServletResponse resp, Map<String, Object> body) {
		System.out.println("Register " + body.toString());
		
	}

}
