<template>

    <div>

        <header class="bidding-headers-container">
            <input type="text" 
                   class="form-control bidding-search" 
                   placeholder="Buscar..." 
                   v-model="search"
            >
              
            <div>
                <button v-on:click="togglePhotos('show')" 
                        v-if="photoState == 'hide'" 
                        type="button" class="btn btn-custom">
                        <i class="fa fa-th fa-2x"></i>

                </button>

                <button v-on:click="togglePhotos('hide')" 
                        v-if="photoState == 'show'"
                        type="button" class="btn btn-custom">
                        <i class="fa fa-list fa-2x"></i>
                </button>

            </div>
        </header>

    	<masonry :cols="{default: 4, 1000: 4, 700: 3, 500: 2}"
                 :gutter="5"
                 class="item-list-container">

            <div v-for="item in filtereditems" class="item-block">
                <Item :info="item" :photoState="photoState"></Item>
            </div>

    	</masonry>
        
    </div>

</template>

<script> 
	import axios from 'axios'
    import Item from './Item.vue'



    export default {
        name: 'Liteitemlist',

        data() {
          return {
            reloaded: true,
            items: [],
            filtereditems: [],
            search:'',
            photoState: 'hide'
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
                        vueVars.filtereditems = response.data;
                        vueVars.filterItems();
                    })
                    .catch(function (error) {
                        vueVars.errorMessage = "There has been an Error! Oh no.."
                        console.log(error);
                    })
            },

            filterItems: function() {

                var vueVars = this;
                vueVars.filtereditems = [];
                var name = '';
                var artist = '';
                var match = this.search.toLowerCase();
                var l = vueVars.items.length - 1

                for (var i = 0; i <= l; i++) {

                    name = vueVars.items[i].name.toLowerCase();
                    artist = vueVars.items[i].artist.toLowerCase();

                    if (name.indexOf(match) != -1) {
                        vueVars.filtereditems.push(vueVars.items[i]);
                    } else if (artist.indexOf(match) != -1) {
                        vueVars.filtereditems.push(vueVars.items[i]);
                    }
                };
            },

            togglePhotos: function(str) {
                this.photoState = str;
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