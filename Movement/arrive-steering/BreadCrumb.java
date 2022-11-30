package arriveSteering;

public class BreadCrumb {
	private float x;
	private float y;
	private float rad;
	BreadCrumb(float x, float y, float rad){
		this.setX(x);
		this.setY(y);
		this.setRad(rad);
	}
	public float getX() {
		return x;
	}
	public void setX(float x) {
		this.x = x;
	}
	public float getY() {
		return y;
	}
	public void setY(float y) {
		this.y = y;
	}
	public float getRad() {
		return rad;
	}
	public void setRad(float rad) {
		this.rad = rad;
	}
}
