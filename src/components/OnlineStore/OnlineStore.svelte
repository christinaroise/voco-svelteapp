<script>
    import {db, storage} from '../../firebase.js';
    

    let products = []

    const archive = db.collection("products");

    var unsubscribe = archive.onSnapshot(snap => {
        products = snap.docs
        unsubscribe();
    })


    const orderProducts = (category) => {
        var tempArray = []
        products = []

        archive.where("category", "==", category).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                tempArray.push(doc);
                console.log(doc.id, " => ", doc.data());
            });
            products = tempArray
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });

    }
</script>

<article>
    <nav>
        <button on:click={event => orderProducts("Living room")}>Living Room</button>
        <button on:click={event => orderProducts("Dining room")}>Dining Room</button>
        <button on:click={event => orderProducts("Bedroom")}>Bedroom</button>
    </nav>
 
    <section>
        {#each products as product}
            <div>
                <div class="productCard">
                    <div>
                        <img src={product.data().path} alt="">
                    </div>
                    <div class="newProductInfo">
                        <h3>{product.data().name}</h3>
                        <p>{product.data().category}<br>
                            {product.data().type}<br>
                            {product.data().price}€</p>
                    </div>
                </div>
            </div>
        {:else}
            <p>Loading catalogue...</p>
        {/each}
    </section>
</article>

<style>
    article{
        width: 95%;
        height: 95%;
        display: inline-block;
        text-align: center;
        justify-content: center;
        align-items: center;
    }
    nav{
        width: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
    }
    button{
        display: block;
        background-color: #F8F8F8;
        padding: 1rem;
        margin-right: 1rem;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: 300;
        border: none;
        outline: none;
    }
    button:hover{
        background-color: #F5E8DF;
        outline: none;
    }
    button:active{
        background-color: #F5E8DF;
        outline: none;
    }

       section {
        width: 100%;
        height: 95%;
        border: 3px solid #F5E8DF;
        overflow: scroll;
        background-color: white; 
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 0.25rem;
    }

    .productCard{
        height: 22rem;
        border: 3px solid #F5E8DF;
        background-color: #F5F5F5; 
        display: grid;
        margin: 0.5rem;
        padding: 1rem;
        justify-content: center;
        align-items: center;  
        text-align: center;
    }

    .productCard div:first-child{
        padding: 2rem;
        width: 15rem;
        display: grid;
        justify-content: center;
        align-items: center;  
        text-align: center;
    }
    .productCard img{
        width: 15rem;
        text-align: center;
    }

    .newProductInfo{
        text-align: left;
    }

    h3{
        font-weight: 300;
        letter-spacing: 0.2rem;
        line-height: 0;
        text-transform: uppercase;
    }

     @media(max-width: 600px){
        section{
            display: inline-block;
            justify-content: center;
            align-items: center;
            margin: 0;
            height: 100vh;
            width: 100vw;
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
    }
</style>