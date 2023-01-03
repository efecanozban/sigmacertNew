<script>
	import Page from './adminPanel/+page.svelte';
    import {panelName} from '$lib/store.js'
    import './global.css'

</script>


<header>
    <div class="header">
        <button id= "exitButton" onclick = "location.href = '/'">Çıkış Yap</button>
        <h1>SİGMACERT</h1>
        <h2>{$panelName}</h2>
    </div>
</header>

<main>
    <slot></slot>
</main>


<style>
    .header{
        position: absolute;
        width: 100%;
        height: 80px;

        display: grid;
        grid-template-columns: 20% 50% 30%;
        grid-template-rows: 100%;

        background-color: rgb(255,255,255);
        background-image: url('$lib/sigmacertlogo.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    main{
        margin-top: 0px;
        padding-top: 80px;
    }
    
    #exitButton{
        height: 30%;
        width: 50%;
        margin: auto;
        margin-left: 8%;
    }

    h1{
         color: rgb(212, 4, 4);
    }

    h2{
        color: rgb(212, 4, 4);
    }

</style>