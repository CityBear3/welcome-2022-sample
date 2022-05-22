class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.types[0].type.name;
    this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
  }
}

const getData = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const response = await fetch(url);
  if (!response.ok) {
    location.assign("./404.html");
    return;
  }
  console.log("finish get data.");
  showPokemon(new Pokemon(await response.json()));
};

const showPokemon = (pokemon) => {
  const pokeContainer = document.getElementById("poke_container");
  const pokeElement = document.createElement("div");
  console.log(pokemon.img);
  const pokeInnerHtml = `
    <a href="https://zukan.pokemon.co.jp/detail/${pokemon.id}">
      <img src=${pokemon.img} >
    </a>
    <ul>
      <li>ID: No.${pokemon.id}</li>
      <li>Name: ${pokemon.name}</li>
      <li>Type: ${pokemon.type}</li>
    </li>`;
  pokeElement.innerHTML = pokeInnerHtml;
  pokeContainer.appendChild(pokeElement);
};

window.addEventListener("DOMContentLoaded", function () {
  const url = document.location.search;
  const params = new URLSearchParams(url);
  getData(params.get("name"));
});
