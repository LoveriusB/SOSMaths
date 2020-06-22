package BL.SOS.ihm;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.owlike.genson.GenericType;
import com.owlike.genson.Genson;

public class MenuServlet extends HttpServlet{

	private Genson gensonUser = new Genson();

	public Map<String, Object> decoderBodyJson(HttpServletRequest req) {
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

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		Map<String, Object> body = decoderBodyJson(req);
		String toSend = "";

		switch((String)body.get("action")){
		case "filter":
			System.out.println("OK");
			System.out.println(body);
			String json = new String(Files.readAllBytes(Paths.get("./public/db/topics.json")));
			List<Topic> topics = gensonUser.deserialize(json, new GenericType<List<Topic>>() {});

			System.out.println(topics);

			/*toSend = "{\"success\":\"true\",\"data\":";
			toSend += new String(Files.readAllBytes(Paths.get("./public/db/topics.json")));
			toSend += "\"}";*/
			toSend = "{\"success\":\"true\", \"data\":"
					+ new String(Files.readAllBytes(Paths.get("./public/db/topics.json")))
					+ "}";

			break;

		default:
			System.out.println("Fuck.");
			break;
		}

		resp.setStatus(200);
		resp.setContentType("application/json");
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write(toSend);
	}
}
//AJOUTER L'ANNEE CORRESPONDANT AU TOPIC

class Topic{
	public String id;
	public String videoLink;
	public String title;
	public String poster;
	public String postDate;
	public String lastAnswer;
	public String nbviews;
	public String nbComments;
	public String cours;
	public String state;

	public Topic() {

	}

	public Topic(String id, String videoLink, String title, String poster, String postDate, String lastAnswer, String nbviews, String nbComments, String cours, String state) {
		this.id = id;
		this.videoLink = videoLink;
		this.title = title;
		this.poster = poster;
		this.postDate = postDate;
		this.lastAnswer = lastAnswer;
		this.nbviews = nbviews;
		this.nbComments = nbComments;
		this.cours = cours;
		this.state = state;
	}

	public Topic(String id, String videoLink, String title, String poster, String postDate, String lastAnswer, String cours, String state) {
		this.id = id;
		this.videoLink = videoLink;
		this.title = title;
		this.poster = poster;
		this.postDate = postDate;
		this.lastAnswer = lastAnswer;
		this.nbviews = "0";
		this.nbComments = "0";
		this.cours = cours;
		this.state = state;
	}

	public String toString() {
		return this.id + " " + this.videoLink + " " + this.title + " " + this.poster + " " + this.postDate + " " + this.lastAnswer +  " " + this.nbComments + " " + this.nbviews + " " + this.cours + " " + this.state;
	}

}








