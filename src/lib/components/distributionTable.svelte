<script lang="ts">
  const rounds = [[0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3],
  [0,1,2,3,0,1,2,3,0,1,2,3,0,1,2,3],
  [0,1,2,3,1,0,3,2,2,3,0,1,3,2,1,0],
  [0,1,2,3,3,2,1,0,1,0,3,2,2,3,0,1],
  [0,1,2,3,2,3,0,1,3,2,1,0,1,0,3,2]];

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
</script>

{#each rounds as round}
  <table>
    <tr>
      <td class={getBg(round[0])}>
        1
      </td>
      <td class={getBg(round[1])}>
        2
      </td>
      <td class={getBg(round[2])}>
        3
      </td>
      <td class={getBg(round[3])}>
        4
      </td>
    </tr>
    <tr>
      <td class={getBg(round[4])}>
        5
      </td>
      <td class={getBg(round[5])}>
        6
      </td>
      <td class={getBg(round[6])}>
        7
      </td>
      <td class={getBg(round[7])}>
        8
      </td>
    </tr>
    <tr>
      <td class={getBg(round[8])}>
        9
      </td>
      <td class={getBg(round[9])}>
        10
      </td>
      <td class={getBg(round[10])}>
        11
      </td>
      <td class={getBg(round[11])}>
        12
      </td>
    </tr>
    <tr>
      <td class={getBg(round[12])}>
        13
      </td>
      <td class={getBg(round[13])}>
        14
      </td>
      <td class={getBg(round[14])}>
        15
      </td>
      <td class={getBg(round[15])}>
        16
      </td>
    </tr>

  </table>
  {/each}