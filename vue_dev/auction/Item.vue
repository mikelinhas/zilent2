<template>

    <div v-bind:class="{shadow : bidding}">

        <Photo :imageName="info.image" v-if="photoState == 'show'"></Photo>

        <div class="item-info-wrapper">
            <button type="button"
                    v-if="!favorite" 
                    class="btn btn-custom btn-favorite"
                    @click="favorite = true">
                    <i class="fa fa-heart-o fa-mid fa-red"></i>
            </button>
            <button type="button"
                    v-if="favorite" 
                    class="btn btn-custom btn-favorite"
                    @click="favorite = false">
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
            bidding: false,
            favorite: false
          }
          
        },

        components: {Photo,Bid},

		methods: {
            placeBid: function() {
                this.bidding = true;
            },
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