window.addEventListener('load', () =>
{
    const vm = new Vue({
        el: '#app',
        data: {

            header : 'Poke Api, desarrollado por Jorge Iván Serrano Hernández. 21/06/2022',
            i : 1
        },

        created: function()
        {
            this.getData()
        },

        methods:{

            getData(){
                fetch('https://pokeapi.co/api/v2/pokemon')
                .then(response => response.json())
                .then(response => {

                    this.createPokemonData(response.results)
                })
            },
            
            createPokemonData(listOfPokemons){

                this.i = 1;

                for(let pokemon of listOfPokemons){
                    
                    console.log(this.i)

                    fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokeDetails => {

                        console.log(this.i)
                        this.showPokemon(pokemon.name, pokeDetails, this.i)
                        
                        this.i++
                  
                    })
                }
            },
            
            showPokemon(name, url, i){
                    
                console.log('Dentro de display ' + this.i)
                let ulItem = document.createElement("ul");
                ulItem.classList.add("nes-lists")

                let imgItem = document.createElement("img");
                imgItem.src = 'https:raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + this.i + '.png';
                imgItem.width = "320";
                imgItem.height = "320";
                ulItem.append(imgItem);

                let listItem = document.createElement("h1");
                listItem.append( name);
                ulItem.append(listItem);
        
                for(let move of url.moves){
                    let listItemForURL = document.createElement("li");
                    listItemForURL.append( move.move.name)
        
                    ulItem.append(listItemForURL)
                }
    
                let divItem = document.createElement("div");
                divItem.classList.add("pokemon-card-item");
                divItem.append(ulItem);
        
                document.querySelector('.pokeList').append(divItem);
            }
        }
    })
})