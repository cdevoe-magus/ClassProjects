Use: java SearchUSA searchtype srccityname destcityname

valid searchtypes: 
  astar, for the A* algorithm
  greedy, for the Greedy Best First algorithm
  dp, for the Dynamic Programing algorithm

City format: 
  Write cities as one word
  First letter of first word is lowercase
  Capitalize first letters of subsequent words 
  ex: kansasCity, newYork, bakersfield
  
 Special Cases:
 
 The UK has two different nodes: uk1 and uk2
 
 Japan has two different nodes: japan1 and japan2
 	japan1 connects to pointReyes 
 	japan2 connects to sanLuisObispo
 
 Albany requires the state to be added to the end
 	albanyGA
 	albanyNY