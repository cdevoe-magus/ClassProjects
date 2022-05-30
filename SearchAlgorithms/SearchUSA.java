import java.io.*;
import java.util.*;
public class SearchUSA {
	private static int method;
	private static PriorityQueue<Node> frontier;
	private static Hashtable<String, Node> explored;
	private static Node dest;
	private static final int CAP = 10;
	public static void main(String[] args) {
		if(args.length != 3){
			System.out.println("Use: java SearchUSA searchtype srccityname destcityname");
		}else{
			if(!(args[0].toString().equals("astar") || args[0].toString().equals("greedy") || args[0].toString().equals("dp"))){
				System.out.println("Valid searchtypes: astar, greedy, dp");
			}else{
				if(args[0].toString().equals("astar")){
					method = 0;
				}else if(args[0].toString().equals("greedy")){
					method = 1;
				}else{
					method = 2;
				}
				try{
					//init frontier w/ start
					frontier = new PriorityQueue<Node>();
					Scanner init = new Scanner(new File("uscities.pl"));
					dest = null;
					while(init.hasNextLine()){
						if (init.hasNext("city(.*).")) {
							double lat;
							double longit;
							String name = init.next();
							//String name = init.next("[a-zA-Z]*");
							//should clip off the ending comma and beginning city(
							name = name.substring(5, name.length() - 1);
							if (name.equals(args[1])) {
								String number = init.next();
								number = number.substring(0, number.length() - 1);
								Scanner numReader = new Scanner(number);
								lat = numReader.nextDouble();
								numReader.close();
								number = init.next();
								number = number.substring(0, number.length() - 2);
								numReader = new Scanner(number);
								longit = numReader.nextDouble();
								numReader.close();
								frontier.add(new Node(name, 0, null, lat, longit));
							}
							if (name.equals(args[2])) {
								String number = init.next();
								number = number.substring(0, number.length() - 1);
								Scanner numReader = new Scanner(number);
								lat = numReader.nextDouble();
								numReader.close();
								number = init.next();
								number = number.substring(0, number.length() - 2);
								numReader = new Scanner(number);
								longit = numReader.nextDouble();
								numReader.close();
								dest = new Node(name, 0, null, lat, longit);
							} 
						}else{
							init.nextLine();
						}
					}
					init.close();
					if(dest == null){
						System.out.println("Destination not found in file.");
					}else{
						explored = new Hashtable<String, Node>();
						Node path = search(dest);
						if(path == null){
							System.out.println("No path found.");
						}else{
							//print path
							int cost = path.getCost();
							int pathCount = 0;
							String pathOutput = "";
							String expandOutput = "";
							while(path != null){
								pathCount++;
								pathOutput = pathOutput + path.getCityName();
								path = path.getParent();
								if(path != null){
									pathOutput = pathOutput + ", ";
								}
							}
							Enumeration<String> keys = explored.keys();
							while(keys.hasMoreElements()){
								expandOutput = expandOutput + explored.get(keys.nextElement()).getCityName();
								if(keys.hasMoreElements()){
									expandOutput = expandOutput + ", ";
								}
							}
							System.out.println("Explored Nodes: " + expandOutput);
							System.out.println("Number of Nodes expanded: " + explored.size());
							System.out.println("Path: " + pathOutput);
							System.out.println("Number of Nodes in path: " + pathCount);
							System.out.println("Distance traveled: " + cost);
						
						}
					}
				}catch(FileNotFoundException e){
					System.out.println("uscities.pl Not Found.");
				}
			}
		}
	}
	
	public static double calcPriority(Node subject){
		int cost = subject.getCost();
		double estimate = calcHueristic(subject);
		if(method == 0){
			return cost + estimate;
		}else if(method == 1){
			//use hueristic to calc distance to goal
			return estimate;
		}else{
			return cost;
		}
	}
	
	public static Node[] move(Node current){
		//read data and find all roads leading from current
		try {
			Scanner moveGen = new Scanner(new File("usroads.pl"));
			ArrayList<String> cities = new ArrayList<String>(CAP);
			int[] distances = new int[CAP];
			Node[] nodes = new Node[CAP];
			int loc = 0;
			while(moveGen.hasNextLine()){
				if (moveGen.hasNext("road(.*).")) {
					//moveGen.next("road");
					String cityOne = moveGen.next();
					cityOne = cityOne.substring(5, cityOne.length() - 1);
					String cityTwo = moveGen.next();
					cityTwo = cityTwo.substring(0, cityTwo.length() - 1);
					String number = moveGen.next();
					number = number.substring(0, number.length() - 2);
					Scanner numReader = new Scanner(number);
					int distance = numReader.nextInt();
					numReader.close();
					if (current.getCityName().equals(cityOne)) {
						cities.add(cityTwo);
						distances[cities.size() - 1] = distance;
					}
					if (current.getCityName().equals(cityTwo)) {
						cities.add(cityOne);
						distances[cities.size() - 1] = distance;
					} 
				}else if(moveGen.hasNext("city(.*).")){
					double lat;
					double longit;		
					String name = moveGen.next();
					//should clip off the ending comma and beginning city(
					name = name.substring(5, name.length() - 1);
					if(cities.contains(name)){
						String number = moveGen.next();
						number = number.substring(0, number.length() - 1);
						Scanner numReader = new Scanner(number);
						lat = numReader.nextDouble();
						numReader.close();
						number = moveGen.next();
						number = number.substring(0, number.length() - 2);
						numReader = new Scanner(number);
						longit = numReader.nextDouble();
						numReader.close();
						nodes[loc] = new Node(name, distances[cities.indexOf(name)] + current.getCost(), current, lat, longit);
						nodes[loc].setPriority(calcPriority(nodes[loc]));
						loc++;
					}
				}else{
					moveGen.nextLine();
				}
			}
			moveGen.close();
			return nodes;
		} catch (FileNotFoundException e) {
			System.out.println("Map file not found.");
		}
		return null;
	}
	
	public static Node search(Node dest){
		
		while(!frontier.isEmpty()){//frontier not empty
			Node current = frontier.remove();
			if(current.equals(dest)){
				return current;
			}
			//explored.insert(current);
			explored.put(current.getCityName(), current);
			Node[] successors = move(current);
			int i = 0;
			while( (successors[i] != null) && (i < 10)){
				if(!frontier.contains(successors[i]) && !explored.contains(successors[i])){
					frontier.add(successors[i]);
				}else{
					Iterator<Node> frontSearch = frontier.iterator();
					Node update = null;
					if(explored.containsKey(successors[i].getCityName())){
						update = explored.get(successors[i].getCityName());
						if(successors[i].getCost() < update.getCost()){
							update.setCost(successors[i].getCost());
							update.setParent(current);
							update.setPriority(current.getPriority());
						}
					}else{
						while(frontSearch.hasNext()){
							update = frontier.iterator().next();
							if(update.equals(successors[i]) && (successors[i].getCost() < update.getCost())){
								update.setCost(successors[i].getCost());
								update.setParent(current);
								update.setPriority(current.getPriority());
							}
						}
					}
					
					
				}
				i++;
			}
		}
		return null;
	}
	
	public static double calcHueristic(Node subject){
		return Math.sqrt(Math.pow(69.5 * (dest.getLat() - subject.getLat()), 2) + Math.pow(69.5 * Math.cos((dest.getLat() + subject.getLat())/360 * Math.PI) * (dest.getLongit() - subject.getLongit()), 2));
	}

}

//file processing for reading .pl files
