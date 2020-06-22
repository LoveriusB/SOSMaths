package BL.SOS.ihm;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.owlike.genson.GenericType;
import com.owlike.genson.Genson;

import BL.SOS.bizz.biz.Topic;

public class MenuServlet extends HttpServlet{

	private Genson gensonUser = new Genson();
	private String[] annees = {"Premiere","Deuxieme","Troisieme","Quatrieme","Cinquieme","Sixieme"};
	
	private Comparator <Topic> comp = new Comparator<Topic>() {
		@Override
		public int compare(Topic e1, Topic e2) {
			
			int compare = Integer.compare(indexOf(annees, e1.getAnnee()), indexOf(annees, e2.getAnnee()));
			if (compare == 0) {
				compare = e1.getMatiere().compareTo(e2.getMatiere());
				if (compare == 0) {
					return e1.getId().compareTo(e2.getId());
				}
			}
			return compare;
		}
	};
	
	private int indexOf(String[] str, String annee) {
		
		for (int i = 0; i < str.length; i++) {
			if (str[i].equalsIgnoreCase(annee)) {
				return i;
			}
		}
		
		return -1;
	}
	

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
		String toSend = "{\"success\":true}";
		switch((String)body.get("action")){
		
		
		case "filter":
			filterTopics(resp, body);
			break;
			
		case "firstLoad":
			String json = new String(Files.readAllBytes(Paths.get("./public/db/topics.json")));
			List<Topic> topics = gensonUser.deserialize(json, new GenericType<List<Topic>>() {});
			List filtered = topics.stream()
					.sorted(comp)
					.collect(Collectors.toList());
			
			toSend = "{\"success\":\"true\", \"data\":"
					+ gensonUser.serialize(filtered)
					+ "}";
			
			ServletUtils.sendResponse(resp, toSend, 200);
			break;
		default:
			//Should never happen ;)
			System.out.println("Fuck.");
			break;
		}
	}
	
	/**
	 * Filter of the elements depends on the filters selected on the page.
	 * If they are empty or if only one of them is empty or if none of them is empty
	 * the behavior of the filter will change.
	 * 
	 * The point of this function is to send back all the topics corresponding to what
	 * the user wants.
	 * @param resp the reponse of the server
	 * @param body all the content of the request (including the filters of course).
	 */
	public void filterTopics(HttpServletResponse resp, Map<String, Object> body ) {
		String toSend = "";
		System.out.println(body);
		String json;
		try {
			json = new String(Files.readAllBytes(Paths.get("./public/db/topics.json")));
			List<Topic> topics = gensonUser.deserialize(json, new GenericType<List<Topic>>() {});
			List filtered = new ArrayList();
			if (((ArrayList)body.get("filtersService")).isEmpty() && ((ArrayList)body.get("filterYear")).isEmpty()) {
				filtered = topics.stream()
						.sorted(comp)
						.collect(Collectors.toList());
			} else if (!((ArrayList<Topic>)body.get("filtersService")).isEmpty() && ((ArrayList<Topic>)body.get("filterYear")).isEmpty()) {
				filtered = topics.stream()
						.filter(t -> ((ArrayList)body.get("filtersService")).contains(t.getMatiere()))
						.sorted(comp)
						.collect(Collectors.toList());	
			} else if (((ArrayList<Topic>)body.get("filtersService")).isEmpty() && !((ArrayList<Topic>)body.get("filterYear")).isEmpty()) {
				filtered = topics.stream()
						.filter(t -> ((ArrayList)body.get("filterYear")).contains(t.getAnnee()))
						.sorted(comp)
						.collect(Collectors.toList());
			} else {
				filtered = topics.stream()
						.filter(t -> ((ArrayList)body.get("filtersService")).contains(t.getMatiere())
								&& ((ArrayList)body.get("filterYear")).contains(t.getAnnee()))
						.sorted(comp)
						.collect(Collectors.toList());
			}
			toSend = "{\"success\":\"true\", \"data\":"
					+ gensonUser.serialize(filtered)
					+ "}";
			ServletUtils.sendResponse(resp, toSend, 200);
		} catch (IOException e) {
			e.printStackTrace();
			toSend = "{\"success\":false, \"error\":\"Error during reading the topics.json db\"}";
			ServletUtils.sendResponse(resp, toSend, HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			
		}	
	}
}








