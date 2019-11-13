<template>

    <div class="clock-container">
        <div class="clock-header"> La subasta termina en: </div>

        <div class="clock">

            <div class="clock-block">
                <transition name="digit-fade" mode="out-in">
                    <p :class="{'clock-digits': true, redtext: redText}" :key="hours">{{hours | doubledigit | positive}}</p>
                </transition>
                <p class="clock-text">Hrs</p>
            </div>

            <div class="clock-block">
                <transition name="digit-fade" mode="out-in">
                    <p :class="{'clock-digits': true, redtext: redText}" :key="minutes">{{minutes |doubledigit | positive}}</p>
                </transition>
                <p class="clock-text">Min</p>
            </div>

            <div class="clock-block">
                <transition name="digit-fade" mode="out-in">
                    <p :class="{'clock-digits': true, redtext: redText}" :key="seconds">{{seconds | doubledigit | positive}}</p>
                </transition>
                <p class="clock-text">Seg</p>
            </div>

        </div>
        
    </div>

</template>

<script> 
    export default {
        name: 'Countdown',

        props: {
            deadline: {
                type: String,
                default: '2018-02-22T20:00:00Z',
                required: true
            }
        },

        data() {
          return {
            date: Math.trunc((new Date(this.deadline)).getTime() / 1000),
            now: Math.trunc((new Date()).getTime() / 1000),
            redText: false
          }
          
        },

        created () {
            var interval;
            var interval = setInterval(setdate,1000);
            
            var vueVars = this;

            function setdate(){

                if (vueVars.now - vueVars.date < 0){
                    vueVars.now = Math.trunc((new Date()).getTime() / 1000);
                }    
                else {
                    vueVars.now = vueVars.date;
                    clearInterval(interval);      
                    return;
                }
            }
        },

        computed: {

            seconds: function() {
                return (this.date - this.now) % 60;
            },
            minutes: {
                get: function() {
                    if (this.hours2 <= 0.5) {
                        this.redText = true;
                    };
                    return Math.trunc((this.date - this.now) / 60) % 60;
                },
                set: function(newValue) {
                    if (this.hours2 <= 0.5) {
                        this.redText = true;
                    };
                }
            },
            hours: function() {
                return Math.trunc((this.date - this.now) / 60 / 60) % 24;
            },
            days: function() {
                return Math.trunc((this.date - this.now) / 60 / 60 / 24);
            },
            hours2: function() {
                return ((this.date - this.now) / 60 / 60) % 24;
            }
        },

        watch: {
        },

        filters: {
            doubledigit: function (value) {
                if(value.toString().length <= 1) {
                    return "0"+value.toString();
                }
                return value.toString();
            },
            positive: function (value) {
                if(value <= 0) {
                    return "00";
                }
                return value.toString();
            }
        },

        components: {},


    }

</script>

<style>

</style>