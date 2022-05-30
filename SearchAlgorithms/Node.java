
public class Node implements Comparable<Node>{
	private String cityName;
	private int cost;
	private Node parent;
	private String action;
	private double lat;
	private double longit;
	private double priority;
	
	public Node(String cityName, int cost, Node parent, double lat, double longit){
		this.cityName = cityName;
		this.cost = cost;
		this.parent = parent;
		this.lat = lat;
		this.longit = longit;
		action = "MOVE";
		priority = 0;
	}
	
	public boolean equals(Node other){
		if(this.getCityName().equals(other.getCityName()) && (this.getLat() == other.getLat()) && (this.getLongit() == other.getLongit())){
			return true;
		}else{
			return false;
		}
	}
	
	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public Node getParent() {
		return parent;
	}

	public void setParent(Node parent) {
		this.parent = parent;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public double getLat() {
		// TODO Auto-generated method stub
		return lat;
	}

	public double getLongit() {
		// TODO Auto-generated method stub
		return longit;
	}
	
	public void setLat(double lat) {
		// TODO Auto-generated method stub
		this.lat = lat;
	}

	public void setLongit(double longit) {
		// TODO Auto-generated method stub
		this.longit = longit;
	}
	
	public double getPriority(){
		return priority;
	}
	
	public void setPriority(double priority){
		this.priority = priority;
	}
	@Override
	public int compareTo(Node other) {
		if(other.getPriority() > priority){
			return -1;
		}else if(other.getPriority() < priority){
			return 1;
		}else{
			return 0;
		}
	}
}
