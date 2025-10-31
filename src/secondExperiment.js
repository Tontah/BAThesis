let SEED = "42";
import {levDisWord_DicEdit} from "./LevDisWord_DicEdit.js";

let random = new Math.seedrandom("80");
let wordArr =[];
let word;
document.set_seed(SEED);

function uppercase(identArray) {
    let output;
    output = [identArray[0]];
    for (let i = 1; i < identArray.length; i++) {
        output.push((identArray[i][0]).toUpperCase() + identArray[i].slice(1, identArray[i].length));
    }
    return output;
}

function generateIdentifier(numWords) {
    let idenArray = [];
    const length = levDisWord_DicEdit.length;
    word = "";
    for(let i= 0; i < numWords; i++) {
        while (word.length < 4){
            wordArr = levDisWord_DicEdit[document.new_random_integer(length)];
            word = wordArr[0];
        }
        idenArray.push(word);
        word = "";
    }
    return idenArray;
}


function generate_experiment(numOfCorrectIdentifiers, modificationPosition, separator, notation){
    let wordArr = generateIdentifier(3);
    let distracters = shuffle_array(generate_distracter(wordArr, modificationPosition))
    let identifier;
    let output ;
    const pos = [0,1,2,3,4];
    let correctIdenPosition = [];


    identifier = join_identifier(wordArr, notation);
    output = identifier + "\n" + "\n";



    correctIdenPosition = shuffle_array(pos).slice(0, numOfCorrectIdentifiers);
    for (let i = 0; i < 5; i++) {
        if (correctIdenPosition.includes(i)) {
            output += writeOutput(identifier, i, separator);
        }
        else {
            output += writeOutput(join_identifier(distracters[i], notation), i, separator);
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


function join_identifier(identifierArr, style) {
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


function generate_distracter(identifierArr, modificationPosition){
    let distracterArr = [];
    let levDistances =[];
    let shuffled =[];
    let word;
    let distracter = "";
    let added = 0;


    if(modificationPosition === 0){
        for (let i = 0; i < 5; i++) {
            distracterArr.push(generateIdentifier(3));
        }
    }
    else {
        word = identifierArr[modificationPosition-1];
        levDistances = getting_the_array_of_word(word);
        for (let j = 1; j < levDistances.length; j++) {
            if(added === 5){
                break;
            }
            shuffled = shuffle_for_distracters(levDistances[j]);
            for (let i = 0; i < shuffled.length; i++) {
                distracter = shuffled[i];
                if(added === 5){
                    break;
                }
                else{
                    //changing letters wrt the position of modification.
                    if (shuffled[i].length === word.length || shuffled[i].length === (word.length + 1) || shuffled[i].length === (word.length - 1)) {
                        distracterArr.push(composing_distracter_array(identifierArr, distracter, modificationPosition));
                        added++;
                    }
                }
            }
        }
        if(distracterArr.length !== 5){
            word = identifierArr[modificationPosition-1];
            levDistances = getting_the_array_of_word(word);
            for (let j = 1; j < levDistances.length; j++) {
                if (added === 5) {
                    break;
                }
                shuffled = shuffle_for_distracters(levDistances[j]);
                for (let i = 0; i < shuffled.length; i++) {
                    if (added === 5) {
                        break;
                    }
                    distracter = shuffled[i];
                    //changing letters wrt the position of modification.
                    if (shuffled[i].length === (word.length + 2) || shuffled[i].length === (word.length - 2)) {
                        distracterArr.push(composing_distracter_array(identifierArr, distracter, modificationPosition));
                        added++;
                    }
                }
            }
        }
    }
    return distracterArr;
}


function composing_distracter_array(identifierArr, distracter, modificationPosition){
    let result = [];
    for (let k = 0; k < 3; k++) {
        if (modificationPosition - 1 === k) {
            result[k] = distracter
        } else {
            result[k] = identifierArr[k];
        }
    }
    return result;
}



document.experiment_definition(
    {
        experiment_name:"Camel case Vs Underscore",
        seed:"42",
        introduction_pages:["This is a camelCase vs under_score identifier experiment.\n\n" +
        "Please read till the end.\n\n" +
        "This experiment is constructed as follows.\n\n" +
        "You will be shown a page with an identifier on the \n\n" +
        "top left corner and a list of identifiers underneath.\n\n" +
        "You are expected to count the number of identifiers that match the identifier shown top left,\n\n" +
        " and type in the number you counted from zero to five\n\n" +
        "The name of the identifiers are not of any importance.\n\n" +
        "Follow the instructions that come as you proceed.\n\n" +
        "You are expected to be concentrated.\n\n" +
        "Press [Return]/[ENTER] to enter the training phase.\n\n" +
        "The training phase can be ended at any time by pressing [ESC].\n\n" +
        "So you can end the training when you think you have understood what is required.\n\n" +
        "As you press enter, place your fingers on the 0, 4, 5, 6 keys on the num pad.\n\n" +
        "you can then use the 0, 1, 2, 3, 4 keys to type in the correct answer.\n\n" +
        "Thanks for your participation."],

        pre_run_instruction:"Be prepared - experimentation starts soon.",

        finish_pages:["Thanks for participating. Pressing [ENTER] downloads the csv data file.\n\n" +
        "Please send this file to nikitatchana@gmail.com"],
        layout:[
            {variable:"Notation", treatments:["CC", "SC"]},
            {variable:"Separator", treatments:["Newline", "Whitespace"]},
            {variable: "NumOfCorrectIdents", treatments: ["0", "1", "2" , "3", "4"]},//tells how many correct identifiers have to be in the list, the rest are the distracters
            {variable: "ModificationPosition", treatments: ["0", "1", "2", "3"]},
        ],
        repetitions:5,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["0", "1", "2", "3", "4"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{


            t.expected_answer = parseInt(t.treatment_combination[2].value);
            t.notation = t.treatment_combination[0].value;
            t.seperator = t.treatment_combination[1].value;
            t.modificationPosition = parseInt(t.treatment_combination[3].value);
            t.code = generate_experiment(t.expected_answer, t.modificationPosition, t.seperator, t.notation);


            t.after_task_string = ()=>"The correct answer was: " + t.expected_answer +
                "\n" + "You entered: " + t.given_answer +
                "\n" + "press [ENTER] to proceed\n" +
                "OR TAKE A BREAK IF NEEDED BEFORE PRESSING [ENTER] to proceed";
        }
    }
);

