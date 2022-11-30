package basicMovement;

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
	private static final float tttv = 1;
	private static final float tttRot = (float) 0.1;
	private static final float angSat = (float) Math.PI/32;
	private static final float angDeccel = (float) Math.PI/4;
	private static final float maxPredict = 2;
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
	public float[] seek(float tX, float tY){
		float[] dir = new float[2];
		dir[0] = tX - posX;
		dir[1] = tY - posY;
		float normalize = (float) (1/Math.sqrt(dir[0]*dir[0]+dir[1]*dir[1]));
		dir[0] = dir[0]*normalize;
		dir[1] = dir[1]*normalize;
		dir[0] = dir[0]*maxAccel;
		dir[1] = dir[1]*maxAccel;
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
}
