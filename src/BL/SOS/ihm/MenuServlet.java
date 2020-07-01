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
	/**
	 * Usefull for the comparator right above. All the elements of the "annees" are entered in order.
	 * @param str, le tableau "Annees" contenant les niveaux des années.
	 * @param annee L'année entrée en paramètre dont on veut l'index.
	 * @return l'index de l'année entrée en param
	 */
	private int indexOf(String[] str, String annee) {
		
		for (int i = 0; i < str.length; i++) {
			if (str[i].equalsIgnoreCase(annee)) {
				return i;
			}
		}
		return -1;
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		Map<String, Object> body = ServletUtils.decoderBodyJson(req);
		String toSend = "{\"success\":true}";
		
		
		switch((String)body.get("action")){
		//Loading all the items on first load.
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
			System.exit(500);
			break;
		}
	}
}








