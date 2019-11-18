<template>

    <div v-bind:class="{shadow : bidding}">

        <Photo :imageName="info.image" v-if="photoState == 'show'"></Photo>

        <div class="item-info-wrapper">
            <button type="button"
                    v-if="!info.favorite" 
                    class="btn btn-custom btn-favorite"
                    @click="addFavorite(info._id)">
                    <i class="fa fa-heart-o fa-mid fa-red"></i>
            </button>
            <button type="button"
                    v-if="info.favorite" 
                    class="btn btn-custom btn-favorite"
                    @click="removeFavorite(info._id)">
                    <i class="fa fa-heart fa-mid fa-red"></i>
            </button>
            <h4 class="item-artist"> {{info.artist}} </h4>
            <h3 class="item-name"> {{info.name}} </h3>
            <transition name="green-in" mode="out-in">
                <div class="item-topbid" :key="info.bids[0].amount">
                    <strong>{{info.bids[0].amount}}€</strong> {{info.bids[0].bidder}}
                </div>
            </transition>

            <button type="button"
                    v-if="!bidding" 
                    class="btn btn-custom btn-place-bid"
                    @click="bidding = true">
                    <i class="fa fa-gavel fa-2x"></i>
            </button>

            <button type="button"
                    v-if="bidding" 
                    class="btn btn-custom btn-place-bid"
                    @click="bidding = false">
                    <i class="fa fa-times fa-2x"></i>
            </button>

            <transition name="digit-fade">
                <Bid name="html" 
                     v-if="bidding" 
                     :current.sync="info.bids[0]" 
                     :name="info.name" 
                     :id="info._id"
                     :bidding.sync="bidding">
                </Bid>
            </transition>
        </div>

    </div>

</template>

<script> 
    import axios from 'axios'
    import Photo from './Photo.vue'
    import Bid from './Bid.vue'

    export default {
        name: 'Item',

        props: {
            info: {
                type: Object,
                required: true
            },
            photoState: {
                type: String,
                required: false,
                default: "show"
            }
        },

        data() {
          return {
            bidding: false
          }
          
        },

        components: {Photo,Bid},

		methods: {
            addFavorite: function(item_id) {
                let vueVars = this
                axios.post('/db/addFavorite', {
                    item: item_id
                  })
                  .then(function (response) {
                    vueVars.info.favorite = true
                    //vueVars.$emit('update:bidding', false);
                  })
                  .catch(function (error) {
                    vueVars.message = error.response.data.message;
                  });
            },

            removeFavorite: function(item_id) {
                let vueVars = this
                axios.post('/db/removeFavorite', {
                    item: item_id
                  })
                  .then(function (response) {
                    vueVars.info.favorite = false
                    //vueVars.$emit('update:bidding', false);
                  })
                  .catch(function (error) {
                    vueVars.message = error.response.data.message;
                  });
            },

            placeBid: function() {
                this.bidding = true;
            }
		},

        computed: {
            link: function() {
                return "/auction/" + this.info._id
            }
        }

    }

</script>

<style>

</style>