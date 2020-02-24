<script>
    export let title = ""
</script>

<button>{title}</button>

<style>
    button{
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
    button:hover{
        font-size: 0.8rem;
    }
    button:focus{
        border: none;
        outline: none;
        font-size: 0.7rem;
    }
</style>