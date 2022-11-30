package wanderSteering;
import java.util.LinkedList;

import processing.core.PApplet;
public class WanderSteering extends PApplet {
	private static final float radius = 10;
	private static final int scrnW = 550;
	private static final int scrnH = 550;
	private SteeringUnit travel;
	private LinkedList<BreadCrumb> crumbs;
	private float targX;
	private float targY;
	private BreadCrumb[] targets;
	private RealTimeLine time;
	public static void main(String[] args){
		PApplet.main("wanderSteering.WanderSteering");
	}
	
	public void settings(){
		size(scrnW,scrnH);
		
	}
	
	public void setup(){
		fill(0,0,240);
		travel = new SteeringUnit(275,275);
		targX = 275;
		targY = 275;
		crumbs = new LinkedList<BreadCrumb>();
		targets = new BreadCrumb[4];
		targets[0] = new BreadCrumb(525-radius,525-radius, radius/2);
		targets[1] = new BreadCrumb(525-radius,25+radius,radius/2);
		targets[2] = new BreadCrumb(25+radius,25+radius,radius/2);
		targets[3] = new BreadCrumb(25+radius,525-radius,radius/2);
		time = new RealTimeLine(100);
		time.start();
	}
	
	public void draw(){
		background(192,64,0);
		//fill(0,240,0);
//		for(int i = 0; i < targets.length; i++){
//			circle(targets[i].getX(),targets[i].getY(),targets[i].getRad());
//		}
		fill(0,0,240);
		//float elapsed = time.getCurrentTime();
		//float curOrient = travel.getOrient();
		//float elapsed = (float) 0.3;//debug value
		float elapsed = (float) time.getCurrentTime()/10;
		//System.out.println(elapsed);
		if (elapsed >= 0.1) {
			time.start();
			crumbs.add(new BreadCrumb(travel.getPosX(), travel.getPosY(), radius / 2));
			travel.update(elapsed);
			//wrap to other side of screen if off screen
			if(travel.getPosX() > scrnW){
				travel.setPosX(travel.getPosX() - scrnW);
			}
			if(travel.getPosY() > scrnH){
				travel.setPosY(travel.getPosY() - scrnH);
			}
			if(travel.getPosX() < 0){
				travel.setPosX(travel.getPosX() + scrnW);
			}
			if(travel.getPosY() < 0){
				travel.setPosY(travel.getPosY() + scrnH);
			}
		}
		//fill(120,50,240);
		for(int i = 0; i < crumbs.size(); i++){
			circle(crumbs.get(i).getX(),crumbs.get(i).getY(),crumbs.get(i).getRad());
			if(crumbs.size() > 10){
				crumbs.removeFirst();
			}
		}
		float triX1 = travel.getPosX()+radius*cos( (float)(travel.getOrient() - Math.PI/2));
		float triY1 = travel.getPosY()+radius*sin( (float)(travel.getOrient() - Math.PI/2));
		float triX2 = travel.getPosX()+radius*cos( (float)(travel.getOrient() + Math.PI/2));
		float triY2 = travel.getPosY()+radius*sin( (float) (travel.getOrient() + Math.PI/2));
		float triX3 = travel.getPosX()+3*radius*cos( travel.getOrient());
		float triY3 = travel.getPosY()+3*radius*sin( travel.getOrient());
//		float triX1 = travel.getPosX();
//		float triY1 = travel.getPosY()+radius;
//		float triX2 = travel.getPosX();
//		float triY2 = travel.getPosY()-radius;
//		float triX3 = travel.getPosX()+2*radius;
//		float triY3 = travel.getPosY();
//		rotate(travel.getOrient());
		System.out.println(travel.getOrient());
		triangle(triX1,triY1,triX2,triY2,triX3,triY3);
//		rotate(-travel.getOrient());
		circle(travel.getPosX(),travel.getPosY(),2*radius);
//		float[] vecToTarget = {targX-travel.getPosX(),targY-travel.getPosY()};
		
//		float distToGoal = (float) Math.sqrt(vecToTarget[0]*vecToTarget[0]+vecToTarget[1]*vecToTarget[1]);
//		if(distToGoal < travel.getRSat()){
//			target++;
//			if(target >=4){
//				target = target%4;
//			}
//		}
		
		float[] accel = travel.wander();
		//float[] accel = travel.wander2();
		travel.setAccelX(accel[0]);
		travel.setAccelY(accel[1]);
//		travel.wander();
		//maybe try aligning in direction of accel?
		float ang = 0;
		if(travel.getvX() <= 0.0001 && travel.getvX() >= -0.0001 && travel.getvY() <= 0.0001 && travel.getvY() >= -0.0001){
			ang = travel.getOrient();
		}else if(travel.getvY() <= 0.0001 && travel.getvY() >= -0.0001){
			if(travel.getvX() < 0){
				ang = (float)Math.PI;
			}else{
				ang = 0;
			}	
		}else if(travel.getvX() <= 0.0001 && travel.getvX() >= 0.0001){
			if(travel.getvY() < 0){
				ang = (float) (3*Math.PI/2);
			}else{
				ang = (float)(Math.PI/2);
			}
		}else{
			//ang = (float) Math.atan(travel.getvX()/travel.getvY());
			ang = (float) atan2(travel.getvY(),travel.getvX());
		}
		travel.setAngAccel(travel.align(ang));
		//travel.update();
	}
	
	public void mousePressed(){
		targX = mouseX;
		targY = mouseY;
	}
}
