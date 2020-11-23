<template>
    <div id="mySidepanel" class="sidepanel">
        <div id="togglebtn" @click="toggleNav()">&#8250;</div>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
    </div>
</template>

<style lang="scss">
    .sidepanel {
        height: 100%; 
        width: 0; 
        position: fixed; 
        z-index: 1; 
        top: 3rem;
        left: 0;
        background-color: #111; 
        overflow-x: hidden; 
        padding-top: 20px; 
        transition-duration: 0.5s;
        transition-delay: 0s;
        transition-timing-function: linear;

        a {
            padding: 8px 8px 8px 32px;
            text-decoration: none;
            font-size: 25px;
            color: #818181;
            display: block;
            transition: 0.3s;

            &:hover {
                color: #f1f1f1;
            }
        }
    }

    #togglebtn {
        position: fixed; 
        z-index: 2; 
        top: 3rem;
        
        display: inline-block;
        vertical-align: middle;

        left: 0px;
        font-size: 36px;
        width: initial;
        padding: 0rem 0.6rem 0.4rem 0.8rem;
        text-align: center;
        transition-duration: 0.5s;
        transition-delay: 0s;
        transition-timing-function: linear;

        cursor: pointer;
        background-color: #111;
        color: white;
        border: none;

        &:hover {
            background-color: #444;
        }
    }
</style>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class SidePanel extends Vue {
        private sideStatusOpen = false;

        toggleNav() {
            const sidePanelElement = document.getElementById("mySidepanel") as HTMLElement;
            const buttonElement = document.getElementById("togglebtn") as HTMLElement;

            if (!this.sideStatusOpen)
            {
                buttonElement.style.left = "250px";
                sidePanelElement.style.width = "250px";
                buttonElement.innerHTML = "&#8249;";
            }
            else
            {
                buttonElement.style.left = "0px";
                sidePanelElement.style.width = "0px";
                buttonElement.innerHTML = "&#8250;";
            }
            this.sideStatusOpen = !this.sideStatusOpen;
        }
    }
</script>