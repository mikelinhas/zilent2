<template>

    <div class="bidding-inputs">
        <div clasS="input-group">
            <input type="number" class="form-control" 
                   placeholder="€" 
                   v-model="bid.amount"> 
            <span class="input-group-btn">
                <button type="button"
                        v-if="!placingBid"
                        class="btn btn-success btn-input"
                        v-on:click="placeBid"> Pujar!
                </button>
                <button type="button"
                        v-if="placingBid"
                        class="btn btn-default btn-input"
                        > Pujar!
                </button>
            </span>
        </div>
        <p> {{message}} </p>     

    </div>

</template>

<script> 
	import axios from 'axios'

    export default {
        name: 'Bid',

        props: {
            current: {
                type: Object,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            bidding: {
                type: Boolean,
                required: true
            }
        },

        data() {
            return {
               bid: {},
               message: "",
               placingBid: false
            }
        },

        computed: {
        },

        components: {},

        methods: {

            cancelBid: function () {
                this.$emit('update:bidding', false);
            },
            
            placeBid: function () {
                
                this.message = ""
                this.placingBid = true
                var vueVars = this;
                var date = new Date();

                axios.post('/db/addBid', {
                    id: vueVars.id,
                    name: vueVars.name,
                    amount: vueVars.bid.amount,
                    date: date
                  })
                  .then(function (response) {
                    vueVars.$emit('update:current', response.data);
                    vueVars.$emit('update:bidding', false);
                    vueVars.placingBid = false;
                  })
                  .catch(function (error) {
                    vueVars.message = error.response.data.message;
                    vueVars.placingBid = false;
                    if (error.response.data.type == 4) {
                        vueVars.$emit('update:current', error.response.data.currentBid)
                    };
                  });
            }
    	},

        beforeMount() {
            this.money = this.current + 20;
        }

    }

</script>

<style>

</style>