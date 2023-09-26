const stringSimilarity = require('string-similarity');

// Sample passage
const passage = `
Mens Casual Premium Slim Fit T-Shirts Slim-fitting style, 
contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable 
and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual 
fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.
Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday
`;

// Function to search for similar text
function searchSimilarText(query, passage, numResults = 3) {
  const sentences = passage.split('\n').filter((sentence) => sentence.trim() !== '');
  
  // Calculate the similarity between the query and each sentence
  const similarities = sentences.map((sentence) => ({
    sentence,
    similarity: stringSimilarity.compareTwoStrings(query, sentence),
  }));

  // Sort by similarity and return the top results
  similarities.sort((a, b) => b.similarity - a.similarity);

  return similarities.slice(0, numResults);
}

// Example usage
const query = 'Slim Fit TShirt';
const results = searchSimilarText(query, passage);

console.log('Query:', query);
console.log('Similar Text:');
results.forEach((result) => {
  console.log(`Sentence: ${result.sentence}, Similarity: ${result.similarity}`);
});
