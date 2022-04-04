song = "";
status1 = "";

objects = [];


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modalLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Object";
}



function preload() {
    song=loadSound("ringing_old_phone.mp3");
}


function draw() {
    image(video, 0, 0, 380, 380);
    if (status1 != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {

            r = random(255);
            g = random(255);
            b = random(255);

            document.getElementById("status").innerHTML = "status : object detected";
            document.getElementById("baby").innerHTML = "Number Of Objects Detected are = "+objects.length;
            fill(r,g,b);

            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y)
            noFill();
            stroke(r,g,b);

            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person") {
                document.getElementById("baby").innerHTML = "Baby Found";
                song.stop();
            } else {
                document.getElementById("baby").innerHTML = "Baby not Found";
                song.play();
            }
        }
        if (objects.length == 0) {
            document.getElementById("baby").innerHTML = "Baby not Found";
            song.play();
        }
    }
}


function modalLoaded() {
    console.log("Modal Is Loading");
    status1 = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;

    }
}