coco = "";
status = "";
objects = [];

function setup(){
    canvas = createCanvas(600,400);
    canvas.center();
     objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects:";
}

function preload(){
    coco = loadImage("d.jpg");
}

function draw(){
    image(coco,0,0, 600,400);
    if(status != ""){
        for(i=0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " "+ percent + "%", objects[i].x, objects[i].y-12);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded !");
    status = true;
    objectDetector.detect(coco, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}