<script lang="ts">
    import { browser } from '$app/environment';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import '../app.css';
    import { env } from '$env/dynamic/public';
    import { Toaster } from '$lib/components/ui/sonner';
    import {
        NavbarMenu,
        HoveredLink,
        MenuItem,
        ProductItem
    } from '../lib/components/ui/navbar-menu/index';
    import Logo from '../assets/logo.svelte';
    import Wave from '../assets/tech_wave_logo.svelte';
    import ThemeSwitch from '$lib/components/ui/theme-switch/themeSwitch.svelte';

    let active: string | null = null;

    // Create a writable store for dark mode
    export const darkMode = writable(false);

    onMount(() => {
        if (browser) {
            const isDarkMode = localStorage.theme === 'dark' || 
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
    
    let isOpen = false;
    
    function toggleMenu() {
        isOpen = !isOpen;
    }
</script>

<div class="bg-background-900 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
    <div class="relative flex w-full items-center justify-center">
        <div class={'fixed inset-x-0 top-12 z-50 mx-auto max-w-2xl'}>
            <NavbarMenu>
                <div class="flex items-left space-x-5">
                    <div class="w-8 h-8">
                        <Wave />
                    </div>
                    <div class="w-8">
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
                    <div class="grid grid-cols-2 gap-10 p-4 text-sm">
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
                        <!-- <ThemeSwitch /> -->
                    </div>
                </div>
            </NavbarMenu>
        </div>
    </div>

    <div class="flex flex-col gap-2.5 max-w-[1440px] mx-auto min-h-[100vh]">
        <Toaster />
        <div class="h-32"></div>
        <slot />
    </div>
</div>