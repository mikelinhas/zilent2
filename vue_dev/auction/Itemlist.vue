<template>

    <div>

        <h1> Favoritos </h1>
        <div style="width: 100%">
            <p>Añádalos usando el icono <i class="fa fa-heart fa-mid fa-red"></i></p>
        </div>
        <masonry :cols="{default: 4, 1000: 4, 700: 3, 500: 2}"
                 :gutter="5"
                 class="item-list-container">

            <div v-for="item in favorite_items" class="item-block">
                <Item :info="item" :photoState="photoState"></Item>
            </div>
        </masonry>            



        <h1 style="margin-top: 40px"> Artículos subastados</h1>
    	<masonry :cols="{default: 4, 1000: 4, 700: 3, 500: 2}"
                 :gutter="5"
                 class="item-list-container">

            <div v-for="item in items" class="item-block">
                <Item :info="item" :photoState="photoState"></Item>
            </div>
	   </masonry>
        
    </div>

</template>

<script> 
	import axios from 'axios'
    import Item from './Item.vue'



    export default {
        name: 'Itemlist',

        data() {
          return {
            reloaded: true,
            items: [],
            favorite_items: []
          }        
        },

        props: {
            user: {
                type: String,
                required: true
            },
            favorites: {
                type: Array           
            }
        },
        components: {Item},

        beforeMount() {
            this.queryFavorites()
        },

        methods: {

            queryFavorites: function() {
                var vueVars = this;
                var url = 'db/queryFavorites';
                axios.get(url)
                    .then (function (response) {
                        vueVars.favorites = response.data.favorites;
                        vueVars.queryItems();
                    })
                    .catch(function (error) {
                        vueVars.errorMessage = "There has been an Error! Oh no.."
                        console.log(error);
                    })
            },            

            queryItems: function() {
                var vueVars = this;
                var url = 'db/queryItems';
                axios.get(url)
                    .then (function (response) {
                        vueVars.items = response.data;
                        vueVars.favorite_items = []
                        vueVars.items.forEach(function(item){
                            vueVars.$set(item, "favorite", 0)
                            vueVars.favorites.forEach(function(favorite){
                                if (favorite == item._id) {
                                    item.favorite=1
                                    vueVars.favorite_items.push(item)
                                }
                            })
                        })
                    })
                    .catch(function (error) {
                        vueVars.errorMessage = "There has been an Error! Oh no.."
                        console.log(error);
                    })
            },

            refreshPage: function() {
                var vueVars = this;
                setInterval(function() {vueVars.queryFavorites();}, 10000);
            }

        },

        watch: {
            search: function() {
                this.filterItems()
            }
        },

        mounted() {
            this.refreshPage();
        }


    }

</script>

<style>

</style>
