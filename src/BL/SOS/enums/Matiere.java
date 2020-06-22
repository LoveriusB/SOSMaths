package BL.SOS.enums;

public enum Matiere {
	MATHS("Maths"), 
	PHYSIQUE("Physique"), 
	CHIMIE("Chimie");

	private String etat;

	Matiere(String etat) {
		this.etat = etat;
	}

	public String getEtat() {
		return etat;
	}
}
