let SEED = "42"
import {levDisWord_DicEdit} from "./filteredDictionary.js";


let random = new Math.seedrandom("80");
let wordArr =[];
let word;
document.set_seed(SEED);


function uppercase(identArray) {
    let output = [identArray[0]];
    for (let i = 1; i < identArray.length; i++) {
        output.push((identArray[i][0]).toUpperCase() + identArray[i].slice(1, identArray[i].length));}
        return output;
}

function generateIdentifier(numWords) {
    let idenArray = [];
    const length = levDisWord_DicEdit.length;
    word = "a";
    for(let i= 0; i < numWords; i++) {
        while (word.length < 4 || word.length > 6){
            wordArr = levDisWord_DicEdit[document.new_random_integer(length)];
            word = wordArr[0];
        }
        idenArray.push(word);
        word = "a";
    }
    return idenArray;
}

function generate_experiment(numOfCorrectIdentifiers, distractorType, separator, notation){
    let wordArr = generateIdentifier(3);
    let distractors = shuffle_array(generate_distractor(wordArr,distractorType));
    let identifier;
    let output ;
    const pos = [0,1,2,3];
    let correctIdenPosition = [];

    if (notation === "CC") {
        identifier = uppercase(wordArr).join("");
    }
    else{ identifier = wordArr.join("_"); }
    output = identifier + "\n" + "\n";

    if(numOfCorrectIdentifiers === 0){
        for (let i = 0; i < 4; i++) {
            output += writeOutput(join_identifier(distractors[i], notation), i, separator);
        }
    }
    else {
        correctIdenPosition = shuffle_array(pos).slice(0, numOfCorrectIdentifiers);
        for (let i = 0; i < 4; i++) {
            if (correctIdenPosition.includes(i)) {
                output += writeOutput(identifier, i, separator);
            } else {
                output += writeOutput(join_identifier(distractors[i], notation), i, separator);
            }
        }
    }
    return output;
}

function writeOutput(word, pos, NLorWS){
    let output ;
    switch (NLorWS) {
        case "Newline":
            if (pos === 0) { output = "\n" + "\n" + word; }
            else { output = "\n" + word; }
            break;
        case "Whitespace":
            if (pos === 0) { output = "\n" + "\n" + word; }
            else { output = ", " + word; }
            break;
        default:
            output = "You entered an invalid separator";
    }
    return output;
}

function shuffle_for_distractors(arr) {
    let array = [];
    if(arr.length === 1){return arr;}
    for (let i = 1; i < arr.length; i++) {
        array[i-1] = arr[i];
    }
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.abs(random.int32() % (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function shuffle_array(arr) {
    for (let i = arr.length-1; i > 0; i--) {
        const j = Math.abs(random.int32() % (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function join_identifier(identifierArr, style){
        switch (style) {
            case "CC":
                return uppercase(identifierArr).join("");
            case "SC":
                return identifierArr.join("_");
            default:
        }
}

function getting_the_array_of_word(word){
    let output = []
    for (let i = 0; i < levDisWord_DicEdit.length; i++) {
        if(levDisWord_DicEdit[i][0] === word){
            for (let j = 0; j < levDisWord_DicEdit[i].length; j++) {
                output.push(levDisWord_DicEdit[i][j])
            }
            break;
        }
    }
    return output
}


function generate_distractor(identifierArr, distractorType){
    let distractorArr = [];
    let levDistances =[];
    let shuffled =[];
    let identifierWord;
    let counter = 0;
    let distractors = [];


    if(distractorType === "different"){
        for (let i = 0; i < 5; i++) {
            distractorArr.push(generateIdentifier(3));
        }
    }
    else{
        for (let b = 0; b < identifierArr.length; b++) {
            identifierWord = identifierArr[b];
            levDistances = getting_the_array_of_word(identifierWord);
            for (let j = 1; j < levDistances.length; j++) {
                if(distractors.length === 2){break}
                const innerLength = levDistances[j].length;
                if(innerLength === 1){continue;}
                else if (innerLength === 2){
                        distractors.push(levDistances[j][1]);
                        continue;
                }
                else{
                    shuffled = shuffle_for_distractors(levDistances[j]);
                    for (let i = 0; i < shuffled.length; i++) {
                        if(distractors.length === 2){break}
                        if (shuffled[i][0] === identifierWord[0] /*changing any but first letter*/) {
                            distractors.push(shuffled[i]);
                            shuffled.splice(i, 1)
                            distractors.push(shuffle_for_distractors(shuffled)[0])
                        }
                    }
                    if (distractors.length < 2 ){
                        distractors.push(shuffled[Math.abs(random.int32() % shuffled.length)]);
                        shuffled = shuffle_for_distractors(levDistances[j+1]);
                        for (let i = 0; i < shuffled.length; i++) {
                            if (shuffled[i][0] === identifierWord[0] /*changing any but first letter*/) {
                                distractors.push(shuffled[i]);
                            }
                            if(distractors.length === 2){break}
                        }
                        if(distractors.length !== 2){
                            distractors.push(shuffled[3]);
                        }

                    }
                }
                break;
            }
            while (counter < 2) {
                switch (b) {
                    case 0:
                        distractorArr.push([distractors[counter], identifierArr[1], identifierArr[2]]);
                        break;
                    case 1:
                        distractorArr.push([identifierArr[0], distractors[counter], identifierArr[2]]);
                        break;
                    case 2:
                        distractorArr.push([identifierArr[0], identifierArr[1], distractors[counter]]);
                        break;
                    default:
                        console.log("Something went wrong");
                }
                counter++;
            }
            distractors = [];
            counter = 0;
        }
    }
    return distractorArr;
}


let expect = "";
document.experiment_definition(
    {
        experiment_name:"Camel case Vs Underscore",
        seed:"42",
        introduction_pages:["This is a camelCase vs under_score identifier experiment.\n\n" +
        "Please read till the end.\n\n" +
        "This experiment is constructed as follows.\n\n" +
        "You are expected to count the number of identifiers shown and type the counted number.\n\n" +
        "The name of the identifiers are not of any importance.\n\n" +
        "Follow the instructions that come as you proceed.\n\n" +
        "You are expected to be concentrated.\n\n" +
        "Press [Return]/[ENTER] to enter the training phase.\n\n" +
        "The training phase can be ended at any time by pressing [ESC].\n\n" +
        "So you can end the training when you think you have understood what is required.\n\n" +
        "Thanks for your participation."],

        pre_run_instruction:"Be prepared - experimentation starts soon.",

        finish_pages:["Thanks for participating. Pressing [ENTER] downloads the csv data file.\n\n" +
        "Please send this file to nikitatchana@gmail.com"],
        layout:[
            {variable:"Notation", treatments:["CC", "SC"]},
            {variable:"Separator", treatments:["Newline", "Whitespace"]},
            {variable: "NumOfCorrectIdents", treatments: ["0", "1", "2" , "3"]},//tells how many identifiers have to be in the list, the rest are thn distractors
            {variable: "DistractorType", treatments: ["same", "different"]},
        ],
        repetitions:4,      // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["0", "1", "2", "3"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{

            t.expected_answer = parseInt(t.treatment_combination[2].value);
            t.distractor_type = t.treatment_combination[3].value;
            t.notation = t.treatment_combination[0].value;
            t.seperator = t.treatment_combination[1].value;
            t.code = generate_experiment(t.expected_answer, t.distractor_type, t.seperator, t.notation);


            t.after_task_string = ()=>
                "The correct answer was: " + t.expected_answer +
                "\n" + "You entered: " + t.given_answer +
                "\n" + "press [ENTER] to proceed\n" +
                "OR TAKE A BREAK IF NEEDED BEFORE PRESSING [ENTER] to proceed";
        }
    }
);
