let SEED = "42"
import {dictionary} from "./dictionary.js";
import {words} from "./word.js";
import {levDisWord_DicEdit} from "./levDisWord_DicEdit.js";

let random = new Math.seedrandom("80");
let wordArr =[];
let word;
document.set_seed(SEED);

function to_positive(rand) {
    let num = Math.abs(rand.int32() % 5);
    while (num < 2 || num > 4 ){
        num = Math.abs(rand.int32() % 5);
    }
    console.log(num);
    return num;
}

function uppercase(identArray) {
    let output = [identArray[0]];
    for(let i = 1; i < identArray.length; i++) {
        output.push((identArray[i][0]).toUpperCase() + identArray[i].slice(1, identArray[i].length));
    }
    return output;
}

function generateIdentifier(numWords) {
    let idenArray = [];
    const length = levDisWord_DicEdit.length;
    //wordArr = levDisWord_DicEdit[document.new_random_integer(length)];
    word = "a";
    for(let i= 0; i < numWords; i++) {
        while (word.length < 4){
            wordArr = levDisWord_DicEdit[document.new_random_integer(length)];
            word = wordArr[0];
        }
        idenArray.push(word);
        word = "a";
    }
    return idenArray;
}

function generate_experiment(numOfCorrectIdentifiers, identifierType, separator, notation){
    let wordArr = generateIdentifier(to_positive(random));
    let distracters = shuffle_array(generate_distracter(wordArr, identifierType));
    let identifier;
    let output ;
    const pos = [0,1,2,3,4,5];
    let correctIdenPosition = [];

    if (notation === "CC") {
        identifier = uppercase(wordArr).join("");
    }
    else{ identifier = wordArr.join("_"); }
    output = identifier + "\n" + "\n";

    if(numOfCorrectIdentifiers === 0){
        for (let i = 0; i < 6; i++) {
            output += writeOutput(join_identifier(distracters[i], notation), i, separator);
        }
    }
    else {
        correctIdenPosition = shuffle_array(pos).slice(0, numOfCorrectIdentifiers);
        for (let i = 0; i < 6; i++) {
            if (correctIdenPosition.includes(i)) {
                output += writeOutput(identifier, i, separator);
            } else {
                output += writeOutput(join_identifier(distracters[i], notation), i, separator);
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

function shuffle_for_distracters(arr) {
    let array = [];
    for (let i = 1; i < arr.length; i++) {
        array[i-1] = arr[i];
    }
    for (let i = array.length-1; i > 0; i--) {
        const j = Math.abs(random.int32() % (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function shuffle_array(arr) {
    for (let i = arr.length-1; i > 0; i--) {
        const j = Math.abs(random.int32() % (i));
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
            output = levDisWord_DicEdit[i];
            break;
        }
    }
    return output
}


function change_or_delete_letter(identifierArr){
    let length = identifierArr.length;
    let distracterArr = [];
    let levDistances =[];
    let shuffled =[];
    let word;
    let distracter;
    let deleted = false;
    let changed = false;
    let added = false;
    for (let b = 0; b < identifierArr.length; b++) {
        word = identifierArr[b];
        levDistances = getting_the_array_of_word(word);
        for (let j = 1; j < levDistances.length; j++) {
            shuffled = shuffle_for_distracters(levDistances[j]);
            for (let i = 0; i < shuffled.length; i++) {
                if (shuffled[i][0] === word[0]) {
                    distracter = shuffled[i];
                    //changing any but first letter
                    if ((shuffled[i].length === word.length && changed === false) || ((shuffled[i].length === word.length-1 || shuffled[i].length === word.length-2) && deleted === false)
                        || (shuffled[i].length === word.length+1 && added === false)) {
                        if (length === 3) {
                            switch (b) {
                                case 0:
                                    distracterArr.push([distracter, identifierArr[1], identifierArr[2]]);
                                    break;
                                case 1:
                                    distracterArr.push([identifierArr[0], distracter, identifierArr[2]]);
                                    break;
                                case 2:
                                    distracterArr.push([identifierArr[0], identifierArr[1], distracter]);
                                    break;
                                default:
                                    console.log("Something went wrong");
                            }
                            if (word.length === distracter.length){
                                changed = true;
                            }
                            else {deleted = true;}
                            if (changed === true && deleted === true){
                                break;
                            }
                        } else if (length === 4) {
                            switch (b) {
                                case 0:
                                    distracterArr.push([distracter, identifierArr[1], identifierArr[2], identifierArr[3]]);
                                    break;
                                case 1:
                                    distracterArr.push([identifierArr[0], distracter, identifierArr[2], identifierArr[3]]);
                                    break;
                                case 2:
                                    distracterArr.push([identifierArr[0], identifierArr[1], distracter, identifierArr[3]]);
                                    break;
                                case 3:
                                    distracterArr.push([identifierArr[0], identifierArr[1], identifierArr[2], distracter]);
                                    break;
                                default:
                                    console.log("Something went wrong");
                            }
                            if (word.length === distracter.length){
                                changed = true;
                            }
                            else{
                                deleted = true;
                            }
                            if (changed === true && deleted === true){
                                break;
                            }
                        }
                    }
                }
            }
            if (changed === true && deleted === true){
                deleted = changed = false;
                break;
            }
        }
    }
    return distracterArr;
}

function generate_distracter(identifierArr, identifierType){
    let distracterArr = [];
    let levDistances =[];
    let shuffled =[];
    let word;
    let distracter = "empty";
    let deleted = false;
    let changed = false;
    let added = false;


    if(identifierType === "different"){
        for (let i = 0; i < 6; i++) {
            distracterArr.push(generateIdentifier(to_positive(random)));
        }
    }
    else {
        switch (identifierArr.length) {
            case 2:
                for (let b = 0; b < identifierArr.length; b++) {
                    word = identifierArr[b];
                    levDistances = getting_the_array_of_word(word);
                    for (let j = 1; j < levDistances.length; j++) {
                        shuffled = shuffle_for_distracters(levDistances[j]);
                        for (let i = 0; i < shuffled.length; i++) {
                            if (b === 0) {
                                if (shuffled[i][0] === word[0]) {
                                    distracter = shuffled[i];
                                    //changing any but first letter of word1
                                    if (shuffled[i].length === word.length && changed === false) {
                                        distracterArr.push([distracter, identifierArr[b + 1]]);
                                        changed = true;
                                    }
                                    //deleting one letter from word1
                                    if ((shuffled[i].length === word.length - 1 || shuffled[i].length === word.length - 2) && deleted === false) {
                                        distracterArr.push([distracter, identifierArr[b + 1]]);
                                        deleted = true;
                                    }
                                    //adding one or more letters to word1
                                    if (added === false && (shuffled[i].length === word.length + 1 || shuffled[i].length === word.length + 2)) {
                                        distracterArr.push([distracter, identifierArr[b + 1]]);
                                        added = true;
                                    }
                                    if (deleted === true && changed === true && added === true) {
                                        break;
                                    }
                                }
                            } else {
                                distracter = shuffled[i];
                                //adding one or more letters to word2
                                if (added === false && (distracter.length === word.length + 1 || distracter.length === word.length + 2)) {
                                    distracterArr.push([identifierArr[b - 1], distracter]);
                                    added = true;
                                }
                                if (shuffled[i].length === word.length) {
                                    //changing any but first letter of word2
                                    if (shuffled[i][0] === word[0] && changed === false) {
                                        distracterArr.push([identifierArr[b - 1], distracter]);
                                        changed = true;
                                    }
                                    //changing first letter of word2
                                    if (shuffled[i][0] !== word[0] && deleted === false) {
                                        distracterArr.push([identifierArr[b - 1], distracter]);
                                        deleted = true;
                                    }
                                    if (deleted === true && changed === true && added === true) {
                                        break;
                                    }
                                }
                            }
                        }
                        if (deleted === true && changed === true && added === true) {
                            added = deleted = changed = false;
                            break;
                        }
                    }
                }
                break;
            case 3:
               distracterArr = change_or_delete_letter(identifierArr);
                break;
            case 4:
                distracterArr = change_or_delete_letter(identifierArr);
                break;
            default:
                distracterArr = [["Number", "of", "words", ">", "four"]];
        }
    }
    return distracterArr;
}



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
            {variable: "NumOfCorrectIdents", treatments: ["0", "1", "2" , "3", "4", "5", "6"]},//tells how many identifiers have to be in the list, the rest are thn distracters
            {variable: "IdentifierType", treatments: ["same", "different"]},
        ],
        repetitions:5,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["0","1", "2", "3", "4", "5", "6"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{

            t.expected_answer = parseInt(t.treatment_combination[2].value);
            t.identifier_type = t.treatment_combination[3].value;
            t.notation = t.treatment_combination[0].value;
            t.seperator = t.treatment_combination[1].value;
            t.code = generate_experiment(t.expected_answer, t.identifier_type, t.seperator, t.notation);

            t.after_task_string = ()=>"The correct answer was: " + t.expected_answer +
            "\n" + "You entered: " + t.given_answer +
            "\n" + "press [ENTER] to proceed\n" +
            "OR TAKE A BREAK IF NEEDED BEFORE PRESSING [ENTER] to proceed";
        }
    }
);

