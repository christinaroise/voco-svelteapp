<script>
    import {db, storage} from '../../firebase.js';

    let editPNG = 'img/003-pencil.png';

    let visible = false

    let editName = false
    let editCat = false
    let editType = false
    let editPrice = false
    let editDiscount = false
    let confirmDelete = false


    let products = []

    let currentSelected
    let currentSelectedId = ""
    let currentSelectedPath = ""
    let currentSelectedName = ""
    let currentSelectedCategory = ""
    let currentSelectedType = ""
    let currentSelectedPrice = ""
    let currentSelectedDiscount = ""
    
    const archive = db.collection("products");

    archive.onSnapshot(snap => {
        var firebaseDocs = snap.docs
        var tempList = []
        for(var i = 0; i < firebaseDocs.length; i++){
            var product = {
                id: firebaseDocs[i].id,
                path: firebaseDocs[i].data().path,
                name: firebaseDocs[i].data().name,
                category: firebaseDocs[i].data().category,
                type: firebaseDocs[i].data().type,
                price: firebaseDocs[i].data().price,
                discount: firebaseDocs[i].data().discount
            }
            tempList.push(product);
        }
        products = tempList;
    })

    function enterCard (product) {
        visible = !visible
        currentSelectedId = product.id
        currentSelectedPath = product.path
        currentSelectedName = product.name
        currentSelectedCategory = product.category
        currentSelectedType = product.type
        currentSelectedPrice = product.price
        currentSelectedDiscount = product.discount
    }

    const exitCard = () => {
        visible = !visible;
        editName = false
        editCat = false
        editType = false
        editPrice = false
        editDiscount = false
    }
    const editInfo = (field) => {
        switch(field){
            case "name":
                editName = !editName
            break;
            case "category":
                editCat = !editCat
            break;
            case "type":
                editType = !editType
            break;
            case "price":
                editPrice = !editPrice
            break;
            case "discount":
                editDiscount = !editDiscount
            break;
        }
    }

    const updateInfo = () => {
        const product = archive.doc(currentSelectedId)
        product.update({
            name: currentSelectedName,
            category: currentSelectedCategory,
            type: currentSelectedType,
            price: currentSelectedPrice,
            discount: currentSelectedDiscount
        }).then((result) => {
            exitCard();
        });
    }

    const confirmDeleteCard = (product) => {
        confirmDelete = !confirmDelete
  
        currentSelectedId = product.id
        currentSelectedPath = product.path
        currentSelectedName = product.name
        currentSelectedCategory = product.category
        currentSelectedType = product.type
        currentSelectedPrice = product.price
        currentSelectedDiscount = product.discount
    }

    const deleteCard = () => {
        const product = archive.doc(currentSelectedId)
        product.delete().then((result) => {
            confirmDelete = !confirmDelete
        });
    }
</script>
 
<section class="productContainer">
     {#if visible}
        <section class="editProductCardContainer">
            <article class="editProductCard">
                <h3>Edit product information</h3>
                <aside>
                    <button on:click={exitCard}>Exit</button>
                </aside>
                <div class="editCard">
                    <div class="editCardImgContainer">
                        <img src={currentSelectedPath} alt="">
                        <button>
                        	<img src={editPNG} alt="edit icon">
                        </button>
                    </div>
                    <section class="editInfo">
                        {#if editName}
                            <div>
                                <input bind:value={currentSelectedName} placeholder={currentSelectedName}/>
                                <button on:click={event => editInfo("name")}>x</button>
                            </div>
                        {:else}
                            <div>
                                <h3>{currentSelectedName}</h3>
                                <button on:click={event => editInfo("name")}>
                                    <img src={editPNG} alt="edit icon">   
                                </button>
                            </div>
                        {/if}

                        {#if editCat}
                            <div>
                                <input bind:value={currentSelectedCategory} placeholder={currentSelectedCategory}/>
                                <button on:click={event => editInfo("category")}>x</button>
                            </div>
                        {:else}
                            <div>
                                <p>{currentSelectedCategory}</p>
                                <button on:click={event => editInfo("category")}>
                                    <img src={editPNG} alt="edit icon">
                                </button>
                            </div>
                        {/if}

                        {#if editType}
                            <div>
                                <input bind:value={currentSelectedType} placeholder={currentSelectedType}/>
                                <button on:click={event => editInfo("type")}>x</button>
                            </div>
                        {:else}
                            <div>
                                <p>{currentSelectedType}</p>
                                <button on:click={event => editInfo("type")}>
                                    <img src={editPNG} alt="edit icon">
                                </button>
                            </div>
                        {/if}

                        {#if editPrice}
                            <div>
                                <input bind:value={currentSelectedPrice} placeholder={currentSelectedPrice}/>
                                <button on:click={event => editInfo("price")}>x</button>
                            </div>
                        {:else}
                            <div>
                                <p>{currentSelectedPrice}€</p>
                                <button on:click={event => editInfo("price")}>
                                    <img src={editPNG} alt="edit icon">
                                </button>
                            </div>
                        {/if}

                        {#if editDiscount}
                            <div>
                                <input bind:value={currentSelectedDiscount} placeholder={currentSelectedDiscount}/>
                                <button on:click={event => editInfo("discount")}>x</button>
                            </div>
                        {:else}
                            <div>
                                <p>{currentSelectedDiscount}% discount</p>
                                <button on:click={event => editInfo("discount")}>
                                    <img src={editPNG} alt="edit icon">
                                </button>
                            </div>
                        {/if}
                    </section>
                </div>
                <button on:click={updateInfo}>Save changes</button>  
            </article>
        </section>
    {/if}
    {#each products as product}
        <div>
            <div class="productCard">
                <div>
                    <img src={product.path} alt="">
                </div>
                <div class="newProductInfo">
                    <h3>{product.name}</h3>
                    <p>{product.category}<br>
                        {product.type}<br>
                        {product.price}€<br>
                        {product.discount}% discount</p>
                    <div>
                        <button on:click={event => enterCard(product)}>Edit</button>
                        <button on:click={event => confirmDeleteCard(product)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <p>Loading catalogue...</p>
    {/each}
    {#if confirmDelete}
        <div class="confirmDeleteCard">
            <section>
                <h3>Are you sure you want to delete this product?</h3>
                <div>
                    <button on:click={event => deleteCard()}>Yes</button>
                    <button on:click={event => confirmDeleteCard()}>No</button>
                </div>
            </section>
        </div>
    {/if}
</section>

<style>
    .productContainer {
        width: 95%;
        height: 100%;
        border: 3px solid #F5E8DF;
        overflow: scroll;
        background-color: #F5F5F5; 
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .productCard{
        display: flex;
        padding: 2rem 1rem;
    }

    .productCard div:first-child{
        border: 3px solid #F5E8DF;
        margin:  0 1rem 0 1rem;
        padding: 1rem;
        width: 13rem;
        display: grid;
        justify-content: center;
        align-items: center;  
        text-align: center;
    }
    .productCard img{
        width: 13rem;
        text-align: center;
    }

    .newProductInfo{
        text-align: left;
    }

    .newProductInfo div{
        display: flex;
    }

    h3{
        font-weight: 300;
        letter-spacing: 0.2rem;
        text-transform: uppercase;
    }

    button{
        padding: 0.4rem 0.8rem;
        display: inline-block;
        background: #F5E8DF;
        border: 1px solid #F5E8DF;
        text-align: center;
        text-transform: uppercase;
        margin: 0.2rem;
        font-weight: 400;
        letter-spacing: 1px;
        color: rgba(123, 123, 123, 1);
    }
    button:hover{
        font-size: 0.8rem;
    }
    button:focus{
        border: none;
        outline: none;
        font-size: 0.7rem;
    }

    .editProductCardContainer{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
    }

    .editProductCard{
        position: relative;
        width: 40vw;
        height: 45vh;
        padding: 2.5rem;
        border: 2px solid #F5E8DF;
        background-color: #F5F5F5; 
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .editProductCard aside{
        position: absolute;
        right: 1rem;
        top: 1rem;
    }

    .editProductCard button{
        padding: 0.8rem 1.2rem;
        display: inline-block;
        background: #F5E8DF;
        border: 1px solid #F5E8DF;
        text-align: center;
        text-transform: uppercase;

        font-weight: 400;
        letter-spacing: 2px;
        color: rgba(123, 123, 123, 1);
    }
    .editProductCard button:hover{
        font-size: 0.8rem;
    }
    .editProductCard button:focus{
        border: none;
        outline: none;
        font-size: 0.7rem;
    }

    .editCard{
        display: flex;
        padding: 1.5rem;
  
        align-items: center;  
    }

    .editCardImgContainer{
        border: 3px solid #F5E8DF;
        margin:  0rem 2rem 0rem 1rem;
        padding: 1rem;
        width: 15rem;
        display: grid;
        justify-content: center;
        align-items: center;  
        text-align: center;
        position: relative;
    }
    .editCard img{
        width: 13rem;
        text-align: center;
        padding: 1rem;
    }

    .editCardImgContainer button{
        position: absolute;
        top: 0;
        right: 0;
    }

    .editInfo{
        text-align: left;
        display: grid;
    }

    .editInfo div{
        display: flex;
        align-items: center;  
    }

    .editInfo p{
        margin: 0;
    }

    .editCard button{
        border-radius: 1rem;
        width: 1.5rem;
        padding: 0.25rem;
        margin: 0.5rem;
    }

    .editCard button img{
        padding: 0;
        width: 1rem;
        }


    .editInfo input{
        outline: none;
        height: 1.5rem;
        text-transform: uppercase;
        font-size: 1rem;
        font-family: 'Montserrat', sans-serif;
        letter-spacing: 0.2rem;
        background-color: #F8F8F8;
        border: 2px solid #F5E8DF;
    }  

    .confirmDeleteCard{
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center; 
    }

    .confirmDeleteCard section{
        width: 25rem;
        height: 8rem;
        padding: 2.5rem;
        border: 2px solid #F5E8DF;
        background-color: #F5F5F5; 
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .confirmDeleteCard div{
        display: flex;
        justify-content: center;
        align-items: center; 
    }


     @media(max-width: 600px){
        section{
            display: inline-block;
            justify-content: center;
            align-items: center;
            margin: 0;
            height: 80%;
            width: 90vw;
            border: 3px solid #F5E8DF;
            overflow: scroll;
            background-color: #F5F5F5; 
        }

        section div:first-child{
            display: inline-block;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            text-align: center;
            line-height: 1;
        }

        .productCard img{
            width: 20rem;
            flex: 1;
        }

        .newProductInfo{
            text-align: center;  
        }
    }
</style>

        