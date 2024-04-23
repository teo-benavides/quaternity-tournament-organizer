<script lang="ts">
  import type { Player } from '$lib/Player';
	import { players } from '$lib/stores';

    function deletePlayer(player: Player) {
        let index = $players.findIndex(p => p === player);
        $players = [...$players.toSpliced(index, 1)];
    }
</script>

<div class="flex flex-col bg-white w-1/2 h-[500px] overflow-auto p-4 space-y-2 border">
    {#key players}
    {#each $players as player}
    <div class="flex flex-row border-b p-2">
        <span>
            {player.name}
        </span>
        
        <button class="text-red-500 ml-auto" on:click={() => deletePlayer(player)}>
            X
        </button>
    </div>

    {/each}
    {/key}
</div>