// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');
    // TODO: Call your apply function(s) here

    // these filters look awful altogether but they each look good separately!
    applyFilterNoBackground(reddify);
    applyFilter(increaseGreenByBlue);
    applyFilterNoBackground(decreaseBlue);
    smudgeImage(smudge);

    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1 & 3: Create the applyFilter function here
function applyFilter(filterFunction) {
    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            var rgbString = image[i][j];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            var rgbString = rgbArrayToString(rgbNumbers);
            image[i][j] = rgbString;
        }
    }
}

// TODO 5: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            if (image[i][j] !== image[0][0]) {
                var rgbString = image[i][j];
                var rgbNumbers = rgbStringToArray(rgbString);
                filterFunction(rgbNumbers);
                var rgbString = rgbArrayToString(rgbNumbers);
                image[i][j] = rgbString;
            }
        }
    }

}

// TODO 2 & 4: Create filter functions
function reddify(array){
    array[RED] = 255;
}

function decreaseBlue(array){
    array[BLUE] = Math.max(array[BLUE] - 30, 0);
}

function increaseGreenByBlue(array){
    array[GREEN] = Math.min(array[GREEN] + array[BLUE], 255)
}

// CHALLENGE code goes below here
function smudgeImage(filterFunction) {
    for (var i = 0; i < image.length; i++) {
        for (var j = 0; j < image[i].length; j++) {
            var rgbString = image[i][j];
            var rgbStringNeighbor = image[i][Math.max(j-1,0)];
            var rgbNumbers = rgbStringToArray(rgbString);
            var rgbNumbersNeighbor = rgbStringToArray(rgbStringNeighbor);
            filterFunction(rgbNumbers, rgbNumbersNeighbor);
            var rgbString = rgbArrayToString(rgbNumbers);
            var rgbStringNeighbor = rgbArrayToString(rgbNumbersNeighbor);
            image[i][j] = rgbString;
            image[i][Math.max(j-1,0)] = rgbStringNeighbor;
        }
    }
}

function smudge(pixel, neighbor) {
    temp1 = pixel[BLUE];
    pixel[BLUE] = neighbor[BLUE];
    neighbor[BLUE] = temp1;

    temp2 = pixel[GREEN];
    pixel[GREEN] = neighbor[GREEN];
    neighbor[GREEN] = temp2;
}

