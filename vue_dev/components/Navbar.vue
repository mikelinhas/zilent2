<template>
    <div class="navbar navbar-fixed-top" role="navigation">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#links">
            <i class="fa fa-bars fa-lg"></i>
          </button>
          <a class="navbar-brand" href="">
            <img src="zebra.ico">
          </a>
          <p class="pull-right user">{{user}}</p>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse pull-right" id="links">
          <ul class="nav navbar-nav">
            <li v-for="url in urls" v-bind:class="{strong: url.active}">
              <a :href="url.link">{{url.name}} <img :src="url.logo"></a> 
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->

      </div>
    </div>
</template>

<script> 
    export default {
        name: 'navbar',

        props: {
            user: {
                type: String,
                default: 'Hello'
            },
            activeurl: {
                type: [String, Array],
                default: '/',
            }
        },

        data() {
          return {
            urls: [
              {'name':'Catálogo', 'link':'https://fundacionlivingstone.org/wp-content/uploads/2018/02/catalogo_subasta_8.pdf', 'logo':''},
              {'name':'Fundación Livingstone', 'link':'https://fundacionlivingstone.org', 'active':0, 'logo':'logo.ico'},
              {'name':'Logout', 'link':'/logout', 'logo':''}
            ],
          }
          
        },

        mounted() {
          this.checkActive()
        },

        methods: {
          checkActive() {
            for (var i = this.urls.length - 1; i >= 0; i--) {
              if (this.urls[i].link === this.activeurl) {
                this.urls[i].active = 1}
            }
          }

        }
    }

</script>

<style>

.user {
  margin-top: 13px;
  margin-right: 20px;
}

.strong {
    font-weight: bold;
}

</style>