
General:
	-This is a collection of movement behaviors from my game ai class
	
	-They are processing sketches designed to be run from the Eclipse IDE
		-make sure that the processing.core jar is set up on the classpath properly
		-the download for processing can be found at processing.org
	
	-Everything else necessary for each behavior should be contained in their respective folders
	
	-If a file is missing for some reason, the TimeLine.java, RealTimeLine.java and BreadCrumb.java files don't change 
	between behaviors and can be borrowed from other behaviors
	
	-look at the main method in the files that get run for the package names I used
		-each behavior gets its own package in Eclipse
	
	-TimeLine.java is an interface that RealTimeLine.java makes use of
	
	-RealTimeLine.java is a time line that is anchored to real time. It is used to track how much time has passed
	
	-BreadCrumb.java represent one of the bread crumbs that gets left behind as the character traverses the screen
	
	-SteeringUnit.java represents a character that is meant to travel around the screen and the steering behaviors it uses
	
	
BasicMovement:

	-the character patrols the edge of the sketch area in this behavior
	-can be seen by running BasicMovement.java

Arrive:

	-this is an implementation of the arrive steering behavior
	-click anywhere in the sketch to direct the character to that location
	-can be seen by running ArriveSteering.java

Wandering:

	-this is an implementation of the wander steering behavior
	-The different wandering algorithms can be changed by changing which of lines 103 and 104 are commented out
	-can be seen by running WanderSteering.java

Flocking:	

	-this is an implementation of flocking behavior
	-can be seen by running Flocking.java
