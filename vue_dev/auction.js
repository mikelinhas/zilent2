import Vue from 'vue'

import Navbar from './components/Navbar.vue'
import Countdown from './components/Countdown.vue'
import Itemlist from './auction/Itemlist.vue'
import Liteitemlist from './auction/Liteitemlist.vue'
import VueMasonry from 'vue-masonry-css'

Vue.use(VueMasonry)

new Vue({
	el: '#app',
	components: {Navbar, Itemlist, Liteitemlist, Countdown},
	data() {
	    return {
	    }
	}
})