package basicMovement;

public interface TimeLine {
	public void start();
	public void pause();
	public void unpause();
	public long getCurrentTime();
}
