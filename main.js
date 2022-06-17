const getPokemon = async () => {
    const all_pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    let all_pokemon_length = all_pokemon.data.results.length
    const pokemon = all_pokemon.data.results[rand_num(all_pokemon_length)]

    const this_pokemon = await axios.get(pokemon.url)

    let starter_pokemon_name = this_pokemon.data.species.name
    let starter_pokemon_sprite = this_pokemon.data.sprites.front_default

    add_card_content(starter_pokemon_name, starter_pokemon_sprite, 0)

    let starter_pokemon_types = this_pokemon.data.types

    console.log(this_pokemon)

    type1_obj = await axios.get(starter_pokemon_types[0].type.url)
    let types_list = type1_obj.data.pokemon
    
    if (starter_pokemon_types[1]) {
        type2_obj = await axios.get(starter_pokemon_types[1].type.url)
        types_list = types_list.concat(type2_obj.data.pokemon)
    }

    for (let i = 1; i <= 5; i++) {
        const random_pokemon = types_list[rand_num(types_list.length)]
        const this_pokemon = await axios.get(random_pokemon.pokemon.url)
        let name = this_pokemon.data.species.name
        let sprite = this_pokemon.data.sprites.front_default

        add_card_content(name, sprite, i)
    }
}

const rand_num = (num) => {
    choice = Math.floor(Math.random() * num)
    return choice
}

function add_card_content(pokemon_name, sprite_url, i) {
    var this_card = document.getElementById(`poke${i}`);

    var img = this_card.firstElementChild;
    var h5 = this_card.lastElementChild;

    img.src = sprite_url
    h5.innerHTML = pokemon_name
}