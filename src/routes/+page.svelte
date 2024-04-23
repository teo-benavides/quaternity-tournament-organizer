<script lang="ts">
  import NumberSelector from "$lib/components/NumberSelector.svelte";
  import { players } from "$lib/stores";
  import { Player } from "$lib/Player";
  import PlayerList from "$lib/components/PlayerList.svelte";
  import * as XLSX from "xlsx";
  // import * as domToPdf from 'dom-to-pdf';
  import TournamentTable from "$lib/components/TournamentTable.svelte";
  // i: round number
  // j: player number
  const rounds = [
    [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
    [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3],
    [0, 1, 2, 3, 1, 0, 3, 2, 2, 3, 0, 1, 3, 2, 1, 0],
    [0, 1, 2, 3, 3, 2, 1, 0, 1, 0, 3, 2, 2, 3, 0, 1],
    [0, 1, 2, 3, 2, 3, 0, 1, 3, 2, 1, 0, 1, 0, 3, 2],
  ];

  const bg1 = "border bg-red-500";
  const bg2 = "border bg-blue-500";
  const bg3 = "border bg-yellow-500";
  const bg4 = "border bg-green-500";

  function getBg(tableNum: number) {
    switch (tableNum) {
      case 0:
        return bg1;
      case 1:
        return bg2;
      case 2:
        return bg3;
      case 3:
        return bg4;
    }
  }

  let tableNumber: number = 4;
  let playerName: string = "";
  let gameReady: boolean = false;
  let tournamentName: string = "";
  let tournament: Tournament | undefined = undefined;

  function addPlayer() {
    tournament = undefined;
    $players = [...$players, new Player(playerName)];
    playerName = "";
  }

  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function getPlayerIndexesForTable(roundNumber: number, tableNumber: number) {
    let playerIndexes: number[] = [];
    for (let i = 0; i < rounds[roundNumber].length; i++) {
      if (rounds[roundNumber][i] == tableNumber) {
        playerIndexes.push(i);
      }
    }

    return playerIndexes;
  }

  function startGame() {
    shuffleArray($players);
    let newTournament: Tournament = { tables: [] };

    for (let i = 0; i < tableNumber; i++) {
      newTournament.tables[i] = { rounds: [] };
      for (let j = 0; j < rounds.length; j++) {
        let playerIndexes = getPlayerIndexesForTable(j, i);
        shuffleArray(playerIndexes);
        newTournament.tables[i].rounds[j] = {
          white: playerIndexes[0],
          black: playerIndexes[1],
          red: playerIndexes[2],
          green: playerIndexes[3],
        };
      }
    }

    tournament = newTournament;
  }

  function exportFile() {
    let tournamentSheet = XLSX.utils.table_to_sheet(document.getElementById("tournament-table"));
    let playerSheet = XLSX.utils.table_to_sheet(document.getElementById("player-table"));
    let book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, playerSheet, "Players");
    XLSX.utils.book_append_sheet(book, tournamentSheet, "Tournament");

    XLSX.writeFile(book, "Tournament Data.xlsx");
  }

  $: if ($players.length / tableNumber == 4) {
    gameReady = true;
  } else {
    gameReady = false;
  }
</script>

<div
  class="flex flex-col w-full h-full items-center p-8 space-y-4"
>
  <span>Jugadores</span>
  <span>{$players.length} ({tableNumber * 4})</span>
  <input class="border p-2 bg-white" type="text" placeholder="Nombre del torneo" bind:value={tournamentName} />
  <form
    on:submit={(e) => {
      e.preventDefault();
      addPlayer();
    }}
  >

    <input class="border p-2 bg-white" type="text" placeholder="Nombre de jugador" bind:value={playerName} />
    <button class="border p-2 bg-white">+</button>
  </form>
  <PlayerList />
  <div class="flex flex-row space-x-4">
    <button
      class="p-4 border rounded bg-white hover:bg-slate-100 active:bg-slate-200"
      on:click={() => {$players = []; tournament = undefined;}}>Clear players</button
    >
    <button
      disabled={!gameReady}
      class="p-4 border rounded text-white bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:bg-slate-300 disabled:text-slate-500"
      on:click={() => startGame()}>Create Game</button
    >
  </div>
  <TournamentTable {tournament} {tournamentName} />
  {#if tournament}
  <button
    class="p-4 border rounded text-white bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 disabled:bg-slate-300 disabled:text-slate-500"
    on:click={() => exportFile()}>Download table</button
  >
  {/if}
</div>
