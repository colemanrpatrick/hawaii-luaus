var luaus = [];
fetch('./json/luaus.json')
.then(response => luaus = luaus.push(response.json()) );
console.log(luaus);
