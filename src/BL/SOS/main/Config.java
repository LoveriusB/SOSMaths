package BL.SOS.main;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Config {
	private static Properties props = new Properties();
	private static Map<String, Object> dependencies = new HashMap<String, Object>();
	
	
	/**
	 * Charge le fichier properties
	 * 
	 * @param pathname : le fichier à charger.
	 */
	public static void load(String pathname) {
		FileInputStream file;
		try {
			file = new FileInputStream(pathname);
			props.load(file);
			file.close();
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
	}
	
	public static String getPropertyValue(String prop) {
		if (dependencies.containsKey(prop)) {
			return (String) dependencies.get(prop);
		} else {
			String value = (String) props.get(prop);
			dependencies.put(prop, value);
			return value;
		}
	}
}
