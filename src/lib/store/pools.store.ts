import { writable, type Writable } from "svelte/store";
import type { Pool } from '$lib/models/Pool.svelte';

type Time = number;

const fakePools: Array<Pool> = [
  {
    name: "LunarX",
    createdBy: "Lunar Exploration Token",
    image: "src/assets/2.png",
    price: 42.69,
    time: "2h 15m",
    holders: 8.3,
    buyers: 2.1,
    volume: 1250000,
    marketCap: 15000000
  },
  {
    name: "QuantumBit",
    createdBy: "Quantum Computing Coin",
    image: "src/assets/luna.png",
    price: 137.58,
    time: "45m",
    holders: 12.7,
    buyers: 0.9,
    volume: 3750000,
    marketCap: 52000000
  },
  {
    name: "EcoSphere",
    createdBy: "Sustainable Ecosystem Token",
    image: "src/assets/3.png",
    price: 9.99,
    time: "3h 30m",
    holders: 5.2,
    buyers: 3.7,
    volume: 890000,
    marketCap: 7500000
  },
  {
    name: "NeuralLink",
    createdBy: "AI Neural Network Coin",
    image: "src/assets/4.png",
    price: 76.54,
    time: "1h 5m",
    holders: 9.8,
    buyers: 1.5,
    volume: 2100000,
    marketCap: 31000000
  },
  {
    name: "CryptoNova",
    createdBy: "Next-Gen Crypto Platform",
    image: "src/assets/5.png",
    price: 23.45,
    time: "55m",
    holders: 7.1,
    buyers: 2.8,
    volume: 1750000,
    marketCap: 18000000
  },
  {
    name: "GenomeX",
    createdBy: "Genetic Research Token",
    image: "src/assets/6.png",
    price: 88.88,
    time: "4h 20m",
    holders: 14.2,
    buyers: 0.7,
    volume: 4200000,
    marketCap: 65000000
  },
  {
    name: "AstroMine",
    createdBy: "Asteroid Mining Coin",
    image: "src/assets/7.png",
    price: 55.55,
    time: "2h 45m",
    holders: 6.9,
    buyers: 3.2,
    volume: 1900000,
    marketCap: 27000000
  },
  {
    name: "HoloVerse",
    createdBy: "Holographic Universe Token",
    image: "src/assets/8.png",
    price: 12.34,
    time: "1h 30m",
    holders: 4.5,
    buyers: 4.1,
    volume: 950000,
    marketCap: 9000000
  },
  {
    name: "FusionX",
    createdBy: "Nuclear Fusion Energy Coin",
    image: "src/assets/9.png",
    price: 101.01,
    time: "3h 15m",
    holders: 11.3,
    buyers: 1.2,
    volume: 3100000,
    marketCap: 42000000
  },
  {
    name: "CyberShield",
    createdBy: "Cybersecurity Protocol Token",
    image: "src/assets/luna.png",
    price: 67.89,
    time: "50m",
    holders: 8.7,
    buyers: 2.3,
    volume: 2300000,
    marketCap: 35000000
  },
  {
    name: "BioSynth",
    createdBy: "Synthetic Biology Coin",
    image: "src/assets/luna.png",
    price: 33.33,
    time: "2h 5m",
    holders: 6.1,
    buyers: 3.5,
    volume: 1650000,
    marketCap: 22000000
  },
  {
    name: "TerraForm",
    createdBy: "Planetary Terraforming Token",
    image: "src/assets/luna.png",
    price: 199.99,
    time: "5h 10m",
    holders: 15.8,
    buyers: 0.5,
    volume: 5500000,
    marketCap: 88000000
  }
];

export const Pools = writable<Array<Pool>>(fakePools);
