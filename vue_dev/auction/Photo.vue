<template>

    <div>
        <div class="item-photo">
            <img :src="imagePath">
        </div>
    </div>

</template>

<script> 
	import axios from 'axios'

    export default {
        name: 'Photo',

        props: {
            imageName: {
                type: String,
                default: '0',
                required: true
            }
        },

        data() {
          return {
          }
          
        },

        computed: {
            imagePath: function() {
                return 'photos/' + this.imageName + '.jpg'
            }
        },

        components: {},

		methods: {
		}

    }

</script>

<style>

</style>