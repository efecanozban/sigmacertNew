<script>
    import Moodle from '$lib/moodle.svelte'

    export let showModal = false;
    const newGoursmeButtonClick = () => {
        showModal = !showModal;
    }
</script>


<div>
    <Moodle {showModal} on:click= {newGoursmeButtonClick}>
        <form id = "newUserForm">
            <p>Yeni Görüşme Kaydı Oluştur</p>
            <input type="text" placeholder="Görüşülen Firma"> <br>
            <select name=""></select><br>
            <select name=""></select><br>
            <input type="text" placeholder="Verilen Teklif"> <br>
            <p>dosya yükle</p>
            <input type="text" placeholder="Görüşülen Teklili"> <br>
            <input type="text" placeholder="Yetkili Telefon"> <br>
            <input type="text" placeholder="Yetkili E-mail"> <br>
            <input type="text" placeholder="Açıklamalar"> <br>
    
            <button>Kullanıcı Oluştur</button>
        </form>
    </Moodle>
</div>



<style>
    #newUserForm{
        position: relative;
        height: 60vh;
        top: 40%;
        transform: translateY(-50%);
        display: block;
        background-color: rgb(255, 255, 255);
        border-radius: 5%;
    }

    #newUserForm p{
        position: relative;
        top: 10px;
        text-align: center;
        font-size: 1.4em;
    }


    #newUserForm input{
        margin:10px 20px;
    }

    #newUserForm button{
        position:absolute;
        bottom: 20px;
        right: 30px;
    }
</style>