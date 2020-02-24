<script>
    import Form from './components/adminCat/addProductsForm.svelte';
    import Catalogue from './components/adminCat/Archive.svelte';
</script>

<svelte:head>
	<title>Admin</title>
</svelte:head>

<section class="adminCatalogueContainer">
    <Form />
    <Catalogue />
</section>

<style>
    .adminCatalogueContainer{
        width: 100%;
        height: 85%;
        display: grid;
        grid-template-columns: 40rem 1fr;
        justify-content: center;
        align-items: center;
    }

    @media(max-width: 600px){
        .adminCatalogueContainer{
            top: 0;
            left: 0;
            width: 100%;
            height: 90%;
            display: inline-block;
            text-align: center;
            justify-content: center;
            align-items: center;
            background-color: #F8F8F8;
        }
    }
</style>