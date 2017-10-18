const bdd = {
  c: "a;b",
  e: "b;d",
  f: "c;e",
  g: "c;e;f",
  h: "f;e",
  k: "g;h;c",
  l: "c;e;h",
  m: "h",
  n: "m;e;k",
  o: "c;a;n",
  p: "c;d;e;f;g;h;i;j;k;l;m;n;o"
};
$('#graph').click(_=>{
  $("#result").toggle()
})

var button = document.getElementById("searchInferenceButton");
button.addEventListener("click", searchResult, false);
let allLettersWeNeed;
function searchResult() {
  allLettersWeNeed = new Set()
  const search = document.getElementById("searchInference").value;
  if (!bdd.hasOwnProperty(search)) return $('#error').text(`${search} doesn't exist in the bdd. Try one of these: ${Object.keys(bdd)}`)
  else $('#error').empty()
  let resultString = ``;
  const chain = searchOccurenceInBdd(search);
  const jq = format(chain)
  $("#result")
    .empty()
    .append(jq)
  $("#allLettersWeNeed")
    .empty()
    .append(Array.from(allLettersWeNeed))

}
function format(chain) {
  if (chain.tempChain && chain.tempChain.length) {
    letters = chain.tempChain.map(partial=>format(partial))
    allLettersWeNeed.add(chain.letter)
    return $('<div>').append(
      chain.letter,
      $('<br/>'),
      $('<span>').append(letters)
    )
  } else {
    allLettersWeNeed.add(chain);
    return $('<span>').text(chain)
  }
}
function searchOccurenceInBdd(letter) {
  if (bdd.hasOwnProperty(letter)) {
    const tempChain = bdd[letter]
      .split(";")
      .map(letterToSearch => searchOccurenceInBdd(letterToSearch));
    return {
      letter,
      tempChain
    };
  } else return letter;
}
