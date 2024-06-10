img="";
status_="";
objects=[];

function preload(){
img=loadImage("download");
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";

    if(status_!=""){
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: objects detected";
            
            stroke("blue");
            fill("blue");
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);

        }
    }
}


function modelLoaded(){
    console.log("ITS WORKING");
    status_=true;
    objectDetector.detect(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}