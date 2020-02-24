<script>
    import {db, storage} from '../../firebase.js';
    import Button from '../PrimaryButton.svelte';

    export {Button}

    let products = []
    const archive = db.collection("products");

    archive.onSnapshot(snap => {
        products = snap.docs
    })

    let name = ""
    let category = ""
    let price = ""
    let type = ""
    let discount = ""
    let url = ""
    let files = [];
    $:file = files [0];


    const uploadImage = async () => {
        const path = storage
            .ref()
            .child("productImages/" + file.name)

        const upload = await path.put(file)
        const imageUrl = await upload.ref.getDownloadURL()
        url = imageUrl
    }

    const addProductToDb = async () => {
        const newProduct = await archive.add({
            path: url,
            name: name,
            category: category,
            type: type,
            price: price,
            discount: discount,
            timestamp: new Date().getTime().toString()
        })
    }

    const addProduct = async () => {
        await uploadImage();
        await addProductToDb();
    }

</script>


<div class="addProductContainer">
        <h2>Add product to catalogue</h2>
        <form class="addProductForm" on:submit|preventDefault={addProduct}>
            <input type="file" bind:files>
            <input placeholder="Name of product" bind:value={name}>
            <input list="categoryList" placeholder="Category" bind:value={category}>
                <datalist id="categoryList">
                    <option value="Bedroom">
                    <option value="Dining room">
                    <option value="Living room">
                </datalist>
            <input placeholder="Type of product" bind:value={type}>
            <input placeholder="Price of product" bind:value={price}>
            <input placeholder="Current discount" bind:value={discount}>
            <div><Button title="Add product"/></div>
        </form>
</div>   


<style>
    .addProductContainer{
        flex: 1;
        margin: auto;
    }

    .addProductContainer h2{
        font-weight: 300;
        text-align: center;
	}

    .addProductForm{
        display: grid;
        grid-template-columns: repeat(2, 15rem);
        grid-auto-rows: repeat(3, 1fr);
        gap: 0.5rem;
        align-content: center;
    }

    .addProductForm input{
        padding: 0.8rem;
        border: 2px solid #F5E8DF;
        text-transform: uppercase;
        text-align: center;
        outline: none;
    }

    .addProductForm input:first-child{
        background-color: white;
    }

    .addProductForm div{
        grid-column: 1/3;
        justify-content: center;
        display: flex;
        padding: 1rem;
    }

    @media(max-width: 600px){
        .addProductForm{
            display: inline-block;
        }

        .addProductForm input{
            width: 18rem;
        }
    }
</style>

