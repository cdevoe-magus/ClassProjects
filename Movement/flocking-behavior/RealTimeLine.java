package flocking;
import java.io.Serializable;

public class RealTimeLine implements TimeLine, Serializable {
	private int tic;
	private long anchorTime;
	private long pausedTime;
	private long lastPaused;
	private static final long serialVersionUID = 66L;
	RealTimeLine(int ticSize){
		tic = ticSize;
	}
	@Override
	public void start() {
		// TODO Auto-generated method stub
		anchorTime = System.currentTimeMillis();
		pausedTime = 0;
		lastPaused = 0;
	}

	@Override
	public void pause() {
		// TODO Auto-generated method stub
		lastPaused = System.currentTimeMillis();
	}

	@Override
	public void unpause() {
		// TODO Auto-generated method stub
		pausedTime += System.currentTimeMillis() - lastPaused;
	}

	@Override
	public long getCurrentTime() {
		// TODO Auto-generated method stub
		return (System.currentTimeMillis() - anchorTime - pausedTime)/tic;
	}
	
	public void setTicSize(int ticSize){
		tic = ticSize;
	}
}
