package BL.SOS.main;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import BL.SOS.annotation.Inject;

public class InjectionService {
	private static Map<String, Object> dependencies = new HashMap<String,Object>();
	
	public void injectDependencies(Object obj) {
		Class<?> classe = obj.getClass();
		Field[] fields = classe.getDeclaredFields();
		try {
			for (Field field : fields) {
				field.setAccessible(true);
				if (field.isAnnotationPresent(Inject.class)) {
					Object fieldObj = null;
					Class<?> classToInject = field.getType();
					String classToInjectName = classToInject.getName();
					String implName = Config.getPropertyValue(classToInjectName);
					if (dependencies.containsKey(implName)) {
						fieldObj = dependencies.get(implName);
					} else {
						Class<?> classImpl = Class.forName(implName);
						Constructor<?> constructor = classImpl.getDeclaredConstructor();
						constructor.setAccessible(true);
						fieldObj = constructor.newInstance();
						injectDependencies(fieldObj);
						dependencies.put(implName, fieldObj);
					}
					field.set(obj, fieldObj);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
