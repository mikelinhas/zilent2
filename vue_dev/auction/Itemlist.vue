<template>

    <div>

        <h1> Favoritos </h1>
        <div style="width: 100%">
            <p>Todavía no tiene favoritos, añadalos usando el icono corasao</p>
        </div>
        <masonry class="item-list-container"> 
        </masonry>

        <br>

        <h1> Artículos subastados</h1>
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
          }        
        },

        props: {
            user: {
                type: String,
                required: true
            }
        },
        components: {Item},

		methods: {

            queryItems: function() {
                var vueVars = this;
                var url = 'db/queryItems';

                axios.get(url)
                    .then (function (response) {
                        vueVars.items = response.data;
                    })
                    .catch(function (error) {
                        vueVars.errorMessage = "There has been an Error! Oh no.."
                        console.log(error);
                    })
            },

            refreshPage: function() {
                var vueVars = this;
                setInterval(function() {vueVars.queryItems();}, 10000);
            }

        },

        watch: {
            search: function() {
                this.filterItems()
            }
        },

        mounted() {
            this.refreshPage();
        },

        beforeMount() {
            this.queryItems()
        }

    }

</script>

<style>

</style>