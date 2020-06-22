package BL.SOS.bizz.biz;

public class Topic{
	private String id;
	private String videoLink;
	private String title;
	private String poster;
	private String postDate;
	private String lastAnswer;
	private String nbviews;
	private String nbComments;
	private String matiere;
	/*public String state;*/
	public String annee;

	public Topic() {

	}

	public Topic(String id, String videoLink, String title, 
			String poster, String postDate, String lastAnswer, 
			String nbviews, String nbComments, String matiere, 
			/*String state,*/ String annee) {
		this.id = id;
		this.videoLink = videoLink;
		this.title = title;
		this.poster = poster;
		this.postDate = postDate;
		this.lastAnswer = lastAnswer;
		this.nbviews = nbviews;
		this.nbComments = nbComments;
		this.matiere = matiere;
		//this.state = state;
		this.annee = annee;
	}

	public Topic(String id, String videoLink, 
			String title, String poster, String postDate, 
			String lastAnswer, String matiere, /*String state,*/ String annee) {
		this.id = id;
		this.videoLink = videoLink;
		this.title = title;
		this.poster = poster;
		this.postDate = postDate;
		this.lastAnswer = lastAnswer;
		this.nbviews = "0";
		this.nbComments = "0";
		this.matiere = matiere;
		//this.state = state;
		this.annee = annee;
	}

	public String toString() {
		return this.id + " " 
				+ this.videoLink 
				+ " " + this.title 
				+ " " + this.poster 
				+ " " + this.postDate 
				+ " " + this.lastAnswer
				+ " " + this.nbComments 
				+ " " + this.nbviews 
				+ " " + this.matiere 
				/*+ " " + this.state*/
				+ " " + this.annee;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getVideoLink() {
		return videoLink;
	}

	public void setVideoLink(String videoLink) {
		this.videoLink = videoLink;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPoster() {
		return poster;
	}

	public void setPoster(String poster) {
		this.poster = poster;
	}

	public String getPostDate() {
		return postDate;
	}

	public void setPostDate(String postDate) {
		this.postDate = postDate;
	}

	public String getLastAnswer() {
		return lastAnswer;
	}

	public void setLastAnswer(String lastAnswer) {
		this.lastAnswer = lastAnswer;
	}

	public String getNbviews() {
		return nbviews;
	}

	public void setNbviews(String nbviews) {
		this.nbviews = nbviews;
	}

	public String getNbComments() {
		return nbComments;
	}

	public void setNbComments(String nbComments) {
		this.nbComments = nbComments;
	}

	public String getMatiere() {
		return matiere;
	}

	public void setMatiere(String matiere) {
		this.matiere = matiere;
	}

	public String getAnnee() {
		return annee;
	}

	public void setAnnee(String annee) {
		this.annee = annee;
	}
	
	

}
