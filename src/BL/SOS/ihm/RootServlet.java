package BL.SOS.ihm;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.servlet.DefaultServlet;

public class RootServlet extends DefaultServlet{
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
			throws ServletException, IOException {
		try {
			if (req.getRequestURI().contentEquals("/")) {
				resp.setContentType("text/html");
				resp.setCharacterEncoding("UTF-8");
				resp.setStatus(HttpServletResponse.SC_OK);
				String body = readAllHtml();
				resp.getWriter().write(body);
			} else {
				super.doGet(req, resp);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(500);
			resp.setContentType("text/html");
			byte[] msgBytes = e.getMessage().getBytes("UTF-8");
			resp.setContentLength(msgBytes.length);
			resp.setCharacterEncoding("UTF-8");
			resp.getOutputStream().write(msgBytes);
		}
	}

	private String readAllHtml() throws IOException {
		/*String baseDirectory = "./public/views"; 
		StringBuilder body = new StringBuilder();
		try (Stream<Path> walk = Files.walk(Paths.get(baseDirectory))) {
			List<String> files = walk.filter(Files::isRegularFile)
					.map(x -> x.toString())
					.filter(x -> x.endsWith(".html"))
					.collect(Collectors.toList());

			for (String path : files) {
				body.append(new String(Files.readAllBytes(Paths.get(path))));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return body.toString();*/
		
		String basePathDirectories = "./public/views/";

	    StringBuilder body = new StringBuilder();


	    body.append(new String(Files.readAllBytes(Paths.get(basePathDirectories + "1index.html"))));
	    body.append(new String(Files.readAllBytes(Paths.get(basePathDirectories + "2LeftMenu.html"))));
	    body.append(new String(Files.readAllBytes(Paths.get(basePathDirectories + "2mainPage.html"))));
	    body.append(new String(Files.readAllBytes(Paths.get(basePathDirectories + "99footer.html"))));

	    return body.toString();
		
		
	}

}
