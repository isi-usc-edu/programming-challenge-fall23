import data from './Groceries_dataset.json'
import {moods} from "./WebSpeedAPI";

// const grammerData = data
// const grammerArray = grammerData.map((data) => {
//     return data.itemDescription.split(' ')
// }).flat().map((data) => data.split('/')).flat()

const finalGrammer = data
let grammar = '#JSGF V1.0; grammar moods; public <moods> = ' + finalGrammer.join(' | ') + ';';
export {finalGrammer, grammar}
