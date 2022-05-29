/**
 * 
 */
/* GLOBAL CONSTANTS AND VARIABLES */

/* assignment specific globals */
const WIN_Z = 0;  // default graphics window z coord in world space
const WIN_LEFT = 0; const WIN_RIGHT = 1;  // default left and right x coords in world space
const WIN_BOTTOM = 0; const WIN_TOP = 1;  // default top and bottom y coords in world space
const INPUT_TRIANGLES_URL = "https://ncsucgclass.github.io/prog4/triangles.json"; // triangles file loc
const INPUT_SPHERES_URL = "https://ncsucgclass.github.io/prog2/spheres.json"; // spheres file loc
const INPUT_SNAKES_LOC = "https://github.ncsu.edu/ctdevoe/ctdevoe.github.io/snakes.json";
const PLAY_FIELD_Z = 0.71;
var Eye = new vec4.fromValues(-0.6,-0.6,-0.1,1.0); // default eye position in world space
var Up = new vec3.fromValues(0,1,0);
var Center = new vec3.fromValues(-0.6,-0.6,0);
//var Center = new vec3.fromValues(0,0,0);
var At = new vec3.fromValues(1,0,0);
var light = {x:-3, y:1, z:-0.5, ambient:[1.0,1.0,1.0], diffuse:[1.0,1.0,1.0], specular:[1.0,1.0,1.0]};
/* webgl globals */
var gl = null; // the all powerful gl object. It's all here folks!
var vertexBuffer; // this contains vertex coordinates in triples
var triangleBuffer; // this contains indices into vertexBuffer in triples
var triBufferSize; // the number of indices in the triangle buffer
var vertexPositionAttrib; // where to put position for vertex shader
//need to dupe triangle buffer and size for the split
//colors
var ambBuffer;
var diffBuffer;
var specBuffer;
var normBuffer;
var hBuffer;
var lightBuffer;
var ambArray = [];
var diffArray = []; //holds alpha value as well
var specArray = []; //holds n as well
var ambAttrib;
var diffAttrib;
var specAttrib;
var lightVecArray = [];
var lightAmbVar;
var lightDiffVar;
var lightSpecVar;
var normAttrib;
var hAttrib;
var lightVecAttrib;
//viewing matrices
var perspecMatrix = mat4.create();
var perspecVar;
var lookAtMatrix = mat4.create();
var lookAtVar;
var transMatrix = mat4.create();
var transVar;
//textures
var uvAttrib;
var uvBuffer;
var uvArray = [];
var texSamplerVar;
var texArray = [];
var texBuffer;
var mod = false;
var modLoc;
var col = false;
var colLoc;
var trans = false;
var transLoc;
//opaques
var opaqueAmbBufArray = [];
var opaqueDiffBufArray = [];
var opaqueSpecBufArray = [];
var opaqueTexArray = [];
var opaqueBufArray = [];
var opaquehBufArray = [];
var opaqueNormBufArray = [];
var opaqueUvBufArray = [];
var opaqueLightBufArray = [];
var opaqueTriBufArray = [];
var opaqueCount = [];
//not opaques
var notAmbBufArray = [];
var notDiffBufArray = [];
var notSpecBufArray = [];
var notTexArray = [];
var notBufArray = [];
var nothBufArray = [];
var notNormBufArray = [];
var notUvBufArray = [];
var notLightBufArray = [];
var notTriBufArray = [];
var notCount = [];
//Snake stuff
var p2 = false;
//player1
var pc1Spawn = [0,0];
//var pcSnake = {
//		"x":0,
//		"y":0,
//		"nextSeg":null, 
//		"facing":[1,0], 
//		"speed":0.04, 
//		"visual":{"ambient": [0,0,0.2], "diffuse": [0,0,0.5], "specular": [0,0,0.3], "n": 12, "alpha":1}, 
//		"collidable":true,
//		"width": 1,
//		"height": 1,
//		"normal": [0,0,-1],
//		"verts": [[-0.02,0.02,0.75],[0.02,0.02,0.75],[-0.02,-0.02,0.75],[0.02,-0.02,0.75]],
//		"tris": [[0,1,2],[1,3,2]]
//	};
var pcSnake;
var p1VArray = [];
var S1Buffer;
var S1BufferSize;
var S1IndexArray = [];
var S1IBuffer;
var p1AmbBuffer;
var p1DiffBuffer;
var p1SpecBuffer;
var p1NormBuffer;
var p1HBuffer;
var p1LightBuffer;
var p1AmbArray = [];
var p1DiffArray = []; //holds alpha value as well
var p1SpecArray = []; //holds n as well
var p1NormArray = [];
var p1AmbAttrib;
var p1DiffAttrib;
var p1SpecAttrib;
var p1LightVecArray = [];
var p1HArray = [];
var p1LightAmbVar;
var p1LightDiffVar;
var p1LightSpecVar;
var p1NormAttrib;
var p1HAttrib;
var p1LightVecAttrib;
var p1Offset = 0;

//npc
var npcSpawn = [0,0];
//var npcSnake = {
//		"x":0,
//		"y":0,
//		"nextSeg":null, 
//		"facing":[1,0], 
//		"speed":0.04, 
//		"visual":{"ambient": [0.2,0,0], "diffuse": [0.5,0,0], "specular": [0.3,0,0], "n": 12, "alpha":1}, 
//		"collidable":true,
//		"width": 1,
//		"height": 1,
//		"normal": [0,0,-1],
//		"verts": [[-0.02,0.02,0.75],[0.02,0.02,0.75],[-0.02,-0.02,0.75],[0.02,-0.02,0.75]],
//		"tris": [[0,1,2],[1,3,2]]
//	};
var npcSnake;
var npcArray = [];
var npcBuffer;
var npcBufferSize;
var npcIndexArray = [];
var npcIBuffer;
var npcAmbBuffer;
var npcDiffBuffer;
var npcSpecBuffer;
var npcNormBuffer;
var npcHBuffer;
var npcLightBuffer;
var npcAmbArray = [];
var npcDiffArray = []; //holds alpha value as well
var npcSpecArray = []; //holds n as well
var npcNormArray = [];
var npcAmbAttrib;
var npcDiffAttrib;
var npcSpecAttrib;
var npcLightVecArray = [];
var npcHArray = [];
var npcLightAmbVar;
var npcLightDiffVar;
var npcLightSpecVar;
var npcNormAttrib;
var npcHAttrib;
var npcLightVecAttrib;
var npcOffset = 0;

//player2
var pc2Spawn = [0,0];
//var pc2Snake = {
//		"x":0,
//		"y":0,
//		"nextSeg":null, 
//		"facing":[1,0], 
//		"speed":0.04, 
//		"visual":{"ambient": [0,0.2,0], "diffuse": [0,0.5,0], "specular": [0,0.3,0], "n": 12, "alpha":1}, 
//		"collidable":true,
//		"width": 1,
//		"height": 1,
//		"normal": [0,0,-1],
//		"verts": [[-0.02,0.02,0.75],[0.02,0.02,0.75],[-0.02,-0.02,0.75],[0.02,-0.02,0.75]],
//		"tris": [[0,1,2],[1,3,2]]
//	};
var pc2Snake;
var p2VArray = [];
var S2Buffer;
var S2BufferSize;
var S2IndexArray = [];
var S2IBuffer;
var p2AmbBuffer;
var p2DiffBuffer;
var p2SpecBuffer;
var p2NormBuffer;
var p2HBuffer;
var p2LightBuffer;
var p2AmbArray = [];
var p2DiffArray = []; //holds alpha value as well
var p2SpecArray = []; //holds n as well
var p2NormArray = [];
var p2AmbAttrib;
var p2DiffAttrib;
var p2SpecAttrib;
var p2LightVecArray = [];
var p2HArray = [];
var p2LightAmbVar;
var p2LightDiffVar;
var p2LightSpecVar;
var p2NormAttrib;
var p2HAttrib;
var p2LightVecAttrib;
var p2Offset = 0;
//control var
var npcTimer = 0;
var fieldHeight = 1.2;
var fieldWidth = 1.2;
//var food = {
//		x:0,
//		y:0,
//		visual:{"ambient": [0.2,0.2,0.2], "diffuse": [0.5,0.5,0.5], "specular": [0.3,0.3,0.3], "n": 12, "alpha":1}, 
//		collidable:true,
//		width: 0.04,
//		height: 0.04,
//		normal: [0,0,-1],
//		verts:[[-0.02,0.02,0.75],[0.02,0.02,0.75],[-0.02,-0.02,0.75],[0.02,-0.02,0.75]],
//		tris: [[0,1,2],[1,3,2]]
//};
var food;
//time variables
const timeStep = 250;
var secPerLoop;
//terrain
var walls;
var floor;

// ASSIGNMENT HELPER FUNCTIONS

// note: I referenced mozilla's texture tutorials while writing imageLoad and loadTextures
// I also used their isPowerOfTwo function for efficiency sake, bitwise operations are probably faster than what I came up with  
function powOfTwo(number){
//	var inprogress = number;
//	while(Math.abs(inprogress) > 1 && inprogress%2 == 0){
//		inprogress = inprogress/2;
//	}
//	if(inprogress%2 == 0){
//		return true;
//	}else{
//		return false;
//	}
	return (number&(number - 1)) == 0;
}
//function imageLoad(texture, image){
//	gl.bindTexture(gl.TEXTURE_2D, texture);
//	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
//	if(powOfTwo(image.width) && powOfTwo(image.height)){
//		gl.generateMipmap(gl.TEXTURE_2D);
//	}else{
//		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//		gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
//	}
//}

function loadTexture(url){
	var text = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D,text);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255,0,0,255]));
	
	var image = new Image();
	//image.onload = imageLoad(text, image);
	image.onload = function(){
		gl.bindTexture(gl.TEXTURE_2D, text);
		//console.log(image);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		if(powOfTwo(image.width) && powOfTwo(image.height)){
			gl.generateMipmap(gl.TEXTURE_2D);
		}else{
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
		}
	}
	image.crossOrigin = "anonymous";
	image.src = url;
	return text;
	
	
	
}

function loadSnakes(){
	//var file = getJSONFile(INPUT_SNAKES_LOC, "snakes");
//	var file = parseJSON();
//	console.log(file);
	//pc1Snake = file[0];
	walls = {
		x:0,
		y:0,
		normals:[[0,1,0],[1,0,0],[0,-1,0],[-1,0,0]],
		visual:{ambient:[0.6,0.8,0.8],diffuse:[0.1,0.2,0.2],specular:[0.1,0.3,0.3], n:2, alpha:1},
		verts:[[0.0,0.0,0.71],[-1.2,0.0,0.71],[-1.2,-1.2,0.71],[0.0,-1.2,0.71],[0.0,0.0,-0.2],[-1.2,0.0,-0.2],[-1.2,-1.2,-0.2],[0.0,-1.2,-0.2]],
		tris:[[0,1,4],[1,4,5],[2,5,1],[2,1,6],[3,2,6],[3,6,7],[0,4,7],[3,0,7]]
	};
	floor = {
			x:0,
			y:0,
			visual:{ambient:[90/255,39/255,41/255],diffuse:[0.2,0.2,0.2],specular:[0.3,0.3,0.3], n:2, alpha:1},
			normals:[[0,0,-1]],
			verts:[[0.02,0.02,0.75],[-1.22,0.02,0.75],[-1.22,-1.22,0.75],[0.02,-1.22,0.75]],
			tris:[[0,1,2],[0,3,2]]
	};
	pcSnake = {
			x:0,
			y:0,
			prevX:0,
			prevY:0,
			nextSeg:null, 
			facing:[1,0],
	//		prevFace:[1,0],
			speed:0.05, 
			visual:{ambient: [0,0,0.2], diffuse: [0,0,0.5], specular: [0,0,0.3], n: 12, alpha:1}, 
			collidable:true,
			width: 0.04,
			height: 0.04,
			normals: [[0,0,-1],[0,1,0],[1,0,0],[0,-1,0],[-1,0,0]],
			verts: [[-0.02,0.02,0.75],[0.02,0.02,0.75],[-0.02,-0.02,0.75],[0.02,-0.02,0.75],[-0.02,0.02,0.71],[0.02,0.02,0.71],[-0.02,-0.02,0.71],[0.02,-0.02,0.71]],
			tris: [[4,5,6],[6,7,5],[0,1,4],[1,4,5],[1,3,5],[3,5,7],[2,3,6],[3,6,7],[0,2,6],[0,4,6]]
		};
	initSnake(1);
	//npcSnake = file[1];
	npcSnake = {
			x:0,
			y:0,
			prevX:0,
			prevY:0,
			nextSeg:null, 
			facing:[0,-1],
		//	prevFace:[0,-1],
			speed:0.05, 
			visual:{ambient: [0.2,0,0], diffuse: [0.5,0,0], specular: [0.3,0,0], n: 12, alpha:1}, 
			collidable:true,
			width: 0.04,
			height: 0.04,
			normals: [[0,0,-1],[0,1,0],[1,0,0],[0,-1,0],[-1,0,0]],
			verts: [[-0.02,0.02,0.75],[0.02,0.02,0.75],[-0.02,-0.02,0.75],[0.02,-0.02,0.75],[-0.02,0.02,0.71],[0.02,0.02,0.71],[-0.02,-0.02,0.71],[0.02,-0.02,0.71]],
			tris: [[4,5,6],[6,7,5],[0,1,4],[1,4,5],[1,3,5],[3,5,7],[2,3,6],[3,6,7],[0,2,6],[0,4,6]]
		};
	initSnake(0);
	//if(file[2]){
		//pc2Snake = file[2];
		pc2Snake = {
				x:0,
				y:0,
				prevX:0,
				prevY:0,
				nextSeg:null, 
				facing:[-1,0],
			//	prevFace:[-1,0],
				speed:0.05, 
				visual:{ambient: [0,0.2,0], diffuse: [0,0.5,0], specular: [0,0.3,0], n: 12, alpha:1}, 
				collidable:true,
				width: 0.04,
				height: 0.04,
				normals: [[0,0,-1],[0,1,0],[1,0,0],[0,-1,0],[-1,0,0]],
				verts: [[-0.02,0.02,0.75],[0.02,0.02,0.75],[-0.02,-0.02,0.75],[0.02,-0.02,0.75],[-0.02,0.02,0.71],[0.02,0.02,0.71],[-0.02,-0.02,0.71],[0.02,-0.02,0.71]],
				tris: [[4,5,6],[6,7,5],[0,1,4],[1,4,5],[1,3,5],[3,5,7],[2,3,6],[3,6,7],[0,2,6],[0,4,6]]
			};
		initSnake(2);
	//}
	food = {
			x:fieldWidth/2,
			y:fieldHeight/2,
			visual:{ambient: [0.2,0.2,0.2], diffuse: [0.5,0.5,0.5], specular: [0.3,0.3,0.3], n: 12, alpha:1}, 
			collidable:true,
			width: 0.05,
			height: 0.05,
			normals: [[0,0,-1],[0,1,0],[1,0,0],[0,-1,0],[-1,0,0]],
			verts:[[-0.02,0.02,0.75],[0.02,0.02,0.75],[-0.02,-0.02,0.75],[0.02,-0.02,0.75],[-0.02,0.02,0.71],[0.02,0.02,0.71],[-0.02,-0.02,0.71],[0.02,-0.02,0.71]],
			tris: [[4,5,6],[6,7,5],[0,1,4],[1,4,5],[1,3,5],[3,5,7],[2,3,6],[3,6,7],[0,2,6],[0,4,6]]
	};
	//food.x = fieldWidth/2;
	//food.y = fieldHeight/2;
}

function initSnake(snakeNum){
	//place segs behind heads
	if(snakeNum == 2){
		//clear arrays
//		p2VArray = [];
//		S2IndexArray = [];
//		p2AmbArray = [];
//		p2DiffArray = [];
//		p2SpecArray = [];
//		p2LightVecArray = [];
//		p2HArray = [];
//		//spawn/reset snake
		pc2Snake.x = pc2Spawn[0];
		pc2Snake.y = pc2Spawn[1];
		pc2Snake.prevX = pc2Snake.x;
		pc2Snake.prevY = pc2Snake.y;
		pc2Snake.facing = [-1,0];
		var seg = {
				x:pc2Snake.x - (pc2Snake.speed)*pc2Snake.facing[0],
				y:pc2Snake.y - (pc2Snake.speed)*pc2Snake.facing[1],
				prevX: pc2Snake.x - (pc2Snake.speed)*pc2Snake.facing[0],
				prevY: pc2Snake.y - (pc2Snake.speed)*pc2Snake.facing[1],
				nextSeg:null,
				prevSeg:pc2Snake, 
				facing:pc2Snake.facing,
				prevFace:pc2Snake.facing,
				spawnDelay:0,
				speed:0.05,
				collidable:false,
				width: 0.04,
				height: 0.04,
				normals: pc2Snake.normals,
				visual: pc2Snake.visual,
				verts: pc2Snake.verts,
				tris: pc2Snake.tris
		};
		pc2Snake.nextSeg = seg;
		//console.log(pc2.nextSeg.x);
		//set up arrays
		//set precedent tl,tr, bl; then tr, br, bl
		//I'll use a translation matrix to put it into its real spot on screen
		//decided to move this
//		p2VArray = p2VArray.concat([-pc2Snake.width/2,pc2Snake.height/2,PLAY_FIELD_Z]);
//		p2VArray = p2VArray.concat([pc2Snake.width/2,pc2Snake.height/2,PLAY_FIELD_Z]);
//		p2VArray = p2VArray.concat([-pc2Snake.width/2,-pc2Snake.height/2,PLAY_FIELD_Z]);
//		p2AmbArray = p2AmbArray.concat(pc2Snake.visual.ambient);
//		p2DiffArray = p2DiffArray.concat([pc2Snake.visual.diffuse[0],pc2Snake.visual.diffuse[1],pc2Snake.visual.diffuse[2],pc2Snake.visual.n]);
//		p2NormArray = p2NormArray.concat(p2Snake.normal);
//		//set up buffers
//		S2Buffer = gl.createBuffer();
//		gl.bindBuffer(gl.ARRAY_BUFFER, S2Buffer);
//		gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(S2VArray),gl.STATIC_DRAW);
//		
//		S2IBuffer = gl.createBuffer();
//		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, S2IBuffer);
//		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(), gl.STATIC_DRAW);
	}else if(snakeNum == 1){
//		S1Buffer = gl.createBuffer();
//		gl.bindBuffer(gl.ARRAY_BUFFER, S1Buffer);
//		gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(S1VArray),gl.STATIC_DRAW);
//		
//		S1IBuffer = gl.createBuffer();
//		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, S1IBuffer);
//		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(), gl.STATIC_DRAW);
		//console.log(pcSnake);
		//console.log(pcSnake.x);
		//console.log(pcSnake.y);
		//console.log(pc1Spawn);
		pcSnake.x = pc1Spawn[0];
		pcSnake.y = pc1Spawn[1];
		pcSnake.x = pc1Spawn[0];
		pcSnake.y = pc1Spawn[1];
		pcSnake.facing = [1,0];
		//console.log(pcSnake.x);
		//console.log(pcSnake.y);
		var seg = {
				x:pcSnake.x - (pcSnake.speed)*pcSnake.facing[0],
				y:pcSnake.y - (pcSnake.speed)*pcSnake.facing[1],
				prevX:pcSnake.x - (pcSnake.speed)*pcSnake.facing[0],
				prevY:pcSnake.y - (pcSnake.speed)*pcSnake.facing[1],
				nextSeg:null,
				prevSeg:pcSnake, 
				facing:pcSnake.facing,
				prevFace: pcSnake.facing,
				spawnDelay: 0,
				speed:0.05,
				collidable:false,
				normals: pcSnake.normals,
				width: 0.04,
				height: 0.04,
				visual: pcSnake.visual,
				verts: pcSnake.verts,
				tris: pcSnake.tris
		};
		//console.log(seg);
		pcSnake.nextSeg = seg;
		//console.log(pcSnake);
	}else{
		npcSnake.x = npcSpawn[0];
		npcSnake.y = npcSpawn[1];
		npcSnake.x = npcSpawn[0];
		npcSnake.y = npcSpawn[1];
		npcSnake.facing = [0,-1];
		var seg = {
				x:npcSnake.x - (npcSnake.speed)*npcSnake.facing[0],
				y:npcSnake.y - (npcSnake.speed)*npcSnake.facing[1],
				prevX:npcSnake.x - (npcSnake.speed)*npcSnake.facing[0],
				prevY:npcSnake.y - (npcSnake.speed)*npcSnake.facing[1],
				nextSeg:null,
				prevSeg:npcSnake, 
				facing:npcSnake.facing,
				prevFace: npcSnake.facing,
				spawnDelay:0,
				speed:0.05,
				collidable:false,
				normals: npcSnake.normals,
				width: 0.04,
				height: 0.04,
				visual: npcSnake.visual,
				verts: npcSnake.verts,
				tris: npcSnake.tris
		};
		npcSnake.nextSeg = seg;
	}
}

function handleInputs(event){
	switch(event.key){
		case "w":
			//2D nothing
			//3D up on current y axis
			
			break;
		case "s":
			//2D nothing
			//3D down on current y axis
			break;
		case "a":
			//2D left turn (relative)
			//3D left on current x axis
			if(pcSnake.facing[0] == 1){
				//pcSnake.prevFace = [1,0];
				pcSnake.facing = [0,-1];
			}else if(pcSnake.facing[1] == 1){
				pcSnake.facing = [1,0];
				//pcSnake.prevFace = [0,1];
			}else if(pcSnake.facing[0] == -1){
				pcSnake.facing = [0,1];
				//pcSnake.prevFace = [-1,0];
			}else if(pcSnake.facing[1] == -1){
				pcSnake.facing = [-1,0];
				//pcSnake.prevFace = [0,-1];
			}
			
			break;
		case "d":
			//2D right turn (relative)
			//3D right on current x axis
			if(pcSnake.facing[0] == 1){
				pcSnake.facing = [0,1];
			//	pcSnake.prevFace = [1,0];
			}else if(pcSnake.facing[1] == 1){
				pcSnake.facing = [-1,0];
			//	pcSnake.prevFace = [0,1];
			}else if(pcSnake.facing[0] == -1){
				pcSnake.facing = [0,-1];
			//	pcSnake.prevFace = [-1,0];
			}else if(pcSnake.facing[1] == -1){
				pcSnake.facing = [1,0];
			//	pcSnake.prevFace = [0,-1];
			}
			break;
		case "t":
			console.log("check one");
			if(!p2 && pc2Snake){
				p2 = true;
				initSnake(2);
				console.log("check two");
			}else{
				p2 = false;
				console.log("check three");
			}
			console.log("check four");
			break;
		case "i":
			//here down is dupes for p2
			//2D nothing
			//3D up on current y axis
			
			break;
		case "k":
			//2D nothing
			//3D down on current y axis
			break;
		case "j":
			//2D left turn (relative)
			//3D left on current x axis
			if (p2 && pc2Snake) {
				if (pc2Snake.facing[0] == 1) {
					pc2Snake.facing = [ 0, -1 ];
				//	pc2Snake.prevFace = [1,0];
				}else if (pc2Snake.facing[1] == 1) {
					pc2Snake.facing = [ 1, 0 ];
				//	pc2Snake.prevFace = [0,1];
				}else if (pc2Snake.facing[0] == -1) {
					pc2Snake.facing = [ 0, 1 ];
				//	pc2Snake.prevFace = [-1,0];
				}else if (pc2Snake.facing[1] == -1) {
					pc2Snake.facing = [ -1, 0 ];
				//	pc2Snake.prevFace = [0,-1];
				}
				
			}
			break;
		case "l":
			//2D right turn (relative)
			//3D right on current x axis
			if (p2 && pc2Snake) {

				if (pc2Snake.facing[0] == 1) {
					pc2Snake.facing = [ 0, 1 ];
				//	pc2Snake.prevFace = [1,0];
				}else if (pc2Snake.facing[1] == 1) {
					pc2Snake.facing = [ -1, 0 ];
				//	pc2Snake.prevFace = [0,1];
				}else if (pc2Snake.facing[0] == -1) {
					pc2Snake.facing = [ 0, -1 ];
			//		pc2Snake.prevFace = [-1,0];
				}else if (pc2Snake.facing[1] == -1) {
					pc2Snake.facing = [ 1, 0 ];
			//		pc2Snake.prevFace = [0,-1];
				}
			}
			break;
		default:
			//do nothing
	}
}

// get the JSON file from the passed URL
function getJSONFile(url,descr) {
    try {
        if ((typeof(url) !== "string") || (typeof(descr) !== "string"))
            throw "getJSONFile: parameter not a string";
        else {
            var httpReq = new XMLHttpRequest(); // a new http request
            httpReq.open("GET",url,false); // init the request
            httpReq.send(null); // send the request
            var startTime = Date.now();
            while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
                if ((Date.now()-startTime) > 3000)
                    break;
            } // until its loaded or we time out after three seconds
            if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE))
                throw "Unable to open "+descr+" file!";
            else
                return JSON.parse(httpReq.response); 
        } // end if good params
    } // end try    
    
    catch(e) {
        console.log(e);
        return(String.null);
    }
} // end get input spheres

// set up the webGL environment
function setupWebGL() {

    // Get the canvas and context
	//var canvas = document.getElementById("myImageCanvas");
    
	var glCanvas = document.getElementById("myWebGLCanvas"); // create a js canvas
	gl = glCanvas.getContext("webgl"); // get a webgl object from it
	//var context = canvas.getContext("2d");
    
    //var background = new Image();
   // background.crossOrigin = "Anonymous";
    //background.src = "https://ncsucgclass.github.io/prog4/sky.jpg";
   // background.onload = function(){
    //	var width = background.width;
    //	var height = background.height;
    //	context.drawImage(background,0,0,width,height,0,0,canvas.width,canvas.height);
   // }
    
    try {
      if (gl == null) {
        throw "unable to create gl context -- is your browser gl ready?";
      } else {
        gl.clearColor(1.0, 1.0, 1.0, 1.0); // totally transparent
        gl.clearDepth(1.0); // use max when we clear the depth buffer
        gl.enable(gl.DEPTH_TEST); // use hidden surface removal (with zbuffering)
        pc1Spawn = [1/4*fieldWidth, 1/2*fieldHeight];
        npcSpawn = [1/2*fieldWidth, 1/4*fieldHeight];
        pc2Spawn = [3/4*fieldWidth, 1/2*fieldHeight];
      }
    } // end try
    
    catch(e) {
      console.log(e);
    } // end catch
 
} // end setupWebGL

// read triangles in, load them into webgl buffers
function loadTriangles() {
    var inputTriangles = getJSONFile(INPUT_TRIANGLES_URL,"triangles");
    if (inputTriangles != String.null) { 
        var whichSetVert; // index of vertex in current triangle set
        var whichSetTri; // index of triangle in current triangle set
        var coordArray = []; // 1D array of vertex coords for WebGL
        var indexArray = [];
        var uvArray = [];
        var normArray = [];
        var hArray = [];
        var lightVecArray = [];
        var offset = vec3.create();
        var vtxCount = 0;
        var triCount = 0;
        
        for (var whichSet=0; whichSet<inputTriangles.length; whichSet++) {
            vec3.set(offset, vtxCount, vtxCount, vtxCount);
            vtxCount += inputTriangles[whichSet].vertices.length;
            // set up the vertex coord array
            var norm;
            if(inputTriangles[whichSet].normals == null){
            	var verts = inputTriangles[whichSet].vertices;
            	//console.log(verts);
            	var side1 = [verts[1][0]-verts[0][0],verts[1][1]-verts[0][1],verts[1][2]-verts[0][2]];
            	var side2 = [verts[2][0]-verts[0][0],verts[2][1] - verts[0][1], verts[2][2]-verts[0][2]];
            	//console.log(side1);
            	//console.log(side2);
            	norm = [side1[1]*side2[2] - side1[2]*side2[1],side1[2]*side2[0] - side1[0]*side2[2],side1[0]*side2[1]-side1[1]*side2[0]];
            	//console.log(norm);
            	norm = [norm[0]/Math.sqrt(norm[0]*norm[0]+norm[1]*norm[1]+norm[2]*norm[2]),norm[1]/Math.sqrt(norm[0]*norm[0]+norm[1]*norm[1]+norm[2]*norm[2]),norm[2]/Math.sqrt(norm[0]*norm[0]+norm[1]*norm[1]+norm[2]*norm[2])];
            }
            var ambArray2 = [];
            var diffArray2 = [];
            var specArray2 = [];
            var coordArray2 = [];
            var uvArray2 = [];
            var hArray2 = [];
            var lightVecArray2 = [];
            var normArray2 = [];
            for (whichSetVert=0; whichSetVert<inputTriangles[whichSet].vertices.length; whichSetVert++){
                coord = inputTriangles[whichSet].vertices[whichSetVert];
            	coordArray = coordArray.concat(coord);
            	coordArray2 = coordArray2.concat(coord);
                ambArray = ambArray.concat(inputTriangles[whichSet].material.ambient);
                ambArray2 = ambArray2.concat(inputTriangles[whichSet].material.ambient);
                //var diff = [inputTriangles[whichSet].diffuse[0],inputTriangles[whichSet].diffuse[1],inputTriangles[whichSet].diffuse[2],inputTriangles[whichSet].alpha];
                //console.log(inputTriangles[whichSet]);
                diffArray = diffArray.concat(inputTriangles[whichSet].material.diffuse);
                diffArray = diffArray.concat(inputTriangles[whichSet].material.alpha);
                diffArray2 = diffArray2.concat(inputTriangles[whichSet].material.diffuse);
                diffArray2 = diffArray2.concat(inputTriangles[whichSet].material.alpha);
                var spec = [inputTriangles[whichSet].material.specular[0],inputTriangles[whichSet].material.specular[1],inputTriangles[whichSet].material.specular[2],inputTriangles[whichSet].material.n];
                specArray = specArray.concat(spec);
                specArray2 = specArray2.concat(spec);
                // console.log(inputTriangles[whichSet].vertices[whichSetVert]);
                var uv = inputTriangles[whichSet].uvs[whichSetVert];
                uvArray = uvArray.concat(uv);
                uvArray2 = uvArray2.concat(uv);
                var toLight = [light.x - inputTriangles[whichSet].vertices[whichSetVert][0], light.y - inputTriangles[whichSet].vertices[whichSetVert][1], light.z - inputTriangles[whichSet].vertices[whichSetVert][2]];
                var hAdd = [Eye[0] - inputTriangles[whichSet].vertices[whichSetVert][0], Eye[1] - inputTriangles[whichSet].vertices[whichSetVert][1], Eye[2] - inputTriangles[whichSet].vertices[whichSetVert][2]];
                hAdd = [hAdd[0] + toLight[0], hAdd[1] + toLight[1], hAdd[2] + toLight[2]];
                hAdd = [hAdd[0]/(Math.sqrt(hAdd[0] * hAdd[0] + hAdd[1] * hAdd[1] + hAdd[2] * hAdd[2])),hAdd[1]/(Math.sqrt(hAdd[0] * hAdd[0] + hAdd[1] * hAdd[1] + hAdd[2] * hAdd[2])),hAdd[2]/(Math.sqrt(hAdd[0] * hAdd[0] + hAdd[1] * hAdd[1] + hAdd[2] * hAdd[2]))];
                hArray = hArray.concat(hAdd);
                hArray2 = hArray.concat(hAdd);
                lightVecArray = lightVecArray.concat(toLight);
                lightVecArray2 = lightVecArray2.concat(toLight);
                if(inputTriangles[whichSet].normals != null){
                	norm = inputTriangles[whichSet].normals[whichSetVert];
                }
                normArray = normArray.concat(norm);
            	normArray2 = normArray2.concat(norm);
                
            }
            var indexA2 = [];
            var setTriCount = 0;
            for(whichTri = 0; whichTri < inputTriangles[whichSet].triangles.length; whichTri++){
            	triCount++;
            	setTriCount++;
            	var toAdd = [inputTriangles[whichSet].triangles[whichTri][0] + offset[0], inputTriangles[whichSet].triangles[whichTri][1] + offset[1], inputTriangles[whichSet].triangles[whichTri][2] + offset[2]];
            	var toAdd2 = [inputTriangles[whichSet].triangles[whichTri][0], inputTriangles[whichSet].triangles[whichTri][1], inputTriangles[whichSet].triangles[whichTri][2]];
            	indexArray = indexArray.concat(toAdd);
            	indexA2 = indexA2.concat(toAdd2);
            }
            if (inputTriangles[whichSet].material.texture != null) {
				var texString = "https://ncsucgclass.github.io/prog4/"
						+ inputTriangles[whichSet].material.texture;
				tex = loadTexture(texString);
				texArray = texArray.concat(tex);
			}else{
				texArray = texArray.concat(null);
			}
			vertexBuffer = gl.createBuffer(); // init empty vertex coord buffer
            gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer); // activate that buffer
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(coordArray2),gl.STATIC_DRAW); // coords to that buffer
            
            ambBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, ambBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ambArray2), gl.STATIC_DRAW);
            
            diffBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, diffBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(diffArray2), gl.STATIC_DRAW);
            
            specBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, specBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(specArray2), gl.STATIC_DRAW);
            
            uvBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvArray2), gl.STATIC_DRAW);
            
            //console.log(hArray);
            hBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, hBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hArray2),gl.STATIC_DRAW);
            
            //console.log(normArray);
            normBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normArray2),gl.STATIC_DRAW);
            
            //console.log(lightVecArray);
            lightBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, lightBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(lightVecArray2), gl.STATIC_DRAW);
            
            triangleBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexA2),gl.STATIC_DRAW);
            
            if((1.0 - inputTriangles[whichSet].material.alpha) <= 0.0001){
            	opaqueCount = opaqueCount.concat(setTriCount);
            	opaqueAmbBufArray = opaqueAmbBufArray.concat(ambBuffer);
            	opaqueDiffBufArray = opaqueDiffBufArray.concat(diffBuffer);
            	opaqueSpecBufArray = opaqueSpecBufArray.concat(specBuffer);
            	opaqueTexArray = opaqueTexArray.concat(tex);
            	opaqueBufArray = opaqueBufArray.concat(vertexBuffer);
            	opaquehBufArray = opaquehBufArray.concat(hBuffer);
            	//console.log(normBuffer);
            	//console.log(normArray);
            	opaqueNormBufArray = opaqueNormBufArray.concat(normBuffer);
            	opaqueUvBufArray = opaqueUvBufArray.concat(uvBuffer);
            	opaqueLightBufArray = opaqueLightBufArray.concat(lightBuffer);
            	opaqueTriBufArray = opaqueTriBufArray.concat(triangleBuffer);
            }else{
            	notCount = notCount.concat(setTriCount);
            	//console.log(ambBuffer);
            	notAmbBufArray = notAmbBufArray.concat(ambBuffer);
            	//console.log(diffBuffer);
            	notDiffBufArray = notDiffBufArray.concat(diffBuffer);
            	//console.log(specBuffer);
            	//console.log(spec);
            	notSpecBufArray = notSpecBufArray.concat(specBuffer);
            	notTexArray = notTexArray.concat(tex);
            	notBufArray = notBufArray.concat(vertexBuffer);
            	nothBufArray = nothBufArray.concat(hBuffer);
            	notNormBufArray = notNormBufArray.concat(normBuffer);
            	notUvBufArray = notUvBufArray.concat(uvBuffer);
            	notLightBufArray = notLightBufArray.concat(lightBuffer);
            	notTriBufArray = notTriBufArray.concat(triangleBuffer);
            }
        } // end for each triangle set 
        // console.log(coordArray.length);
        // send the vertex coords to webGL
        triBufferSize = 3 * triCount;
        vertexBuffer = gl.createBuffer(); // init empty vertex coord buffer
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer); // activate that buffer
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(coordArray),gl.STATIC_DRAW); // coords to that buffer
        
        ambBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, ambBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ambArray), gl.STATIC_DRAW);
        
        diffBuffer = gl.createBuffer();
        gl.bindBuf
        fer(gl.ARRAY_BUFFER, diffBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(diffArray), gl.STATIC_DRAW);
        
        specBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, specBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(specArray), gl.STATIC_DRAW);
        //.log(uvArray);
        uvBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvArray), gl.STATIC_DRAW);
        
        //console.log(hArray);
        hBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, hBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hArray),gl.STATIC_DRAW);
        
        //console.log(normArray);
        normBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normArray),gl.STATIC_DRAW);
        
        //console.log(lightVecArray);
        lightBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, lightBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(lightVecArray), gl.STATIC_DRAW);
        
//        texBuffer = gl.createBuffer();
//        gl.TexBuffer(gl.TEXTURE_BUFFER, gl.RGBA, texBuffer);
//        gl.bufferData(gl.TEXTURE_BUFFER, texArray,gl.STATIC_DRAW);
        
        triangleBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray),gl.STATIC_DRAW);
    } // end if triangles found
} // end load triangles

// setup the webGL shaders
function setupShaders() {
    
    // define fragment shader in essl using es6 template strings
    var fShaderCode = `
        varying lowp vec3 ambient;
    	varying lowp vec4 diffuse;
    	varying lowp vec4 specular;
    	varying lowp vec3 vnorm;
    	varying lowp vec3 vh;
    	varying lowp vec3 vlightVec;
    	varying highp vec2 texUV;
    	uniform sampler2D sampler;
    	uniform lowp vec3 lightAmbVal;
    	uniform lowp vec3 lightDiffVal;
    	uniform lowp vec3 lightSpecVal;
    	uniform bool mod;
    	uniform bool col;
    	uniform bool trans;
    	
    	void main(void) {
    			gl_FragColor = vec4(ambient.r*lightAmbVal.r + diffuse.r*lightDiffVal.r*dot(vnorm,vlightVec)+ specular.r*lightSpecVal.r*pow(dot(vnorm,vh),specular.w),
    					ambient.g*lightAmbVal.g + diffuse.g*lightDiffVal.g*dot(vnorm,vlightVec)+ specular.g*lightSpecVal.g*pow(dot(vnorm,vh),specular.w),
    					ambient.b*lightAmbVal.b + diffuse.b*lightDiffVal.b*dot(vnorm,vlightVec)+ specular.b*lightSpecVal.b*pow(dot(vnorm,vh),specular.w),diffuse.a);   		
        }
    `;
    //ambient.r*lightAmbVal.r +
    // + diffuse.r*lightDiffVal.r*dot(vnorm,vlightVec),
    //+ specular.b*lightSpecVal.b*pow(dot(vnorm,vh),specular.w)
    //vec4 color = vec4(ambient.r*lightAmbVal.r + diffuse.r*lightDiffVal.r*dot(norm,lightVec)+ specular.r*lightSpecVal.r*pow(dot(norm,h),specular.w),
	//ambient.g*lightAmbVal.g + diffuse.g*lightDiffVal.g*dot(norm,lightVec)+ specular.g*lightSpecVal.g*pow(dot(norm,h),specular.w),
	//ambient.b*lightAmbVal.b + diffuse.b*lightDiffVal.b*dot(norm,lightVec)+ specular.b*lightSpecVal.b*pow(dot(norm,h),specular.w),1);
    //vec4(1.0, 1.0, 1.0, 1.0)
    //texture2D(sampler,texUV)
    // define vertex shader in essl using es6 template strings
    var vShaderCode = `
        attribute vec3 vertexPosition;
    	attribute vec3 ambientAttrib;
    	attribute vec4 diffAttrib;
    	attribute vec4 specAttrib;
    	attribute vec2 uVCoord;
    	attribute vec3 norm;
    	attribute vec3 h;
    	attribute vec3 lightVec;
    	uniform mat4 perspecMatrix;
    	uniform mat4 lookAtMatrix;
    	uniform mat4 translateMatrix;
    	
    	varying lowp vec3 ambient;
    	varying lowp vec4 diffuse;
    	varying lowp vec4 specular;
    	varying lowp vec3 vnorm;
    	varying lowp vec3 vh;
    	varying lowp vec3 vlightVec;
    	varying highp vec2 texUV; 
    	
        void main(void) {
            ambient = ambientAttrib;
            diffuse = diffAttrib;
            specular = specAttrib;
            vh = h;
            vnorm = norm;
            vlightVec = lightVec;
            texUV = uVCoord;
        	gl_Position = perspecMatrix*lookAtMatrix*translateMatrix*vec4(vertexPosition, 1.0); // use the untransformed position
        }
    `;
    //perspecMatrix*lookAtMatrix*translateMatrix
    try {
        // console.log("fragment shader: "+fShaderCode);
        var fShader = gl.createShader(gl.FRAGMENT_SHADER); // create frag shader
        gl.shaderSource(fShader,fShaderCode); // attach code to shader
        gl.compileShader(fShader); // compile the code for gpu execution

        // console.log("vertex shader: "+vShaderCode);
        var vShader = gl.createShader(gl.VERTEX_SHADER); // create vertex shader
        gl.shaderSource(vShader,vShaderCode); // attach code to shader
        gl.compileShader(vShader); // compile the code for gpu execution
            
        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) { // bad frag shader compile
            throw "error during fragment shader compile: " + gl.getShaderInfoLog(fShader);  
            gl.deleteShader(fShader);
        } else if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) { // bad vertex shader compile
            throw "error during vertex shader compile: " + gl.getShaderInfoLog(vShader);  
            gl.deleteShader(vShader);
        } else { // no compile errors
            var shaderProgram = gl.createProgram(); // create the single shader program
            gl.attachShader(shaderProgram, fShader); // put frag shader in program
            gl.attachShader(shaderProgram, vShader); // put vertex shader in program
            gl.linkProgram(shaderProgram); // link program into gl context

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { // bad program link
                throw "error during shader program linking: " + gl.getProgramInfoLog(shaderProgram);
            } else { // no shader program link errors
                gl.useProgram(shaderProgram); // activate shader program (frag and vert)
                vertexPositionAttrib = // get pointer to vertex shader input
                    gl.getAttribLocation(shaderProgram, "vertexPosition"); 
                gl.enableVertexAttribArray(vertexPositionAttrib); // input to shader from array
                
                ambAttrib = gl.getAttribLocation(shaderProgram, "ambientAttrib");
                gl.enableVertexAttribArray(ambAttrib);
                
                diffAttrib = gl.getAttribLocation(shaderProgram, "diffAttrib");
                gl.enableVertexAttribArray(diffAttrib);
                
                specAttrib = gl.getAttribLocation(shaderProgram, "specAttrib");
                gl.enableVertexAttribArray(specAttrib);
                
//                uvAttrib = gl.getAttribLocation(shaderProgram, "uVCoord");
//                gl.enableVertexAttribArray(uvAttrib);
                
                normAttrib = gl.getAttribLocation(shaderProgram, "norm");
                gl.enableVertexAttribArray(normAttrib);
                
                hAttrib = gl.getAttribLocation(shaderProgram, "h");
                gl.enableVertexAttribArray(hAttrib);
                
                lightVecAttrib = gl.getAttribLocation(shaderProgram, "lightVec");
                gl.enableVertexAttribArray(lightVecAttrib);
                
                lightAmbVar = gl.getUniformLocation(shaderProgram, "lightAmbVal");
                lightDiffVar = gl.getUniformLocation(shaderProgram, "lightDiffVal");
                lightSpecVar = gl.getUniformLocation(shaderProgram, "lightSpecVal");
                perspecVar = gl.getUniformLocation(shaderProgram, "perspecMatrix");
                lookAtVar = gl.getUniformLocation(shaderProgram, "lookAtMatrix");
                transVar = gl.getUniformLocation(shaderProgram, "translateMatrix");
                texSamplerVar = gl.getUniformLocation(shaderProgram, "sampler");
                modLoc = gl.getUniformLocation(shaderProgram, "mod");
                colLoc = gl.getUniformLocation(shaderProgram, "col");
                transLoc  = gl.getUniformLocation(shaderProgram, "trans");
            } // end if no shader program link errors
        } // end if no compile errors
    } // end try 
    
    catch(e) {
        console.log(e);
    } // end catch
} // end setup shaders

// render the loaded model
//idea: send in buffer for each triangle
//array of buffers 1 for each triangle
//handle no texture case
//gl.depthMask(false) here if doing it by triangle like above
function renderTriangles( i, transparent) {
    
    //requestAnimationFrame(renderTriangles);
    // vertex buffer: activate and feed into vertex shader
    var lightAmb = vec3.fromValues(light.ambient[0],light.ambient[1],light.ambient[2]);
    var lightDiff = vec3.fromValues(light.diffuse[0],light.diffuse[1],light.diffuse[2]);
    var lightSpec = vec3.fromValues(light.specular[0],light.specular[1],light.specular[2]);
    gl.uniform3fv(lightAmbVar, lightAmb);
    gl.uniform3fv(lightDiffVar, lightDiff);
    gl.uniform3fv(lightSpecVar, lightSpec);
    
    mat4.perspective(perspecMatrix, Math.PI/2,1,0.1,10);
    mat4.lookAt(lookAtMatrix, vec3.fromValues(Eye[0],Eye[1],Eye[2]), Center, Up);
    gl.uniformMatrix4fv(perspecVar, false, perspecMatrix);
    gl.uniformMatrix4fv(lookAtVar, false, lookAtMatrix);
    
    gl.uniform1i(modLoc, mod);
    gl.uniform1i(colLoc, col);
    gl.uniform1i(transLoc, trans);
    
    var tex = 0;
//    if(transparent){
//    	console.log(i);
//    }
    
    if(transparent){
    	gl.depthMask(false);
    	//gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer); // activate
        gl.bindBuffer(gl.ARRAY_BUFFER,notBufArray[i]);
        gl.vertexAttribPointer(vertexPositionAttrib,3,gl.FLOAT,false,0,0); // feed

        gl.bindBuffer(gl.ARRAY_BUFFER, notAmbBufArray[i]);
        gl.vertexAttribPointer(ambAttrib,3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, notDiffBufArray[i]);
        gl.vertexAttribPointer(diffAttrib,4,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, notSpecBufArray[i]);
        gl.vertexAttribPointer(specAttrib,4,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, notUvBufArray[i]);
        gl.vertexAttribPointer(uvAttrib, 2, gl.FLOAT, false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, notNormBufArray[i]);
        gl.vertexAttribPointer(normAttrib,3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, nothBufArray[i]);
        gl.vertexAttribPointer(hAttrib, 3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, notLightBufArray[i]);
        gl.vertexAttribPointer(lightVecAttrib, 3,gl.FLOAT,false,0,0);
        
        if (notTexArray[i] != null) {
           tex += opaqueTexArray.length;
		   gl.activeTexture(gl.TEXTURE0 + i + tex);
	       //console.log(texArray);
           gl.bindTexture(gl.TEXTURE_2D, notTexArray[i]);
           gl.uniform1i(texSamplerVar,i + tex);
		}
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, notTriBufArray[i]);
        gl.drawElements(gl.TRIANGLES,3*notCount[i],gl.UNSIGNED_SHORT, 0);
    }else{
    	gl.depthMask(true);
    	//gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer); // activate
        gl.bindBuffer(gl.ARRAY_BUFFER,opaqueBufArray[i]);
        gl.vertexAttribPointer(vertexPositionAttrib,3,gl.FLOAT,false,0,0); // feed

        gl.bindBuffer(gl.ARRAY_BUFFER, opaqueAmbBufArray[i]);
        gl.vertexAttribPointer(ambAttrib,3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, opaqueDiffBufArray[i]);
        gl.vertexAttribPointer(diffAttrib,4,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, opaqueSpecBufArray[i]);
        gl.vertexAttribPointer(specAttrib,4,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, opaqueUvBufArray[i]);
        gl.vertexAttribPointer(uvAttrib, 2, gl.FLOAT, false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, opaqueNormBufArray[i]);
        gl.vertexAttribPointer(normAttrib,3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, opaquehBufArray[i]);
        gl.vertexAttribPointer(hAttrib, 3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, opaqueLightBufArray[i]);
        gl.vertexAttribPointer(lightVecAttrib, 3,gl.FLOAT,false,0,0);
        
        if (opaqueTexArray[i] != null) {
		  gl.activeTexture(gl.TEXTURE0 + i);
	      //console.log(texArray);
          gl.bindTexture(gl.TEXTURE_2D, opaqueTexArray[i]);
          gl.uniform1i(texSamplerVar,i);
		}
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, opaqueTriBufArray[i]);
        gl.drawElements(gl.TRIANGLES,3*opaqueCount[i],gl.UNSIGNED_SHORT, 0);
    }
    //gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer); // activate
//    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
//    gl.vertexAttribPointer(vertexPositionAttrib,3,gl.FLOAT,false,0,0); // feed
//
//    gl.bindBuffer(gl.ARRAY_BUFFER, ambBuffer);
//    gl.vertexAttribPointer(ambAttrib,3,gl.FLOAT,false,0,0);
//    
//    gl.bindBuffer(gl.ARRAY_BUFFER, diffBuffer);
//    gl.vertexAttribPointer(diffAttrib,4,gl.FLOAT,false,0,0);
//    
//    gl.bindBuffer(gl.ARRAY_BUFFER, specBuffer);
//    gl.vertexAttribPointer(specAttrib,4,gl.FLOAT,false,0,0);
//    
//    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
//    gl.vertexAttribPointer(uvAttrib, 2, gl.FLOAT, false,0,0);
//    
//    gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
//    gl.vertexAttribPointer(normAttrib,3,gl.FLOAT,false,0,0);
//    
//    gl.bindBuffer(gl.ARRAY_BUFFER, hBuffer);
//    gl.vertexAttribPointer(hAttrib, 3,gl.FLOAT,false,0,0);
//    
//    gl.bindBuffer(gl.ARRAY_BUFFER, lightBuffer);
//    gl.vertexAttribPointer(lightVecAttrib, 3,gl.FLOAT,false,0,0);
    
    //gl.activeTexture(gl.TEXTURE1);
    //gl.bindTexture
    //gl.uniform1i(texSamplerVar,0);
    
    
    
//    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
//    gl.drawElements(gl.TRIANGLES,triBufferSize,gl.UNSIGNED_SHORT, 0);
} // end render triangles

function move(snake){
	
	var currentSeg = snake;
	while(currentSeg != null){
		
		if (!currentSeg.spawnDelay || currentSeg.spawnDelay <= 0) {
				currentSeg.x = currentSeg.x + currentSeg.facing[0]*currentSeg.speed;
				currentSeg.y = currentSeg.y + currentSeg.facing[1]*currentSeg.speed;
				if(currentSeg.prevSeg != null){
					currentSeg.prevFace = currentSeg.facing;
					if(currentSeg.prevSeg.prevFace){
						currentSeg.facing = currentSeg.prevSeg.prevFace;
					}else{
						currentSeg.facing = currentSeg.prevSeg.facing;
					}
				}
				if(!currentSeg.collidable){
					currentSeg.collidable = true;
				}
		}else{
			currentSeg.spawnDelay = currentSeg.spawnDelay - secPerLoop/secPerLoop;
		}
//		if(currentSeg.prevSeg){
//			currentSeg.prevX = currentSeg.x;
//			currentSeg.prevY = currentSeg.y;
//			currentSeg.x = currentSeg.prevSeg.prevX;
//			currentSeg.y = currentSeg.prevSeg.prevX;
//		}else{
//			currentSeg.prevX = currentSeg.x;
//			currentSeg.prevY = currentSeg.y;
//			currentSeg.x = currentSeg.x + currentSeg.facing[0]*currentSeg.speed*secPerLoop;
//			currentSeg.y = currentSeg.y + currentSeg.facing[1]*currentSeg.speed*secPerLoop;
//		}
//		if(!currentSeg.collidable){
//			currentSeg.collidable = true;
//		}
		currentSeg = currentSeg.nextSeg;
	}
}

function eat(snake, food){
	var newSeg = {x:snake.x,y:snake.y,prevX:snake.x,prevY:snake.y,nextSeg:snake.nextSeg,prevSeg:snake,facing:[0,0],prevFace:[0,0],spawnDelay:0,width:snake.width, height:snake.height, speed:snake.speed,visual:snake.visual,normals:snake.normals, collidable:false, verts:snake.verts, tris:snake.tris};
	snake.nextSeg.prevSeg = newSeg;
	snake.nextSeg = newSeg;
//	var playWidth = gl.width;
//	var playHeight = height;
	food.x = fieldWidth*Math.random();
	food.y = fieldHeight*Math.random();
}

function collide(obj1, obj2){
	if (obj1.collidable && obj2.collidable) {
			//probably need to account for object sizes
		// maybe set = or increase check size by 0.01
		if(obj1.x+obj1.width/2 > obj2.x - obj2.width/2 && obj1.x+obj1.width/2 < obj2.x+obj2.width/2 && obj1.y+obj1.height/2 > obj2.y-obj2.height/2 && obj1.y+obj1.height/2 < obj2.y+obj2.height/2){
			//top right corner check
//			console.log("collision");
//			console.log(obj1);
//			console.log(obj2);
			return true;
		}else if(obj1.x-obj1.width/2 > obj2.x + obj2.width/2 && obj1.x-obj1.width/2 < obj2.x-obj2.width/2 && obj1.y+obj1.height/2 > obj2.y-obj2.height/2 && obj1.y+obj1.height/2 < obj2.y+obj2.height/2){
			//top left corner check
//			console.log("collision");
//			console.log(obj1);
//			console.log(obj2);
			return true;
		}else if(obj1.x+obj1.width/2 > obj2.x - obj2.width/2 && obj1.x+obj1.width/2 < obj2.x+obj2.width/2 && obj1.y-obj1.height/2 > obj2.y-obj2.height/2 && obj1.y-obj1.height/2 < obj2.y+obj2.height/2){
			//bottom right corner check
//			console.log("collision");
//			console.log(obj1);
//			console.log(obj2);
			return true;
		}else if(obj1.x-obj1.width/2 > obj2.x - obj2.width/2 && obj1.x-obj1.width/2 < obj2.x+obj2.width/2 && obj1.y-obj1.height/2 > obj2.y-obj2.height/2 && obj1.y-obj1.height/2 < obj2.y+obj2.height/2){
			//bottom left corner check
//			console.log("collision");
//			console.log(obj1);
//			console.log(obj2);
			return true;
		}else if(Math.abs(obj1.x-obj2.x )< 0.001 && Math.abs(obj1.y-obj2.y) < 0.001){
			return true;
		}else{
			return false;
		}
		//return obj1.collidable && obj2.collidable && obj1.x == obj2.x && obj1.y == obj2.y
	}else{
		return false;
	}
}

function renderSnake(id, snake){
	//console.log(snake);
	if(snake){
		p2VArray = [];
		S2IndexArray = [];
		p2AmbArray = [];
		p2DiffArray = [];
		p2SpecArray = [];
		p2LightVecArray = [];
		p2HArray = [];
		p2NormArray = [];
		for(var i = 0; i < snake.verts.length; i++){
			var vert = snake.verts[i];
			p2VArray = p2VArray.concat([vert[0],vert[1],vert[2]]);
			p2AmbArray = p2AmbArray.concat(snake.visual.ambient);
			p2DiffArray = p2DiffArray.concat([snake.visual.diffuse[0],snake.visual.diffuse[1],snake.visual.diffuse[2],snake.visual.alpha]);
			p2SpecArray = p2SpecArray.concat([snake.visual.specular[0],snake.visual.specular[1],snake.visual.specular[2],snake.visual.n]);
			///console.log(snake.normal);
			
//			var side1 = [snake.verts[snake.tris[i][1]][0]-snake.verts[snake.tris[i][0]][0],snake.verts[snake.tris[i][1]][1]-snake.verts[snake.tris[i][0]][1],snake.verts[snake.tris[i][1]][2]-snake.verts[snake.tris[i][0]][2]];
//        	var side2 = [snake.verts[snake.tris[i][2]][0]-snake.verts[snake.tris[i][0]][0],snake.verts[snake.tris[i][2]][1]-snake.verts[snake.tris[i][0]][1],snake.verts[snake.tris[i][2]][2]-snake.verts[snake.tris[i][0]][2]];
//        	//console.log(side1);
//        	//console.log(side2);
//        	norm = [side1[1]*side2[2] - side1[2]*side2[1],side1[2]*side2[0] - side1[0]*side2[2],side1[0]*side2[1]-side1[1]*side2[0]];
//        	//console.log(norm);
//        	norm = [norm[0]/Math.sqrt(norm[0]*norm[0]+norm[1]*norm[1]+norm[2]*norm[2]),norm[1]/Math.sqrt(norm[0]*norm[0]+norm[1]*norm[1]+norm[2]*norm[2]),norm[2]/Math.sqrt(norm[0]*norm[0]+norm[1]*norm[1]+norm[2]*norm[2])];
//        	p2NormArray = p2NormArray.concat(norm);
        	
        	//p2NormArray = p2NormArray.concat(snake.normal);
			var toLight = [light.x - vert[0], light.y - vert[1], light.z - vert[2]];
            var hAdd = [Eye[0] - vert[0], Eye[1] - vert[1], Eye[2] - vert[2]];
            hAdd = [hAdd[0] + toLight[0], hAdd[1] + toLight[1], hAdd[2] + toLight[2]];
            hAdd = [hAdd[0]/(Math.sqrt(hAdd[0] * hAdd[0] + hAdd[1] * hAdd[1] + hAdd[2] * hAdd[2])),hAdd[1]/(Math.sqrt(hAdd[0] * hAdd[0] + hAdd[1] * hAdd[1] + hAdd[2] * hAdd[2])),hAdd[2]/(Math.sqrt(hAdd[0] * hAdd[0] + hAdd[1] * hAdd[1] + hAdd[2] * hAdd[2]))];
            p2HArray = p2HArray.concat(hAdd);
            p2LightVecArray = p2LightVecArray.concat(toLight);
		}
		//console.log("break");
		for(var i = 0; i < snake.tris.length; i++){
			S2IndexArray = S2IndexArray.concat(snake.tris[i]);
			
		}
		//console.log();
		for (var i = 0; i < snake.tris.length/2;i++){
			//console.log(snake.normals[i]);
			var norm = snake.normals[i];
			p2NormArray = p2NormArray.concat(norm);
			p2NormArray = p2NormArray.concat(norm);
			p2NormArray = p2NormArray.concat(norm);
			p2NormArray = p2NormArray.concat(norm);
		}
		var idxCnt = 3*snake.tris.length;
		 // init empty vertex coord buffer
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer); // activate that buffer
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(p2VArray),gl.STATIC_DRAW); // coords to that buffer
        //console.log(p2VArray);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, ambBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2AmbArray), gl.STATIC_DRAW);
        //console.log(p2AmbArray);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, diffBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2DiffArray), gl.STATIC_DRAW);
        //console.log(p2DiffArray);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, specBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2SpecArray), gl.STATIC_DRAW);
        //.log(uvArray);
//        uvBuffer = gl.createBuffer();
//        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
//        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvArray), gl.STATIC_DRAW);
        
        //console.log(hArray);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, hBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2HArray),gl.STATIC_DRAW);
        
        //console.log(normArray);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2NormArray),gl.STATIC_DRAW);
        
        //console.log(lightVecArray);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, lightBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(p2LightVecArray), gl.STATIC_DRAW);
        //console.log(p2LightVecArray);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(S2IndexArray),gl.STATIC_DRAW);		
		
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.vertexAttribPointer(vertexPositionAttrib,3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, ambBuffer);
        gl.vertexAttribPointer(ambAttrib,3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, diffBuffer);
        gl.vertexAttribPointer(diffAttrib,4,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, specBuffer);
        gl.vertexAttribPointer(specAttrib,4,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
        gl.vertexAttribPointer(normAttrib,3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, hBuffer);
        gl.vertexAttribPointer(hAttrib,3,gl.FLOAT,false,0,0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, lightBuffer);
        gl.vertexAttribPointer(lightVecAttrib,3,gl.FLOAT,false,0,0);
//        if(id == 1){
//        	console.log(p2NormArray);
//        }
        var lightAmb = vec3.fromValues(light.ambient[0],light.ambient[1],light.ambient[2]);
        var lightDiff = vec3.fromValues(light.diffuse[0],light.diffuse[1],light.diffuse[2]);
        var lightSpec = vec3.fromValues(light.specular[0],light.specular[1],light.specular[2]);
        gl.uniform3fv(lightAmbVar, lightAmb);
        gl.uniform3fv(lightDiffVar, lightDiff);
        gl.uniform3fv(lightSpecVar, lightSpec);
        
        mat4.perspective(perspecMatrix, Math.PI/2,1,0.1,10);
        mat4.lookAt(lookAtMatrix, vec3.fromValues(Eye[0],Eye[1],Eye[2]), Center, Up);
        mat4.translate(transMatrix, mat4.create(), vec3.fromValues(-snake.x,-snake.y,0));
        //console.log(snake);
        //console.log(transMatrix);
        gl.uniformMatrix4fv(perspecVar, false, perspecMatrix);
        gl.uniformMatrix4fv(lookAtVar, false, lookAtMatrix);
        gl.uniformMatrix4fv(transVar, false, transMatrix);
        //console.log(S2IndexArray);
        //console.log(idxCnt);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
        gl.drawElements(gl.TRIANGLES,idxCnt,gl.UNSIGNED_SHORT, 0);
		renderSnake(id, snake.nextSeg);
	}
}

function cpuFace(snake){
	var rando = Math.random();
	if(rando < 0.5){
		//left turn
		if (snake.facing[0] == 1) {
			snake.facing = [ 0, 1 ];
			//snake.prevFace = [1,0];
		}else if (snake.facing[1] == 1) {
			snake.facing = [ -1, 0 ];
			//snake.prevFace = [0,1];
		}else if (snake.facing[0] == -1) {
			snake.facing = [ 0, -1 ];
			//snake.prevFace = [-1,0];
		}else if (snake.facing[1] == -1) {
			snake.facing = [ 1, 0 ];
			//snake.prevFace = [0,-1];
		}
	}else{
		//right turn
		if (snake.facing[0] == 1) {
			snake.facing = [ 0, -1 ];
			//snake.prevFace = [1,0];
		}else if (snake.facing[1] == 1) {
			snake.facing = [ 1, 0 ];
			//snake.prevFace = [0,1];
		}else if (snake.facing[0] == -1) {
			snake.facing = [ 0, 1 ];
			//snake.prevFace = [-1,0];
		}else if (snake.facing[1] == -1) {
			snake.facing = [ -1, 0 ];
			//snake.prevFace = [0,-1];
		}
	}
}

function outOfBound(snake){
	if(snake.x + snake.width/2 < 0){
		return true;
	}else if(snake.x - snake.width/2 > fieldWidth){
		return true;
	}else if(snake.y+snake.height/2 < 0){
		return true;
	}else if(snake.y-snake.height/2 > fieldHeight){
		return true;
	}else{
		return false;
	}
	
}

function gameLoop(){
	//console.log(food);
	//console.log(pcSnake);
	move(pcSnake);
	if(p2 && pc2Snake){
		move(pc2Snake);
	}
	move(npcSnake);
	if(outOfBound(pcSnake)){
		console.log("p1 out");
		initSnake(1);
	}
	if(outOfBound(npcSnake)){
		console.log("npc out");
		initSnake(0);
	}
	if(p2 && outOfBound(pc2Snake)){
		console.log("p2 out");
		initSnake(2);
	}
	
	if(collide(npcSnake, food)){
		console.log("om");
		eat(npcSnake, food);
	}
	if(collide(pcSnake, food)){
		console.log("nom");
		eat(pcSnake, food);
	}
	if(p2 && collide(pc2Snake, food)){
		console.log("chomp");
		eat(pc2Snake, food);
	}
	var current = npcSnake;
	var first = true;
	while(current){
		if(collide(pcSnake,current)){
			initSnake(1);
			if(first){
				initSnake(0);
			}
		}
		if(p2 && collide(pc2Snake,current)){
			//ditto
			initSnake(2);
			if(first){
				initSnake(0);
			}
		}
		if(collide(npcSnake,current)){
			//also ditto
			if(!first){
				console.log("self crash");
				initSnake(0);
			}
			
		}
		if(first){
			first = false;
		}
		current = current.nextSeg;
	}
	current = pcSnake;
	first = true;
	while(current){
		if(collide(pcSnake,current)){
			//initSnake(pcSnake);
			if(!first){
				initSnake(1);
			}
		}
		if(p2 && collide(pc2Snake,current)){
			//ditto
			//console.log("p1 v p2");
			initSnake(2);
			if(first){
				initSnake(1);
			}
		}
		if(collide(npcSnake,current)){
			//also ditto
			//console.log("crash p1");
			initSnake(0);
			if(first){
				initSnake(1);
			}
			
		}
		if(first){
			first = false;
		}
		current = current.nextSeg;
	}
	if (p2) {
			//console.log("p2 cycle");
			current = pc2Snake;
			first = true;
			while(current){
				if(collide(pcSnake,current)){
					initSnake(1);
					if(first){
						initSnake(2);
					}
				}
				if(p2 && collide(pc2Snake,current)){
					//ditto
					//initSnake(pc2Snake);
					if(!first){
						initSnake(2);
					}
				}
				if(collide(npcSnake,current)){
					//also ditto
					initSnake(0);
					if(first){
						initSnake(2);
					}
			
				}
				if(first){
					first = false;
				}
				current = current.nextSeg;
			}			
	}
	
	if(npcTimer == 0){
		npcTimer = Math.ceil(5*Math.random());
		cpuFace(npcSnake);
	}else{
		npcTimer--;
	}
	
}

function animate(){
	
	//console.log(notBufArray);
	//console.log(opaqueBufArray);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // clear frame/depth buffers
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LESS);
//	for(var i = 0; i < opaqueBufArray.length; i++){
//		renderTriangles(i,false); // draw the triangles using webGL  
//	}
//	for(var i = 0; i < notBufArray.length; i++){
//		gl.enable(gl.BLEND);
//		renderTriangles(i,true); // draw the triangles using webGL
//		gl.disable(gl.BLEND);
//	}
	//console.log(floor);
	renderSnake(-2,floor);
	renderSnake(-3,walls);
	renderSnake(1,pcSnake);
	renderSnake(0,npcSnake);
	if(p2){
		//console.log(pc2Snake);
		renderSnake(2,pc2Snake);
	}
	//console.log(food);
	renderSnake(-1,food);
	gl.disable(gl.DEPTH_TEST);
	requestAnimationFrame(animate);
}
/* MAIN -- HERE is where execution begins after window load */

function main() {
  document.onkeydown = handleInputs;
  setupWebGL(); // set up the webGL environment
  //loadTriangles(); // load in the triangles from tri file
  //loadTextures();
  //Eye
  secPerLoop = timeStep/1000;
  loadSnakes();
//  initSnake(1);
//  initSnake(0);
//  console.log(pcSnake);
//  console.log(npcSnake);
	  
  vertexBuffer = gl.createBuffer(); // init empty vertex coord buffer
  gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer); // activate that buffer
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(p2VArray),gl.STATIC_DRAW); // coords to that buffer
  
  ambBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ambBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2AmbArray), gl.STATIC_DRAW);
  
  diffBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, diffBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2DiffArray), gl.STATIC_DRAW);
  
  specBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, specBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2SpecArray), gl.STATIC_DRAW);
  //.log(uvArray);
//  uvBuffer = gl.createBuffer();
//  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
//  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvArray), gl.STATIC_DRAW);
  
  //console.log(hArray);
  hBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, hBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2HArray),gl.STATIC_DRAW);
  
  //console.log(normArray);
  normBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(p2NormArray),gl.STATIC_DRAW);
  
  //console.log(lightVecArray);
  lightBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, lightBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,  new Float32Array(p2LightVecArray), gl.STATIC_DRAW);
  
  triangleBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(S2IndexArray),gl.STATIC_DRAW);
  setupShaders(); // setup the webGL shaders
  // for each tri buffer array, renderTriangles, might want to pass i as well
  //maybe separate opaque into their own buffer array and render that first
//  console.log(opaqueBufArray);
//  console.log(opaqueAmbBufArray);
//  console.log(opaqueDiffBufArray);
//  console.log(opaqueSpecBufArray);
//  console.log(opaqueUvBufArray);
//  console.log(opaqueNormBufArray);
//  console.log(opaquehBufArray);
//  console.log(opaqueLightBufArray);
//  console.log(notBufArray);
//  console.log(notAmbBufArray);
//  console.log(notDiffBufArray);
//  console.log(notSpecBufArray);
//  console.log(notUvBufArray);
//  console.log(notNormBufArray);
//  console.log(nothBufArray);
//  console.log(notLightBufArray);
  //console.log(food);
  
  animate(); 
  setInterval(gameLoop, timeStep);
  
} // end main