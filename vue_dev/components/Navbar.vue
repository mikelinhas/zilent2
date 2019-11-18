<template>
    <div class="navbar navbar-fixed-top" role="navigation">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#links">
            <i class="fa fa-bars fa-lg"></i>
          </button>
          <a class="navbar-brand" href="">
            <img :src="logo">
          </a>
          <p class="pull-right user">{{user}}</p>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse pull-right" id="links">
          <ul class="nav navbar-nav">
            <li v-for="url in urls" v-bind:class="{strong: url.active}">
              <a :href="url.link">{{url.name}}</a> 
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
            logo: {
                type: String
            },
            activeurl: {
                type: [String, Array],
                default: '/',
            }
        },

        data() {
          return {
            urls: [
              {'name':'Catálogo', 'link':'https://fundacionlivingstone.org/wp-content/uploads/2019/11/cata%C4%9Blogo-subasta-2019.pdf'},
              {'name':'Fundación Livingstone', 'link':'https://fundacionlivingstone.org', 'active':0},
              {'name':'Logout', 'link':'/logout'}
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
  margin-left: 20px;
}

.strong {
    font-weight: bold;
}

</style>