<script lang="ts">
  import { players } from "$lib/stores";

  export let tournament: Tournament | undefined;
  export let tournamentName: string;
</script>

{#if tournament}
  <h1 class="text-3xl font-bold">{tournamentName}</h1>
  <div class="flex flex-row space-x-8">
    <table id="player-table">
      <tbody>
        {#each $players as player, i}
          <tr>
            <td class="border border-black">{i + 1}</td>
            <td class="border border-black">{player.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <table id="tournament-table">
      <tbody>
        <tr>
          <th class="border border-black"></th>
          <th class="border border-black">Round 1</th>
          <th class="border border-black">Round 2</th>
          <th class="border border-black">Round 3</th>
          <th class="border border-black">Round 4</th>
          <th class="border border-black">Round 5</th>
        </tr>
        {#each tournament.tables as table, i}
          <tr>
            <th rowspan="4" class="border border-black">Table {i + 1}</th>
            {#each table.rounds as round}
              <td class="border border-black bg-white"
                >{round.white + 1}. {$players[round.white].name}</td
              >
            {/each}
          </tr>
          <tr>
            {#each table.rounds as round}
              <td class="border border-black bg-red-500 text-white"
                >{round.red + 1}. {$players[round.red].name}</td
              >
            {/each}
          </tr>
          <tr>
            {#each table.rounds as round}
              <td class="border border-black bg-black text-white"
                >{round.black + 1}. {$players[round.black].name}</td
              >
            {/each}
          </tr>
          <tr>
            {#each table.rounds as round}
              <td class="border border-black bg-green-500"
                >{round.green + 1}. {$players[round.green].name}</td
              >
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
