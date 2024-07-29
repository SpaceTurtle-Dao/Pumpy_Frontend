<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { Toaster } from '$lib/components/ui/sonner';
	import {
		NavbarMenu,
		HoveredLink,
		MenuItem,
		ProductItem
	} from '../lib/components/ui/navbar-menu/index';
	import Logo from '../assets/logo.svelte';
	import ThemeSwitch from '$lib/components/ui/theme-switch/themeSwitch.svelte';
	let active: string | null = null;
</script>

<div class="bg-background-700">
	<div class="relative flex w-full items-center justify-cente">
		<div class={'fixed inset-x-0 top-12 z-50 mx-auto max-w-2xl'}>
			<NavbarMenu>
				<div class="flex items-left space-x-5">
					<div class="w-8 h-8">
						<Logo />
					</div>
					<div class="w-8">
						<!-- <span class="text-sm">SwapBox</span> -->
					</div>
				</div>
				<MenuItem {active} item="Services">
					<div class="flex flex-col space-y-4 text-sm">
						<HoveredLink href="#">Web Development</HoveredLink>
						<HoveredLink href="#">Interface Design</HoveredLink>
						<HoveredLink href="#">Search Engine Optimization</HoveredLink>
						<HoveredLink href="#">Branding</HoveredLink>
					</div>
				</MenuItem>
				<MenuItem {active} item="Products">
					<div class="  grid grid-cols-2 gap-10 p-4 text-sm">
						<HoveredLink href="#">Branding</HoveredLink>
						<HoveredLink href="#">Branding</HoveredLink>
						<HoveredLink href="#">Branding</HoveredLink>
						<HoveredLink href="#">Branding</HoveredLink>
					</div>
				</MenuItem>
				<MenuItem {active} item="Pricing">
					<div class="flex flex-col space-y-4 text-sm">
						<HoveredLink href="#">Hobby</HoveredLink>
						<HoveredLink href="#">Individual</HoveredLink>
						<HoveredLink href="#">Team</HoveredLink>
						<HoveredLink href="#">Enterprise</HoveredLink>
					</div>
				</MenuItem>
				<div class="flex items-left space-x-5">
					<div class="w-8 h-8"></div>
					<div>
						<ThemeSwitch />
					</div>
				</div>
			</NavbarMenu>
		</div>
	</div>

	<div class="flex flex-col gap-2.5 max-w-[1440px] mx-auto min-h-[100vh]">
		<Toaster />
		<!-- <Navbar /> -->
		<div class="h-32"></div>
		<slot />
	</div>
</div>
