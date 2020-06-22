package BL.SOS.enums;

public enum Annee {
	PREMIERE("Premiere"), 
	DEUXIEME("Deuxieme"), 
	TROISIEME("Troisieme"), 
	QUATRIEME("Quatrieme"), 
	CINQUIEME("Cinquieme"), 
	SIXIEME("Sixieme");

	private String etat;

	Annee(String etat) {
		this.etat = etat;
	}

	public String getEtat() {
		return etat;
	}
}
