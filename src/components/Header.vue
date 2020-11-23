<template>
    <div id="header">
        <nav class="navbar navbar-light bg-dark navbar-expand">
            <div class="navbar-brand">
                <a @click.prevent="goHome()" href="/">
                    <img src="../assets/logo.png">
                </a>
            </div>
            
            <ul class="navbar-nav">
                <li class="navbar-text">
                    <b>Proyecto 01</b>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style lang="scss">
    .navbar{
        height: 3rem;

        .navbar-brand {
            height: 99%;
            padding: 0;

            a{
                height: inherit;

                img{
                    height: inherit;
                    width: auto;
                    vertical-align: center;
                }
            }
        }
    }

    .navbar-light .navbar-text {
        color: white !important;

        &:first-child {
            padding-right: 1.5rem;
        }
    }
</style>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    
    @Component
    export default class Header extends Vue {

        get route(){
            return this.$route.name;
        }

        public goHome(): void{
            this.$router.push({name:'Home'});
        }
    }
</script>