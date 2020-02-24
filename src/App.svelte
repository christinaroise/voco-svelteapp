<script>
	import OnlineStore from './components/OnlineStore/OnlineStore.svelte'
	import Admin from './Admin.svelte';

	let adminPNG = 'img/001-user.png'
	let cartPNG = 'img/002-shopping-cart.png'

	let store = true

    const toggleMenu = () => {
		store = !store; 
	}

</script>

<svelte:head>
	<title>Voco-SvelteApp</title>
</svelte:head>

	<header>
		<nav>
			<div class="emptyDiv">
			</div>
			<div class="logoLink">
				<button on:click={toggleMenu} href='.'>VOCO</button>
				<p>Under Production</p>
			</div>

			<div class="navLinks">
				<button on:click={toggleMenu} href="admin">
					<img src={adminPNG} alt="admin icon">
				</button>	
			</div>
		</nav>
	</header>


	<section>
		{#if store}
		<OnlineStore />
		{:else}
		<Admin /> 
		{/if}
	</section>


<style>
	nav{
		width: 100vw;
		padding: 1rem 0rem;
		display: flex;
		background-color: #F8F8F8;
		text-transform: uppercase;
		font-size: 1rem;
		text-align: center;
		line-height: 1;
		font-family: 'Montserrat', sans-serif;
		color: rgba(123, 123, 123, 1);
		border-bottom: 2px solid #F5E8DF;
	}

	.emptyDiv{
		flex: 1;
	}

	.logoLink{
		flex: 4;
		display: grid;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.navLinks{
		flex: 1;
	}

	button{
        text-decoration: none;
		color: rgba(123, 123, 123, 1);  
		background-color: transparent;
		border: none;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 1rem;
		font-family: 'Montserrat', sans-serif;
		outline: none;
	}

	button:hover{
		outline: none;	
	}

	button:active{
		outline: none;
	}

	nav div{
		width: 20em;
		margin-left: auto;
		margin-right: auto;
	}

	.logoLink button{
		font-size: 2rem;
		letter-spacing: 1rem;
		font-weight: 300;
		line-height: 1;
		outline: none;
		padding: 0 0 0 0.5rem;
	}

	section{
		width: 100%;
		height: 85%;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		background-color: #F8F8F8;
	}

	.navLinks button{
		float: center;
		width: 2rem;
	}

	.navLinks img{
		width: 2rem;
	}

	.navLinks button:hover{
		background-color: #F8F8F8;	
	}

	.navLinks button:active{
		background-color: #F8F8F8;	
	}

	@media(max-width: 600px) {
		nav{
			margin-bottom: 5rem;
		}
    }
</style>