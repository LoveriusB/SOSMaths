package BL.SOS.ihm;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

public class ServletUtils {


	public static void sendResponse(HttpServletResponse resp, String json, int statusCode) {
		try {
			resp.setStatus(statusCode);
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");
			resp.getWriter().write(json);
		} catch (IOException exception) {
			exception.printStackTrace();
		}
	}
}
