var json = [];
fetch('./json/luaus.json')
.then(response => json = response.json());
console.log(json)
