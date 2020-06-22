package BL.SOS.main;

import javax.servlet.http.HttpServlet;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.webapp.WebAppContext;

import BL.SOS.ihm.MenuServlet;
import BL.SOS.ihm.RootServlet;

public class Main {

	public static void main(String[] args) throws Exception{
		WebAppContext context = new WebAppContext();
		context.setContextPath("/");
		context.setInitParameter("cacheControl", "no-store,no-cache,must-revalidate");
		
		context.addServlet(new ServletHolder(new RootServlet()), "/");
		context.setResourceBase("public");
		
		Config.load("prod.properties");
		InjectionService injectionService = new InjectionService();
		
		
		HttpServlet menuServlet = new MenuServlet();
	    injectionService.injectDependencies(menuServlet);
	    context.addServlet(new ServletHolder(menuServlet), "/menu");
		
		//Add servlets here.
		
		Server server = new Server(Integer.parseInt(Config.getPropertyValue("port")));
		server.setHandler(context);
		server.start();

	}

}
