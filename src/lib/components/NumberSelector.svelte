<script lang="ts">
    export let value: number;
    export let min: number = 0;
    export let max: number = 999;

    function decrement() {
        if (value > min) {
            value--;
        }
    }

    function increment() {
        if (value < max) {
            value++;
        }
    }
</script>

<div class="flex flex-row w-fit rounded border">
    <button class="p-4 border-r hover:bg-slate-100 active:bg-slate-200" on:click={() => decrement()}>-</button>
    <div class="min-w-fit w-16 p-4 text-center">{value}</div>
    <button class="p-4 border-l hover:bg-slate-100 active:bg-slate-200" on:click={() => increment()}>+</button>
</div>
