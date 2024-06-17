<script lang="ts" context="module">
	import { number, z } from 'zod';
	export const formSchema = z.object({
		minter: z.string(),
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
	import { Input, type FormInputEvent } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { Principal } from '@dfinity/principal';
	import MediumSpinner from './mediumSpinner.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
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
	let token = 0;
	let amountA:Number;
	let amountB:Number;

	const tokens = [
		{ value: 0, label: 'ICP' },
		{ value: 1, label: 'ckBTC' },
		{ value: 2, label: 'ckETH' },
		{ value: 3, label: 'ckUSDC' },
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

	let data: SuperValidated<Infer<FormSchema>>;
	export { data as form };
	const form = superForm(data, {
		validators: zodClient(formSchema),
		clearOnSubmit: 'errors-and-message',
		multipleSubmits: 'prevent',
		onSubmit: async () => {
			console.log('boom');
			await createToken();
		},
		onUpdated: async ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const createToken = async () => {
		console.log($formData);
		let blob = Array.from(new Uint8Array(await $formData.icon.arrayBuffer()));
		let mimetype = $formData.icon.type;
		let mintRequest: MintRequest = {
			id: BigInt(0),
			to: $formData.minter,
			amount: BigInt($formData.amount)
		};

		let tokenRequest: TokenRequest = {
			decimals: BigInt(0),
			image: { blob: blob, mimetype: mimetype },
			name: $formData.name,
			minter: $formData.minter,
			supply: BigInt(0),
			symbol: $formData.ticker,
			telegram: [$formData.telegram],
			twitter: [$formData.twitter],
			discord: [$formData.discord],
			website: [$formData.website]
		};
		let request: PumpRequest = {
			token: BigInt(token),
			amount:[BigInt(amountA),BigInt(amountB)],
			holder: mintRequest,
			tokenRequest: tokenRequest
		};
		console.log(request);
		loadingStore.set(true);
		let result = await pumpy.createPools([{ PUMP: request }]);
		console.log(result);
		loadingStore.set(false);
	};

	const { form: formData, errors, enhance } = form;
	const file = fileProxy(form, 'icon');
	pumpyActor.subscribe((value) => {
		pumpy = value;
	});

	loadingStore.subscribe((value) => {
		isLoading = value;
	});

	principalStore.subscribe((value) => {
		if (value) {
			principal = value;
			$formData.minter = principal.toString();
		}
	});

	file.subscribe((value) => {
		//icon = value[0];
		//console.log(icon);
	});
</script>

<div class="w-full flex justify-center">
	{#if isLoading}
		<MediumSpinner />
	{:else}
		<form method="POST" enctype="multipart/form-data" class="space-y-6" use:enhance>
			<Form.Field {form} name="name" class="space-y-3 w-96">
				<Form.Control let:attrs>
					<Form.Label>name</Form.Label>
					<Input {...attrs} bind:value={$formData.name} />
					{#if $errors.name}
						<small>{$errors.name}</small>
					{/if}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="ticker" class="space-y-3 w-96">
				<Form.Control let:attrs>
					<Form.Label>ticker</Form.Label>
					<Input {...attrs} bind:value={$formData.ticker} />
					{#if $errors.ticker}
						<small>{$errors.ticker}</small>
					{/if}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="description" class="space-y-3 w-96">
				<Form.Control let:attrs>
					<Form.Label>description</Form.Label>
					<Textarea {...attrs} bind:value={$formData.description} />
					{#if $errors.description}
						<small>{$errors.description}</small>
					{/if}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="icon" class="space-y-3 w-96">
				<Form.Control let:attrs>
					<div class="grid w-full max-w-sm items-center gap-1.5">
						<Form.Label for="icon">Icon</Form.Label>
						<input
							class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							type="file"
							name="icon"
							accept="image/png, image/jpeg"
							bind:files={$file}
						/>
						{#if $errors.icon}
							<small>{$errors.icon}</small>
						{/if}
					</div>
				</Form.Control>
				<Form.FieldErrors />
				<Form.Description>Cost to deploy: ~0.02 ICP</Form.Description>
			</Form.Field>
			<div class="flex flex-col space-y-6">
				<Dialog.Root>
					<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}
						>Create Token</Dialog.Trigger
					>
					<Dialog.Content >
						<Dialog.Header>
							<Dialog.Title
								>Choose how many {$formData.ticker} you want to buy (optional)</Dialog.Title
							>
							<Dialog.Description>
								tip: its optional but buying a small amount of tokens helps protect your tokens from
								snipers
							</Dialog.Description>
						</Dialog.Header>
						<div class="grid gap-4 py-4">
							<div class="grid grid-cols-4 items-center gap-4">
								<Input type="number"  min="0" bind:value={amountA} id="token" placeholder="{$formData.ticker} 0.0 (optional)" class="col-span-3" />
								<Input type="number"  min="0" bind:value={amountB} id="token" placeholder="0.0 (optional)" class="col-span-3" />
								<Select.Root onSelectedChange={(v) => {
									if(v){
										if(typeof v.value === "number"){ token = v.value}
									};
								  }} portal={null}>
									<Select.Trigger>
									  <Select.Value placeholder="token" />
									</Select.Trigger>
									<Select.Content>
									  <Select.Group>
										{#each tokens as token}
										  <Select.Item value={token.value} label={token.label}
											>{token.label}</Select.Item
										  >
										{/each}
									  </Select.Group>
									</Select.Content>
									<Select.Input name="token" />
								  </Select.Root>
							</div>
						</div>
						<Dialog.Footer>
							<Form.Button class="w-full">Submit</Form.Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
				<Button class="w-36" variant="ghost" on:click={toggleVissible}>{buttonText}</Button>
			</div>
			{#if isVisible}
				<Form.Field {form} name="twitter" class="space-y-3 w-96">
					<Form.Control let:attrs>
						<Form.Label>twitter</Form.Label>
						<Input {...attrs} placeholder="(optional)" bind:value={$formData.twitter} />
						{#if $errors.twitter}
							<small>{$errors.twitter}</small>
						{/if}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="telegram" class="space-y-3 w-96">
					<Form.Control let:attrs>
						<Form.Label>telegram</Form.Label>
						<Input {...attrs} placeholder="(optional)" bind:value={$formData.telegram} />
						{#if $errors.telegram}
							<small>{$errors.telegram}</small>
						{/if}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="discord" class="space-y-3 w-96">
					<Form.Control let:attrs>
						<Form.Label>discord</Form.Label>
						<Input {...attrs} placeholder="(optional)" bind:value={$formData.discord} />
						{#if $errors.discord}
							<small>{$errors.discord}</small>
						{/if}
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="website" class="space-y-3 w-96">
					<Form.Control let:attrs>
						<Form.Label>website</Form.Label>
						<Input {...attrs} placeholder="(optional)" bind:value={$formData.website} />
						{#if $errors.website}
							<small>{$errors.website}</small>
						{/if}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{/if}

			<!--{#if browser}
				<SuperDebug data={$formData} />
				{/if}-->
		</form>
	{/if}
</div>
