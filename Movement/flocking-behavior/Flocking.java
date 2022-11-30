package flocking;
import java.util.LinkedList;

import processing.core.PApplet;
public class Flocking extends PApplet {
	private static final float radius = 10;
	private static final int scrnW = 550;
	private static final int scrnH = 550;
	private SteeringUnit travel;
	private LinkedList<BreadCrumb> crumbs;
	private LinkedList<SteeringUnit> flock;
	private float targX;
	private float targY;
	private BreadCrumb[] targets;
	private RealTimeLine time;
	private float sigThresh = (float) 0.0001;
	private float velPart = (float)0.7;
	private float posPart = (float)1.4;
	public static void main(String[] args){
		PApplet.main("flocking.Flocking");
	}
	
	public void settings(){
		size(scrnW,scrnH);
		
	}
	
	public void setup(){
		fill(0,0,240);
		travel = new SteeringUnit(scrnW/2,scrnH/2);
		flock = new LinkedList<SteeringUnit>();
		flock.add(new SteeringUnit(scrnW,scrnH));
		flock.add(new SteeringUnit(0,scrnH));
		flock.add(new SteeringUnit(0,0));
		flock.add(new SteeringUnit(scrnW/2,0));
		flock.add(new SteeringUnit(scrnW/2,scrnH));
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
				//travel.setPosX(travel.getPosX() - scrnW);
				travel.setPosX(scrnW);
				//TODO angle = PI - cur angle also velocity
				travel.setOrient((float)(Math.PI - travel.getOrient()));
				float velMag = (float)Math.sqrt((travel.getvX()*travel.getvX() + travel.getvY()*travel.getvY()));
				travel.setvX((float) (velMag*Math.cos(travel.getOrient())));
				travel.setvY((float) (velMag*Math.sin(travel.getOrient())));
			}
			if(travel.getPosY() > scrnH){
				//travel.setPosY(travel.getPosY() - scrnH);
				travel.setPosY(scrnH);
				//orientation borked
//				travel.setOrient((float)(Math.PI - travel.getOrient()));
				travel.setOrient(-travel.getOrient());
				float velMag = (float)Math.sqrt((travel.getvX()*travel.getvX() + travel.getvY()*travel.getvY()));
				travel.setvX((float) (velMag*Math.cos(travel.getOrient())));
				travel.setvY((float) (velMag*Math.sin(travel.getOrient())));
			}
			if(travel.getPosX() < 0){
				//travel.setPosX(travel.getPosX() + scrnW);
				travel.setPosX(0);
				travel.setOrient((float)(Math.PI - travel.getOrient()));
				float velMag = (float)Math.sqrt((travel.getvX()*travel.getvX() + travel.getvY()*travel.getvY()));
				travel.setvX((float) (velMag*Math.cos(travel.getOrient())));
				travel.setvY((float) (velMag*Math.sin(travel.getOrient())));
			}
			if(travel.getPosY() < 0){
				//travel.setPosY(travel.getPosY() + scrnH);
				travel.setPosY(0);
				//orientation borked
				//travel.setOrient((float)(Math.PI - travel.getOrient()));
				travel.setOrient( -travel.getOrient());
				float velMag = (float)Math.sqrt((travel.getvX()*travel.getvX() + travel.getvY()*travel.getvY()));
				travel.setvX((float) (velMag*Math.cos(travel.getOrient())));
				travel.setvY((float) (velMag*Math.sin(travel.getOrient())));
			}
			for(int i = 0; i < flock.size();i++){
				SteeringUnit cur = flock.get(i);
				cur.update(elapsed);
				if(cur.getPosX() > scrnW){
					cur.setPosX(cur.getPosX() - scrnW);
				}
				if(cur.getPosY() > scrnH){
					cur.setPosY(cur.getPosY() - scrnH);
				}
				if(cur.getPosX() < 0){
					cur.setPosX(cur.getPosX() + scrnW);
				}
				if(cur.getPosY() < 0){
					cur.setPosY(cur.getPosY() + scrnH);
				}
			}
		}
		//fill(120,50,240);
//		for(int i = 0; i < crumbs.size(); i++){
//			circle(crumbs.get(i).getX(),crumbs.get(i).getY(),crumbs.get(i).getRad());
//			if(crumbs.size() > 10){
//				crumbs.removeFirst();
//			}
//		}
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
//		System.out.println(travel.getOrient());
		triangle(triX1,triY1,triX2,triY2,triX3,triY3);
//		rotate(-travel.getOrient());
		circle(travel.getPosX(),travel.getPosY(),2*radius);
		fill(0,240,0);
		for(int i = 0; i < flock.size();i++){
			SteeringUnit cur = flock.get(i);
			triX1 = cur.getPosX()+radius*cos( (float)(cur.getOrient() - Math.PI/2));
			triY1 = cur.getPosY()+radius*sin( (float)(cur.getOrient() - Math.PI/2));
			triX2 = cur.getPosX()+radius*cos( (float)(cur.getOrient() + Math.PI/2));
			triY2 = cur.getPosY()+radius*sin( (float) (cur.getOrient() + Math.PI/2));
			triX3 = cur.getPosX()+3*radius*cos( cur.getOrient());
			triY3 = cur.getPosY()+3*radius*sin( cur.getOrient());
			triangle(triX1,triY1,triX2,triY2,triX3,triY3);
			circle(cur.getPosX(),cur.getPosY(),2*radius);
		}
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
		
		if (elapsed >= 0.1) {
			// insert flocking here
			//arbitration for collision avoid
			//blending for cohesion and vel match
			float[] aveFlockPos = { travel.getPosX(), travel.getPosY() };
			float[] aveFlockVel = { travel.getvX(), travel.getvY() };
			for (int i = 0; i < flock.size(); i++) {
				SteeringUnit cur = flock.get(i);
				aveFlockPos[0] += cur.getPosX();
				aveFlockPos[1] += cur.getPosY();
				aveFlockVel[0] += cur.getvX();
				aveFlockVel[1] += cur.getvY();
			}
			aveFlockPos[0] = aveFlockPos[0] / (flock.size() + 1);
			aveFlockPos[1] = aveFlockPos[1] / (flock.size() + 1);
			aveFlockVel[0] = aveFlockVel[0] / (flock.size() + 1);
			aveFlockVel[1] = aveFlockVel[1] / (flock.size() + 1);
			for (int i = 0; i < flock.size(); i++) {
				float[] aveAccel = { 0, 0 };
				float[] aveDodge = { 0, 0 };
				SteeringUnit cur = flock.get(i);
				for (int j = 0; j < flock.size(); j++) {
					float[] res = {};
					if (j == i) {
						res = cur.collisionAvoid(travel);

					} else {
						res = cur.collisionAvoid(flock.get(j));
					}
					aveDodge[0] += res[0];
					aveDodge[1] += res[1];
				}
				aveDodge[0] = aveDodge[0] / flock.size();
				aveDodge[1] = aveDodge[1] / flock.size();
				if (Math.abs(Math.sqrt(aveDodge[0] * aveDodge[0] + aveDodge[1] * aveDodge[1])) > sigThresh) {
					float norm = (float)Math.abs(Math.sqrt(aveDodge[0] * aveDodge[0] + aveDodge[1] * aveDodge[1]));
					aveDodge[0] = aveDodge[0]/norm*cur.getMaxAccel();
					aveDodge[1] = aveDodge[1]/norm*cur.getMaxAccel();
					cur.setAccelX(aveDodge[0]);
					cur.setAccelY(aveDodge[1]);
					
					
					System.out.println("Collision actually detected.");
					System.out.println(aveDodge[0]);
					System.out.println(aveDodge[1]);
				} else {
					float[] posMatch = cur.arrive(aveFlockPos[0], aveFlockPos[1]);
					float[] velMatch = cur.velMatch(aveFlockVel);
					aveAccel[0] = posPart * posMatch[0] + velPart * velMatch[0];
					aveAccel[1] = posPart * posMatch[1] + velPart * velMatch[1];
					cur.setAccelX(aveAccel[0]);
					cur.setAccelY(aveAccel[1]);
				}

				if (cur.getvX() <= 0.0001 && cur.getvX() >= -0.0001 && cur.getvY() <= 0.0001
						&& cur.getvY() >= -0.0001) {
					ang = cur.getOrient();
				} else if (cur.getvY() <= 0.0001 && cur.getvY() >= -0.0001) {
					if (cur.getvX() < 0) {
						ang = (float) Math.PI;
					} else {
						ang = 0;
					}
				} else if (cur.getvX() <= 0.0001 && cur.getvX() >= 0.0001) {
					if (cur.getvY() < 0) {
						ang = (float) (3 * Math.PI / 2);
					} else {
						ang = (float) (Math.PI / 2);
					}
				} else {
					//ang = (float) Math.atan(travel.getvX()/travel.getvY());
					ang = (float) atan2(cur.getvY(), cur.getvX());
				}
				cur.setAngAccel(cur.align(ang));
			} 
		}
	}
	
	public void mousePressed(){
		targX = mouseX;
		targY = mouseY;
	}
}
