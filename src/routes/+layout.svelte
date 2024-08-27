<script lang="ts">
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import '../app.css';
	import { env } from '$env/dynamic/public';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Button } from '$lib/components/ui/button';
	import {
		NavbarMenu,
		HoveredLink,
		MenuItem,
		ProductItem
	} from '../lib/components/ui/navbar-menu/index';
	import Logo from '../assets/logo.svelte';
	import Wave from '../assets/tech_wave_logo.svelte';
	import swappy from '../assets/s.png';
	import ThemeSwitch from '$lib/components/ui/theme-switch/themeSwitch.svelte';
	import WalletConnectButton from '$lib/components/wallet.svelte';

	let active: string | null = null;

	// Create a writable store for dark mode
	export const darkMode = writable(false);

	onMount(() => {
		if (browser) {
			const isDarkMode =
				localStorage.theme === 'dark' ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

			darkMode.set(isDarkMode);
			updateDarkMode(isDarkMode);
		}
	});

	function updateDarkMode(isDark: boolean) {
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}

	// Subscribe to changes in the darkMode store
	darkMode.subscribe((isDark) => {
		if (browser) {
			updateDarkMode(isDark);
		}
	});

	$: {
		if (typeof window !== 'undefined') {
			updateDarkMode($darkMode);
		}
	}

	let isMenuOpen = false;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- <div class="flex items-center"> -->
			<!-- <span class="ml-2 text-xl font-bold text-white nova-mono-regular">Swappy</span> -->
			<!-- </div> -->
			
			<div class="rounded-md bg-background-inverse h-fit flex navbar-logo px-1.5 py-[7px] pr-3">
				<a class="flex items-center gap-1" href="/">
					<!-- <div class="w-30 h-30 inline-block relative"></div> -->
				</a>
			</div>

			<div class="relative" style="width:45px;height:45px">
				<img
					alt="swappy"
					loading="eager"
					decoding="async"
					data-nimg="fill"
					class="logo"
					style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
					src={swappy}
				/>
			</div>
			<div class="hidden md:block">
				<div class="ml-10 flex items-baseline space-x-2 lg:space-x-4">
					{#each ['Articles', 'Security', 'Infra Log', 'Docs', 'Community', 'Status', 'Pricing'] as item}
						<a
							href="#{item.toLowerCase()}"
							class="text-gray-300 hover:bg-gray-700 hover:text-white px-2 py-2 rounded-md text-xs lg:text-sm font-medium"
							>{item}</a
						>
					{/each}
				</div>
			</div>
			<div class="hidden md:block">
				<WalletConnectButton buttonClass="border-primary-500 bg-primary-500 text-xs lg:text-sm" />
			</div>
			<div class="md:hidden">
				<button on:click={toggleMenu} class="text-white">
					<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16m-7 6h7"
						></path>
					</svg>
				</button>
			</div>
		</div>
	</div>

	{#if isMenuOpen}
		<div class="md:hidden">
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
				{#each ['Articles', 'Security', 'Infra Log', 'Docs', 'Community', 'Status', 'Pricing'] as item}
					<a
						href="#{item.toLowerCase()}"
						class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
						>{item}</a
					>
				{/each}
				<div class="mt-4">
					<WalletConnectButton buttonClass="w-full text-white border-purple-500 bg-purple-500" />
				</div>
			</div>
		</div>
	{/if}
</nav>

<div class="flex flex-col gap-2.5 mx-auto min-h-[100vh] pt-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
	<Toaster />
	<slot />
</div>

<style>
	.logo {
		height: 0.6rem;
		padding: 0.6rem;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
		filter: drop-shadow(0 0 2em #ff3e00aa);
	}
</style>
