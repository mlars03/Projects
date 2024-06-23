// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, dnaArray) => {
  return {
    specimenNum : number, 
    dna: dnaArray,
    compareDNA(dnaObject){
      console.log(this.dna, dnaObject.dna);
      let same = 0; //counter for the strands that are the same
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === dnaObject.dna[i]){
          same++;
        }
      }
      const similarity = (same / this.dna.length * 100).toFixed(2);
      return `specimen #${this.specimenNum} and specimen #${dnaObject.specimenNum} have ${similarity}% DNA in common.` ;
   
    },
    willLikelySurvive(){
      const survivalBases = this.dna.filter(base => base === 'C' || base === 'G');
      return survivalBases.length / this.dna.length >= 0.6;
    }
  };
};


//let specimen1 = pAequorFactory(1, mockUpStrand());
//let specimen2 = pAequorFactory(2, mockUpStrand());
//console.log(specimen1, specimen1.willLikelySurvive(), specimen2, specimen2.willLikelySurvive(), specimen1.compareDNA(specimen2));

// Mutate a DNA strand by changing one base
const mutate = (dnaObject) => {
  const newDnaObject = { ...dnaObject, dna: [...dnaObject.dna] }; // Clone the object to avoid mutating the original
  const randIndex = Math.floor(Math.random() * newDnaObject.dna.length);
  let newBase;
  do {
    newBase = returnRandBase();
  } while (newBase === newDnaObject.dna[randIndex]);
  newDnaObject.dna[randIndex] = newBase;
  return newDnaObject;
};
//console.log(specimen1);
//console.log(mutate(specimen1));
//console.log(specimen1.compareDNA(mutate(specimen1))); 

// Helper function to check if a specimen is a duplicate
const isDuplicate = (newSpecimen, array) => {
  return array.some(specimen => JSON.stringify(specimen.dna) === JSON.stringify(newSpecimen.dna));
  
};

// Function to build an array of specimens likely to survive
const buildArray = () => {
  const array = [];
  let specimenNum = 1;

  // Create initial specimens that are likely to survive
  while (array.length < 30) {
    let specimen = pAequorFactory(specimenNum, mockUpStrand());
    if (specimen.willLikelySurvive() && !isDuplicate(specimen, array)) {
      array.push(specimen);
      specimenNum++;
    }
  }

  return array;
};

console.log(buildArray());