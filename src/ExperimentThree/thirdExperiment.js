let SEED = "24";
Nof1.SET_SEED(SEED);
import {levDisWord_DicEdit} from "./LevDisWord_DicEdit.js";


let wordArr =[];
let word;


function generateIdentifier(numWords) {
    let idenArray = [];
    const length = levDisWord_DicEdit.length;
    word = "";
    for(let i= 0; i < numWords; i++) {
        while (word.length < 4){
            wordArr = levDisWord_DicEdit[Nof1.new_random_integer(length)];
            word = wordArr[0];
        }
        idenArray.push(word);
        word = "";
    }
    return idenArray;
}

function generate_experiment(notation){
    let wordArr = generateIdentifier(3);

    return join_identifier(wordArr, notation);
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
        const j =  Nof1.new_random_integer(i); //Math.abs(random.int32() % (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function uppercase(identArray) {
    let output;
    output = [identArray[0]];
    for (let i = 1; i < identArray.length; i++) {
        output.push((identArray[i][0]).toUpperCase() + identArray[i].slice(1, identArray[i].length));
    }
    return output;
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


function answer(number){
    if(number === 4){
        return 0;
    }
    else{return 1}
}


function generate_distracter(identifierArr, modificationPosition, notation){
    let levDistances =[];
    let word;
    let distracter = "";


    if(modificationPosition === 0){
        return join_identifier(generateIdentifier(3), notation);
    }
    else if(modificationPosition === 4){
        return join_identifier(identifierArr, notation);
    }
    else {
        word = identifierArr[modificationPosition-1];
        levDistances = getting_the_array_of_word(word);
        if(levDistances[1].length === 1){
            distracter = shuffle_for_distracters(levDistances[2])[0];
        }
        else {
            distracter = shuffle_for_distracters(levDistances[1])[0];
        }
    }
    return composing_distracter(identifierArr, distracter, modificationPosition, notation);
}


function composing_distracter(identifierArr, distracter, modificationPosition, notation){
    let result = [];
    for (let k = 0; k < 3; k++) {
        if (modificationPosition - 1 === k) {
            result[k] = distracter
        } else {
            result[k] = identifierArr[k];
        }
    }
    return join_identifier(result, notation);
}


class Task {
    constructor(tc, experiment_definition, text) {
        this.expected_answer = "";
        this.given_answer = "";
        this.required_milliseconds = null;
        this.task_number_in_execution = -1;
        this.invalid_answers = [];
        this.is_training = false;
        this.has_pre_task_description = false;
        this.do_print_task = () => {
            throw new Error("Method not implemented.");
        };
        this.do_print_pre_task = () => {
            throw new Error("Method not implemented.");
        };
        this.do_print_error_message = () => {
            throw new Error("Method not implemented.");
        };
        this.accepts_answer_function = (answer) => true;
        this.do_print_after_task_information = () => {
            throw new Error("Method not implemented.");
        };
        this.treatment_combination = tc;
        this.experiment_definition = experiment_definition;
        // this.code_string(text);
    }
    accepts_answer(input) {
        let answer = this.experiment_definition.measurement.get_given_answer(input);
        return this.accepts_answer_function(answer);
    }
    next_task() {
        if (this.task_number_in_execution < this.experiment_definition.tasks.length)
            return this.experiment_definition.tasks[this.task_number_in_execution];
        else
            return null;
    }
    html_string_with_cmd(html_string, cmd) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(html_string));
        //     cmd();
        // }
    }
    html_node_with_cmd(element, cmd) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_node(element));
        //     cmd();
        // }
    }
    after_task_string_constructor(a_string_constructor) {
        // this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(a_string_constructor()));
    }
    print_task() {
        this.do_print_task();
        this.print_input_request();
    }
    print_pre_task_info() {
        this.do_print_pre_task();
    }
    print_input_request() {
        this.experiment_definition.measurement.input_type.print_input_request();
    }
    treatment_value(treatment_name) {
        for (let treatment of this.treatment_combination.treatment_combination)
            if (treatment.variable.name === treatment_name)
                return treatment.value;
        throw "Unknown treatment: " + treatment_name;
    }
    set_computed_variable_value(variable_name, value) {
        for (let treatment of this.treatment_combination.treatment_combination)
            if (treatment.variable.name === variable_name) {
                treatment.value = value;
                return;
            }
        throw "Unknown treatment: " + variable_name;
    }
}


let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "Camel case Vs Underscore",
        seed: SEED,

        introduction_pages: [writer.string_page_command(
                "<p>This is a camelCase vs under_score identifier experiment." +
                "\n\nPlease read till the end.</p>" +
                "<p>This experiment is constructed as follows.</p>" +
                "<p>You are expected to identify if the identifier you are shown" +
                " on the second page is the same as the one you were shown on the first page.</p>" +
                "<p>The identifiers shown hold no importance in their name/meaning.</p>" +
                "<p>You will be shown an identifier on the first page.</p>" +
                "<p>You have to study this identifier/ memorize, take your time.</p>" +
                "<p>The time is not being measured yet.</p>" +
                "<p>On the page that will follow after pressing enter, you are expected to identify\n\n" +
                " if the identifier being shown is the same as the one you studied/memorize.</p>" +
                "<p>Press  [0] if it is thesame, or [1] if it is not.</p>" +
                "<p>Follow the instructions that come as you proceed.</p>" +
                "<p>You are expected to be concentrated.</p>" +
                "<p>Press [Return]/[ENTER] to enter the training phase.</p>" +
                "<p>The training phase can be ended at any time by pressing [ESC].</p>" +
                "\n\nSo you can end the training when you think you have understood what is required.\n\n" +
                "<p>Thanks for your participation.</p>" +
            " ")],

        pre_run_training_instructions: writer.string_page_command(
            "You entered the training phase. Press [Enter] to start training."
        ),

        pre_run_experiment_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the experiment phase. Press [Enter] to start the experiment."
            )),

        post_questionnaire: [
            Nof1.alternatives("Age", "What's your age??",
                ["younger than 18", "between 18 and (excluding) 25", "between 25 and (excluding) 30", "between 30 and (excluding) 35", "between 35 and (excluding) 40", "40 or older"]),

            Nof1.alternatives("Status", "What is your current working status?",
                ["Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student", "Professional software developer", "Teacher", "Other"]),

            Nof1.alternatives("Studies", "In case you study, what's your subject?",
                ["I do not study", "Computer science", "computer science related (such as information systems, aka WiInf)", "something else in natural sciences", "something else"]),

            Nof1.alternatives("YearsOfExperience", "How many years of experience do you have in software industry?",
                ["none", "less than or equal 1 year", "more than 1 year, but less than or equal 3 years", "more than 3 years, but less than or equal 5 year", "more than 5 years"])
        ],

        finish_pages: [
            writer.string_page_command(
                "Thanks for participating. When you press [Enter], the experiment's data will be downloaded.\n\n" +
                "Please send your data to the experimenter.\n\n")],

        layout: [
            {variable:"Notation", treatments:["CC", "SC"]},
            {variable:"ModificationPosition", treatments:["0", "1", "2" , "3", "4"]},//Position 0 implies distracterType different and position 4 implies the same identifier is shown as the distracter.
            {variable:"IdentifierReadingTime", treatments:["Dummy"]},
        ],

        repetitions: 25,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses: ["0", "1"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        measurement: Nof1.Reaction_time(Nof1.keys(["0", "1"])),

        task_configuration: (task) => {
            task.notation = task.treatment_value("Notation");
            task.modificationPosition = parseInt(task.treatment_value("ModificationPosition"));
            let identifierArr = generateIdentifier(3);
            task.expected_answer = answer(task.modificationPosition);

            let reading_time_start = null;
            let reading_time_stop = null;

            task.has_pre_task_description = true;
            task.do_print_pre_task = () => {
                writer.clear_stage();
                writer.print_html_on_stage("<p>" + join_identifier(identifierArr, task.notation) + "</p>");
                reading_time_start = new Date().getTime().valueOf();

            };

            task.do_print_task = () => {

                reading_time_stop = new Date().getTime().valueOf();
                let required_milliseconds = reading_time_stop - reading_time_start;
                task.set_computed_variable_value("IdentifierReadingTime", required_milliseconds.toString())

                writer.clear_stage();
                writer.print_html_on_stage("<p>&nbsp</p>");
                writer.print_html_on_stage("<p>&nbsp</p>");
                writer.print_html_on_stage("<p>" + generate_distracter(identifierArr, task.modificationPosition, task.notation) + "</p>");
            };

            task.accepts_answer = (s) => {
                return true;
            }

            task.do_print_after_task_information = () => {
                writer.print_error_string_on_stage(
                    writer.convert_string_to_html_string("The correct answer was: " + task.expected_answer +
                        "\n" + "You entered: " + task.given_answer +
                        "\n" + "press [ENTER] to proceed\n" +
                        "OR TAKE A BREAK IF NEEDED BEFORE PRESSING [ENTER] to proceed"
                    )
                );
            }
        }
    }
};

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);
