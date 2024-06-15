<script lang="ts" context="module">
	import { z } from 'zod';
	export const formSchema = z.object({
		name: z.string().max(50),
		ticker: z.string().max(50),
		description: z.string().max(500),
		icon: z
			.instanceof(File, { message: 'Please upload a file.' })
			.refine((f) => f.size < 100_000, 'Max 100 kB upload size.'),
		twitter: z.string(),
		telegram: z.string(),
		discord: z.string(),
		website: z.string(),
		supply: z.string().max(8),
		decimals: z.string().max(8),
		allocation: z.string().min(0),
		amount: z.string().min(0),
		token: z.string().min(0)
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import SuperDebug, {
		type Infer,
		type SuperValidated,
		superForm,
		fileProxy
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { Principal } from '@dfinity/principal';
	import { useIsFocusVisible } from '@material-ui/core';
	import MediumSpinner from './mediumSpinner.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Accordion from '$lib/components/ui/accordion';
	import {
		pumpyActor,
		principalStore,
		loadingStore,
		poolsStore,
		tokensStore,
		balancesStore
	} from '$lib/store';
	import type {
		MintRequest,
		Pumpy,
		PoolRequest,
		PumpRequest,
		TokenRequest
	} from '$lib/declarations/pumpy/pumpy.did';

	let pumpy: Pumpy;
	let isLoading = false;
	let isVisible = false;
	let principal: Principal;
	let buttonText = 'Show more options';

	pumpyActor.subscribe((value) => {
		pumpy = value;
	});

	loadingStore.subscribe((value) => {
		isLoading = value;
	});

	principalStore.subscribe((value) => {
		principal = value;
	});

	const toggleVissible = () => {
		console.log('Boom');
		isVisible = !isVisible;
		if (isVisible) {
			buttonText = 'Hide more options';
		} else {
			buttonText = 'Show more options';
		}
	};

	let data: SuperValidated<Infer<FormSchema>>;
	export { data as form };
	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated: async ({ form: f }) => {
			if (f.valid) {
				let mintRequest: MintRequest = {
					id: BigInt(0),
					to: principal.toString(),
					amount: BigInt(f.data.amount)
				};
				let tokenRequest: TokenRequest = {
					decimals: BigInt(0),
					icon: f.data.icon,
					name: f.data.name,
					minter: principal.toString(),
					supply: BigInt(0),
					symbol: f.data.ticker,
					telegram: [f.data.telegram],
					twitter: [f.data.twitter],
					discord: [f.data.discord],
					website: [f.data.website]
				};
				let request: PumpRequest = {
					token: BigInt(f.data.token),
					holder: mintRequest,
					tokenRequest: tokenRequest
				};
				loadingStore.set(true);
				let result = await pumpy.createPools([{ PUMP: request }]);
				console.log(result);
				loadingStore.set(false);
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, errors, enhance } = form;
	const file = fileProxy(form, 'icon');
</script>

<div class="w-full flex justify-center">
	{#if isLoading}
		<MediumSpinner />
	{:else}
		<form method="POST" class="space-y-6" use:enhance>
			<Form.Field {form} name="name" class="space-y-3 w-96">
				<Form.Control let:attrs>
					<div>
						<Form.Label>name</Form.Label>
						<Input {...attrs} bind:value={$formData.name} />
						{#if $errors.name}
							<small>{$errors.name}</small>
						{/if}
					</div>
					<div>
						<Form.Label>ticker</Form.Label>
						<Input {...attrs} bind:value={$formData.ticker} />
						{#if $errors.ticker}
							<small>{$errors.ticker}</small>
						{/if}
					</div>
					<div>
						<Form.Label>description</Form.Label>
						<Textarea {...attrs} bind:value={$formData.description} />
						{#if $errors.description}
							<small>{$errors.description}</small>
						{/if}
					</div>
					<div class="grid w-full max-w-sm items-center gap-1.5">
						<Form.Label for="icon">Icon</Form.Label>
						<Input bind:value={$file} type="file" name="image" accept="image/png, image/jpeg"/>
						{#if $errors.icon}
							<small>{$errors.icon}</small>
						{/if}
					</div>

					<Button variant="ghost" on:click={toggleVissible}>{buttonText}</Button>
					{#if isVisible}
						<div>
							{#if isVisible}
								<Form.Label>twitter</Form.Label>
								<Input {...attrs} placeholder="(optional)" bind:value={$formData.twitter} />
							{/if}
							{#if $errors.twitter}
								<small>{$errors.twitter}</small>
							{/if}
						</div>
						<div>
							<Form.Label>telegram</Form.Label>
							<Input {...attrs} placeholder="(optional)" bind:value={$formData.telegram} />
							{#if $errors.telegram}
								<small>{$errors.telegram}</small>
							{/if}
						</div>
						<div>
							<Form.Label>discord</Form.Label>
							<Input {...attrs} placeholder="(optional)" bind:value={$formData.discord} />
							{#if $errors.discord}
								<small>{$errors.discord}</small>
							{/if}
						</div>
						<div>
							<Form.Label>website</Form.Label>
							<Input {...attrs} placeholder="(optional)" bind:value={$formData.website} />
							{#if $errors.website}
								<small>{$errors.website}</small>
							{/if}
						</div>
					{/if}
				</Form.Control>
				<Form.Description>Cost to deploy: ~0.02 ICP</Form.Description>
				<Form.FieldErrors />
				<Form.Button class="w-full">Submit</Form.Button>
				{#if browser}
					<SuperDebug data={$formData} />
				{/if}
			</Form.Field>
		</form>
	{/if}
</div>
