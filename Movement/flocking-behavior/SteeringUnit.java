package flocking;

public class SteeringUnit {
	private float posX;
	private float posY;
	private float vX;
	private float vY;
	private float accelX;
	private float accelY;
	private float orient;
	private float rotV;
	private float angAccel;
	private static final float maxAccel = 20;
	private static final float maxV = 50;
	private static final float maxAngAcc = (float) Math.PI/4;
	private static final float maxRot = (float) Math.PI/4;
	private static final float radSat = 5;
	private static final float radDeccel = 60;
	//these time values are in seconds
	private static final float tttv = 2;
	private static final float tttRot = (float)0.1;
	private static final float angSat = (float) Math.PI/32;
	private static final float angDeccel = (float) Math.PI/4;
	private static final float maxPredict = 2;
	//wander stuff
	private float wandRad = 80;//10;
	private float wandOff = 80;//20;
	private float wandRate = (float)(2*Math.PI);
	//wander second set
	private float coneSize = (float)(Math.PI/2);
	private float dist = 60;
	//collision avoid
	private float tThresh = (float)10;
	private float colThresh = 50;
	
	SteeringUnit(float posX, float posY){
		this.posX = posX;
		this.posY = posY;
		vX = 0;
		vY = 0;
		accelX = 0;
		accelY = 0;
		orient = 0;
		rotV = 0;
		angAccel = 0;
	}
	
	public float getPosX() {
		return posX;
	}
	
	public void setPosX(float posX) {
		this.posX = posX;
	}
	
	public float getPosY() {
		return posY;
	}
	
	public void setPosY(float posY) {
		this.posY = posY;
	}
	
	public float getvX() {
		return vX;
	}
	
	public void setvX(float vX) {
		this.vX = vX;
	}
	
	public float getvY() {
		return vY;
	}
	
	public void setvY(float vY) {
		this.vY = vY;
	}
	
	public float getAccelX() {
		return accelX;
	}
	
	public void setAccelX(float accelX) {
		this.accelX = accelX;
	}
	
	public float getAccelY() {
		return accelY;
	}
	
	public void setAccelY(float accelY) {
		this.accelY = accelY;
	}
	
	public float getOrient() {
		return orient;
	}
	
	public void setOrient(float orient) {
		this.orient = orient;
	}
	
	public float getRotV() {
		return rotV;
	}
	
	public void setRotV(float rotV) {
		this.rotV = rotV;
	}
	
	public float getAngAccel() {
		return angAccel;
	}
	
	public void setAngAccel(float angAccel) {
		this.angAccel = angAccel;
	}
	
	public void update(float time){
		//need negative check
//		if(Math.abs(accelX) > maxAccel){
//			int sign = Math.round((float)(accelX/Math.abs(accelX)));
//			accelX = sign*maxAccel;
//		}
//		if(Math.abs(accelY) > maxAccel){
//			int sign = Math.round((float)(accelY/Math.abs(accelY)));
//			accelY = sign*maxAccel;
//		}
		if(Math.sqrt(accelX*accelX + accelY*accelY) > maxAccel){
			float normalize = (float)Math.sqrt(accelX*accelX + accelY*accelY);
			accelX = accelX/normalize*maxAccel;
			accelY = accelY/normalize*maxAccel;
		}
		vX += accelX*time;
		vY += accelY*time;
//		if(Math.abs(vX) > maxV){
//			int sign = Math.round((float)(vX/Math.abs(vX)));
//			vX = sign*maxV;
//		}
//		if(Math.abs(vY) > maxV){
//			int sign = Math.round((float)(vY/Math.abs(vY)));
//			vY = sign*maxV;
//		}
		if(Math.sqrt(vX*vX + vY*vY) > maxV){
			float normalize = (float)Math.sqrt(vX*vX + vY*vY);
			vX = vX/normalize*maxV;
			vY = vY/normalize*maxV;
		}
		posX += vX*time;
		posY += vY*time;
		if(Math.abs(angAccel) > maxAngAcc){
			int sign = Math.round((float)(angAccel/Math.abs(angAccel)));
			angAccel = sign*maxAngAcc;
		}
		rotV += angAccel*time;
		if(Math.abs(rotV) > maxRot){
			int sign = Math.round((float)(rotV/Math.abs(rotV)));
			rotV = sign*maxRot;
		}
		orient += rotV*time;
		orient %= 2*Math.PI;
	}
	
	public float[] seek(float tX, float tY, boolean flee){
		float[] dir = new float[2];
		dir[0] = tX - posX;
		dir[1] = tY - posY;
		float normalize = (float) (1/Math.sqrt(dir[0]*dir[0]+dir[1]*dir[1]));
		if(normalize <= 0.0001 && normalize >= -0.0001){
			if (!flee) {
				dir[0] = 0;
				dir[1] = 0;
				return dir;
			}else{
				dir[0] = -vX;
				dir[1] = -vY;
				normalize = (float)Math.sqrt(dir[0]*dir[0] + dir[1]*dir[1]);
				dir[0] = dir[0]/normalize*maxAccel;
				dir[1] = dir[1]/normalize*maxAccel;
				return dir;
			}
		}
		
		dir[0] = dir[0]*normalize;
		dir[1] = dir[1]*normalize;
		dir[0] = dir[0]*maxAccel;
		dir[1] = dir[1]*maxAccel;
		if(flee){
			dir[0] = -dir[0];
			dir[1] = -dir[1];
		}
		return dir;
	}
	
	public float[] flockSeek(float[] fPos, float[] fOtherPos, boolean flee){
		float[] dir = {fOtherPos[0] - fPos[0], fOtherPos[1] - fPos[1]};
		float normalize = (float)Math.sqrt(dir[0]*dir[0]+dir[1]*dir[1]);
		if(normalize <= 0.0001 && normalize >= -0.0001){
			if (!flee) {
				dir[0] = 0;
				dir[1] = 0;
				return dir;
			}else{
				dir[0] = (float)Math.random();
				dir[1] = (float)Math.random();
				normalize = (float)Math.sqrt(dir[0]*dir[0] + dir[1]*dir[1]);
				dir[0] = dir[0]/normalize*maxAccel;
				dir[1] = dir[1]/normalize*maxAccel;
				return dir;
			}
		}
		dir[0] = dir[0]/normalize*maxAccel;
		dir[1] = dir[1]/normalize*maxAccel;
		if(flee){
			dir[0] = -dir[0];
			dir[1] = -dir[1];
		}
		return dir;
	}
	
	public float[] arrive(float tX, float tY){
		float[] dir = {tX - posX, tY - posY};
		float dist = (float) Math.sqrt(dir[0]*dir[0] + dir[1]*dir[1]);
		float goalSpd = 0;
		if (dist < radSat){
			//do nothing, goalSpd already 0
		}else if(dist > radDeccel){
			goalSpd = maxV;
		}else{
			goalSpd = dist/radDeccel;
		}
		float[] vel = {0,0};
		if (dist != 0) {
			vel[0] = dir[0]/dist;
			vel[1] = dir[1]/dist;
		}
		vel[0] = vel[0] * goalSpd;
		vel[1] = vel[1] * goalSpd;
		float[] a = {vel[0] - vX,vel[1] - vY};
		a[0] = a[0]/tttv;
		a[1] = a[1]/tttv;
		return a;
	}
	
	public float mapToRange(float rad){
		float r = (float) (rad%(2*Math.PI));
		if(Math.abs(r) <= Math.PI){
			return r;
		}else if(r > Math.PI){
			return (float) (r - 2*Math.PI);
		}else{
			return (float) (r + 2*Math.PI);
		}
		//return 0;
	}
	
	public float align(float tOrient){
		float rot = tOrient - orient;
		rot = mapToRange(rot);
		float rotSize = Math.abs(rot);
		float goalRot;
		if(rotSize < angSat){
			goalRot = 0;
		}else if(rotSize > angDeccel){
			goalRot = maxRot;
		}else{
			goalRot = maxRot*rotSize/angDeccel;
		}
		if (rotSize != 0) {
			goalRot = goalRot * rot / rotSize;
		}else{
			goalRot = 0;
		}
	//	goalRot = goalRot * rot/Math.abs(rot);
		float steerAng = goalRot - rotV;
		steerAng /= tttRot;
		return steerAng;
	}
	
	public float[] pursue(SteeringUnit target,boolean evade){
		float[] dir = {target.getPosX()-posX, target.getPosY()-posY};
		float dist = (float) Math.sqrt(dir[0]*dir[0]+dir[1]*dir[1]);
		float spd = (float) Math.sqrt(target.getvX()*target.getvX() + target.getvY()*target.getvY());
		float predTime;
		if(spd <= dist/maxPredict){
			predTime = maxPredict;
		}else{
			predTime = dist/spd;
		}
		float[] ntPos = {target.getPosX()+predTime*target.getvX(), target.getPosY()+predTime*target.getvY()};
		float[] a = arrive(ntPos[0],ntPos[1]);
		if(evade){
			a[0] = -a[0];
			a[1] = -a[1];
		}
			return a;
		
	}
	public float getRSat() {
		return radSat;
	}
	
	public float[] wander(){
		//float[] accel = {0,0};
		float wandOrient = (float) (Math.random() * wandRate);
		float targOrient = orient + wandOrient;
		float targX = (float)(posX + wandOff * Math.cos(orient));
		float targY = (float)(posY + wandOff * Math.sin(orient));
		targX += wandRad * Math.cos(targOrient);
		targY += wandRad * Math.sin(targOrient); 
		return arrive(targX,targY);
	}
	
	public float[] wander2(){
		float targOrient = (float)(orient + (2*coneSize*Math.random() - coneSize));
		float targX = (float) (dist*Math.cos(targOrient));
		float targY = (float) (dist*Math.sin(targOrient));
		targX += posX;
		targY += posY;
		return arrive(targX, targY);
	}
	
	public float[] collisionAvoid(SteeringUnit other){
		float diffX = posX - other.getPosX();
		float diffY = posY - other.getPosY();
		float diffVX = vX - other.getvX();
		float diffVY = vY - other.getvY();
		float dot = -(diffX*diffVX + diffY*diffVY);
		//sqrt and square should cancel out
		float denom = diffVX*diffVX + diffVY*diffVY;
		if(denom <= 0.0001 && denom >= -0.0001){
			float[] accel = {0,0};
			return accel;
		}
		float t = dot/denom;
		if(t < 0){
			float[] accel = {0,0};
			return accel;
		}else if(t > tThresh){
			float[] accel = {0,0};
			return accel;
		}else{
			float[] fCPos = {posX + vX*t, posY + vY*t};
			float[] fOPos = {other.getPosX() + other.getvX()*t,other.getPosY() + other.getvY()*t};
			float fDist = (float) Math.sqrt((fOPos[0] - fCPos[0])*(fOPos[0]-fCPos[0]) + (fOPos[1] - fCPos[1])*(fOPos[1]- fCPos[1]));
			if( fDist < 2*colThresh ){
				return flockSeek(fCPos,fOPos,true);
			}else{
				float[] accel = {0,0};
				return accel;
			}
			
		}
		
	}
	
	public float[] velMatch(float[] vel){
		float[] diffV = {vel[0] - vX, vel[1] - vY};
		diffV[0] = diffV[0]/tttv;
		diffV[1] = diffV[1]/tttv;
		return diffV;
	}

	public float getMaxAccel() {
		// TODO Auto-generated method stub
		return maxAccel;
	}
}
