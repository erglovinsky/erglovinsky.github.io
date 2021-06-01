var counter1 = 0;
var counter2 = 0;
var counter3 = 0;
var counter4 = 0;
var counter5 = 0;

function likePhoto(numPhoto){
    if (numPhoto === 1) {
        counter1++;
        console.log(counter1);
        document.getElementById("likeCount1").innerHTML = counter1;
    } else if (numPhoto === 2) {
        counter2++;
        console.log(counter2);
        document.getElementById("likeCount2").innerHTML = counter2;
    } else if (numPhoto === 3){
        counter3++;
        console.log(counter3);
        document.getElementById("likeCount3").innerHTML = counter3;
    }else if (numPhoto === 4) {
        counter4++;
        console.log(counter4);
        document.getElementById("likeCount4").innerHTML = counter4;
    } else {
        counter5++;
        console.log(counter5);
        document.getElementById("likeCount5").innerHTML = counter5;
    }
}

var user = {
    'name': 'Eve',
    'name_last': 'Glovinsky',
    'followers': ["Amy", "Riley", "Zekhi", "Ceddrick", "Brandon", "Sam"],
    'profile_pic': 'https://i.imgur.com/EIs61BI.png',
}

setTimeout(function(){ document.getElementById("name").innerHTML = user.name;}, 3000);
setTimeout(function(){ document.getElementById("name_last").innerHTML = user.name_last;}, 3000);
setTimeout(function(){ document.getElementById("followers").innerHTML = "Followers: " + user.followers.length;}, 3000);
setTimeout(function(){ $("#profile_pic").attr("src", user.profile_pic);}, 3000);
