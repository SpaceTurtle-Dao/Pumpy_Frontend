<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { Principal } from '@dfinity/principal';
	import MediumSpinner from './mediumSpinner.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { loadingStore, poolsStore } from '$lib/store/store';

	import { send} from '$lib/process';
	import { upload } from '$lib/uploader';
	import { createPump, transferToken, add, poolInfo, tokenInfo } from '$lib/common/swappy';
	import {
		type Infer,
		defaults,
		fail,
		fileProxy,
		filesProxy,
		intProxy,
		superForm
	} from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { valibot, zod } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';
	import { boolean } from 'zod';
	import { PROCESS_ID } from '$lib/common/constants';

	const data = defaults(zod(schema));

	const managerId = 'jQHPzleOmT4ZJqdC0r77qKzudFjIM6d5ufjc0FX2JQI';
	//const poolId = 'NJVmhqsCZ9DDReywzE5c0Ds4RjO5CPIebcdw-dk6P0k';
	//const airToken = '2nfFJb8LIA69gwuLNcFQezSuw4CXPE4--U-j-7cxKOU';

	let isLoading = false;
	let isVisible = false;
	let buttonText = 'Show more options';
	let tokenB = '';
	let amountA: string;
	let amountB: string;
	let dialogOpen = false;

	let _icon: File;
	let name: string;
	let ticker: string;
	let description: string;

	const tokens = [
		{ value: 'alfdQEEouvIvFDvhWRqImYesC_YVZ5FvFzc442I-QMI', label: 'AO' },
		{ value: 'alfdQEEouvIvFDvhWRqImYesC_YVZ5FvFzc442I-QMI', label: 'skETH' }
	];

	const toggleVissible = () => {
		console.log('Boom');
		isVisible = !isVisible;
		if (isVisible) {
			buttonText = 'Hide more options';
		} else {
			buttonText = 'Show more options';
		}
	};

	const decimals = (value: BigInt) => {
		let _decimals = 1;
		for (let i = 0; i < Number(value); i++) {
			_decimals = _decimals * 10;
		}

		return _decimals;
	};
	
	const create = async () => {
		console.log('creating pump');
		console.log(_icon);
		console.log(name);
		console.log(ticker);
		console.log(description);
		let info = await tokenInfo(tokenB)
		amountA = (decimals(BigInt(8)) * Number(amountA)).toString();
		amountB = (decimals(BigInt(info.Denomination)) * Number(amountB)).toString();
		console.log("token Info");
		console.log(info)
		console.log(amountA);
		console.log(amountB);
		let transferResult = await transferToken(tokenB,PROCESS_ID(),amountB);
		console.log(transferResult);
		await createPump(_icon, tokenB, name, ticker, description, amountA, amountB);
	};

	loadingStore.subscribe((value) => {
		isLoading = value;
	});

	const { form, errors, message, enhance, delayed } = superForm<
		Infer<typeof schema>,
		{ status: number; text: string } // Strongly typed status message
	>(data, {
		SPA: true,
		resetForm: true,
		clearOnSubmit: 'errors-and-message',
		validators: zod(schema),
		async onUpdate({ form }) {
			console.log($icon[0]);
			if (!form.valid) return fail(400, { form });
			try {
				_icon = $icon[0];
				name = $form.name;
				ticker = $form.ticker;
				description = $form.description;
				dialogOpen = true;
			} catch (e) {
				form.message = { status: 500, text: `User not found.` };
			}
		}
	});

	const icon = filesProxy(form, 'icon');
</script>

<div class="w-full flex flex-col justify-center items-center p-4 bg-gray-900 min-h-screen">
    {#if isLoading}
        <MediumSpinner />
    {:else}
        <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 text-center">
            Create a New Coin
        </h1>
        <div class="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl space-y-6 transform hover:scale-105 transition-all duration-300">
            <form method="POST" use:enhance enctype="multipart/form-data" class="w-full max-w-md space-y-6">
                <div class="space-y-4">
                    <div>
                        <Label class="text-gray-300 text-sm font-medium mb-1 block">Name</Label>
                        <Input
                            aria-invalid={$errors.name ? 'true' : undefined}
                            name="name"
                            class="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-white focus:border-white focus:outline-none"
                            bind:value={$form.name}
                        />
                        {#if $errors.name}<span class="text-red-500 text-xs mt-1">{$errors.name}</span>{/if}
                    </div>
                    <div>
                        <Label class="text-gray-300 text-sm font-medium mb-1 block">Ticker</Label>
                        <Input
                            aria-invalid={$errors.ticker ? 'true' : undefined}
                            name="ticker"
                            class="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-white focus:border-white focus:outline-none"
                            bind:value={$form.ticker}
                        />
                        {#if $errors.ticker}<span class="text-red-500 text-xs mt-1">{$errors.ticker}</span>{/if}
                    </div>
                    <div>
                        <Label class="text-gray-300 text-sm font-medium mb-1 block">Description</Label>
                        <Textarea
                            aria-invalid={$errors.description ? 'true' : undefined}
                            class="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-white focus:border-white focus:outline-none"
                            name="description"
                            bind:value={$form.description}
                        />
                        {#if $errors.description}<span class="text-red-500 text-xs mt-1">{$errors.description}</span>{/if}
                    </div>
                    <div>
                        <Label class="text-gray-300 text-sm font-medium mb-1 block">Icon</Label>
                        <div class="flex items-center justify-center w-full">
                            <label for="icon-upload" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all duration-300">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <input
                                    id="icon-upload"
                                    aria-invalid={$errors.icon ? 'true' : undefined}
                                    type="file"
                                    name="icon"
                                    accept="image/png, image/jpeg, image/jpg, image/gif"
                                    bind:files={$icon}
                                    class="hidden"
                                />
                            </label>
                        </div>
                        {#if $errors.icon}<span class="text-red-500 text-xs mt-1">{$errors.icon}</span>{/if}
                    </div>
                    <div class="flex flex-col space-y-4">
                        <Button 
                            class="w-full bg-gray-800 text-white border border-gray-700 rounded-md p-2 hover:bg-gray-700 transition-all duration-300" 
                            variant="ghost" 
                            on:click={toggleVissible}
                        >
                            {buttonText}
                        </Button>
                    </div>
                    {#if isVisible}
                        <div>
                            <Label class="text-gray-300 text-sm font-medium mb-1 block">Twitter</Label>
                            <Input
                                aria-invalid={$errors.twitter ? 'true' : undefined}
                                class="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-white focus:border-white focus:outline-none"
                                name="twitter"
                                type="url"
                                bind:value={$form.twitter}
                            />
                            {#if $errors.twitter}<span class="text-red-500 text-xs mt-1">{$errors.twitter}</span>{/if}
                        </div>
                        <div>
                            <Label class="text-gray-300 text-sm font-medium mb-1 block">Telegram</Label>
                            <Input
                                aria-invalid={$errors.telegram ? 'true' : undefined}
                                class="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-white focus:border-white focus:outline-none"
                                name="telegram"
                                type="url"
                                bind:value={$form.telegram}
                            />
                            {#if $errors.telegram}<span class="text-red-500 text-xs mt-1">{$errors.telegram}</span>{/if}
                        </div>
                        <div>
                            <Label class="text-gray-300 text-sm font-medium mb-1 block">Discord</Label>
                            <Input
                                aria-invalid={$errors.discord ? 'true' : undefined}
                                class="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-white focus:border-white focus:outline-none"
                                name="discord"
                                type="url"
                                bind:value={$form.discord}
                            />
                            {#if $errors.discord}<span class="text-red-500 text-xs mt-1">{$errors.discord}</span>{/if}
                        </div>
                        <div>
                            <Label class="text-gray-300 text-sm font-medium mb-1 block">Website</Label>
                            <Input
                                aria-invalid={$errors.website ? 'true' : undefined}
                                class="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2 focus:ring-2 focus:ring-white focus:border-white focus:outline-none"
                                name="website"
                                type="url"
                                bind:value={$form.website}
                            />
                            {#if $errors.website}<span class="text-red-500 text-xs mt-1">{$errors.website}</span>{/if}
                        </div>
                    {/if}
                    <div class="submit">
                        <button class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Create Token
                        </button>
                    </div>
                </div>
            </form>
        </div>  
    {/if}
</div>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content class="bg-gray-800 text-white p-6 rounded-lg shadow-xl">
        <Dialog.Header>
            <Dialog.Title class="text-2xl font-bold mb-2">Choose how many {$form.ticker} you want to buy (optional)</Dialog.Title>
            <Dialog.Description class="text-gray-400 mb-4">
                tip: its optional but buying a small amount of tokens helps protect your tokens from snipers
            </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
                <Input
                    type="number"
                    min="0"
                    bind:value={amountA}
                    id="token"
                    placeholder="{$form.ticker} 0.0 (optional)"
                    class="col-span-3 bg-gray-700 text-white border border-gray-600 rounded-md p-2"
                />
                <Input
                    type="number"
                    min="0"
                    bind:value={amountB}
                    id="token"
                    placeholder="0.0 (optional)"
                    class="col-span-3 bg-gray-700 text-white border border-gray-600 rounded-md p-2"
                />
                <Select.Root
                    onSelectedChange={(v) => {
                        if (v) {
                            if (typeof v.value === 'string') {
                                tokenB = v.value;
                            }
                        }
                    }}
                    portal={null}
                >
                    <Select.Trigger class="bg-gray-700 text-white border border-gray-600 rounded-md p-2">
                        <Select.Value placeholder="token" />
                    </Select.Trigger>
                    <Select.Content class="bg-gray-700 text-white border border-gray-600 rounded-md">
                        <Select.Group>
                            {#each tokens as token}
                                <Select.Item value={token.value} label={token.label} class="p-2 hover:bg-gray-600">
                                    {token.label}
                                </Select.Item>
                            {/each}
                        </Select.Group>
                    </Select.Content>
                    <Select.Input name="token" />
                </Select.Root>
            </div>
        </div>
        <Dialog.Footer>
            <Button class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300" on:click={create}>
                Create Token
            </Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

{#if import.meta.env.MODE == 'development'}
    <SuperDebug data={$form} />
{/if}