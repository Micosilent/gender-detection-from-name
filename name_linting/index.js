const enMap = require('../names/en');
const itMap = require('../names/it');
const esMap = require('../names/es');


const consolidatedMap = new Map();

const consolidateNames = (value, key, lan, map) => {
    let mapValue = {};
    if (map.has(key)) {
        mapValue = map.get(key);
        mapValue[lan] = value;
    } else {
        mapValue[lan] = value;
    }
    map.set(key, mapValue);
};

enMap.forEach((value, key) => consolidateNames(value, key, 'en', consolidatedMap));
itMap.forEach((value, key) => consolidateNames(value, key, 'it', consolidatedMap));
esMap.forEach((value, key) => consolidateNames(value, key, 'es', consolidatedMap));

let enDuplicates = 0;
let itDuplicates = 0;
let esDuplicates = 0;
let totalDuplicates = 0;

consolidatedMap.forEach((value, _key) => {

    if (Object.keys(value).length > 1) {
        totalDuplicates += 1;
        if (value["en"]) enDuplicates += 1;
        if (value["it"]) itDuplicates += 1;
        if (value["es"]) esDuplicates += 1;
    }
})

console.log(`There are ${totalDuplicates} duplicates`)
console.log(`   - ${enDuplicates} in the enMap`)
console.log(`   - ${itDuplicates} in the itMap`)
console.log(`   - ${esDuplicates} in the esMap`)

//Let's now try without the Spanish map

console.log("\nExcluding the Spanish map \n")

enDuplicates = 0;
itDuplicates = 0;
esDuplicates = 0;
totalDuplicates = 0;

const excludingSpanishMap = new Map()

enMap.forEach((value, key) => consolidateNames(value, key, 'en', excludingSpanishMap));
itMap.forEach((value, key) => consolidateNames(value, key, 'it', excludingSpanishMap));

excludingSpanishMap.forEach((value, _key) => {
    if (Object.keys(value).length > 1) {
        totalDuplicates += 1;
    }
})

console.log(`There are ${totalDuplicates} duplicates`)