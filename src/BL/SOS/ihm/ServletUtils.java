package BL.SOS.ihm;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.owlike.genson.Genson;

public class ServletUtils {

	private static Genson gensonUser = new Genson();

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
	
	
	/**
	 * Decode the body of our req variable sended by JS
	 * @param req the request gottent by JS
	 * @return the body decoded as a map.
	 */
	public static Map<String, Object> decoderBodyJson(HttpServletRequest req) {
		StringBuffer jb = new StringBuffer();
		String line = null;

		try {
			BufferedReader reader = req.getReader();
			while ((line = reader.readLine()) != null) {
				jb.append(line);
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}

		Map<String, Object> body = gensonUser.deserialize(jb.toString(), Map.class);
		return body;
	}
}
