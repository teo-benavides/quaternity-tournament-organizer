import { writable } from "svelte/store";
import { Player } from "$lib/Player";

export const players = writable<Player[]>([]);