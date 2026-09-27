import {levDisWord_DicEdit} from "./filteredDictionary.js";

console.log("length of the array is "+ levDisWord_DicEdit.length);

let counter = 0;
function filter(){
    for (let i = 0; i < levDisWord_DicEdit.length; i++) {
        if(levDisWord_DicEdit[i][0].length < 7 && levDisWord_DicEdit[i][0].length > 4){
            counter++;
        }
    }
    return counter;
}
console.log(levDisWord_DicEdit.length


);