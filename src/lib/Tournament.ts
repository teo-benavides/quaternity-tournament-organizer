interface TableRound {
    white: number;
    black: number;
    red: number;
    green: number;
}

interface Table {
    rounds: TableRound[];
}

interface Tournament {
    tables: Table[];
}