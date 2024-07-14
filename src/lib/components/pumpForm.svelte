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

	import { send, createProcess } from '$lib/process';
	import { upload } from '$lib/uploader';
	import { createPump, add } from '$lib/common/swappy';
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

	const data = defaults(zod(schema));

	const managerId = 'jQHPzleOmT4ZJqdC0r77qKzudFjIM6d5ufjc0FX2JQI';
	//const poolId = 'NJVmhqsCZ9DDReywzE5c0Ds4RjO5CPIebcdw-dk6P0k';
	//const airToken = '2nfFJb8LIA69gwuLNcFQezSuw4CXPE4--U-j-7cxKOU';
	const waterToken = 'x7B1WmMJxh9UxRttjQ_gPZxI1BuLDmQzk3UDNgmqojM';

	let isLoading = false;
	let isVisible = false;
	let buttonText = 'Show more options';
	let token = 0;
	let amountA: string;
	let amountB: string;
	let dialogOpen = false;

	const tokens = [
		{ value: 0, label: 'ICP' },
		{ value: 1, label: 'ckBTC' },
		{ value: 2, label: 'ckETH' },
		{ value: 3, label: 'ckUSDC' }
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

	const create = async () => {
		let poolId = await createPump(
			$icon[0],
			waterToken,
			$form.name,
			$form.ticker,
			$form.description
		);
		await add(poolId!, amountA, amountB);
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
			console.log(form.data.icon);
			console.log('boom');
			if (!form.valid) return fail(400, { form });
			try {
				dialogOpen = true;
				/*const { results } = await fetch(`https://randomuser.me/api/?seed=${form.data.id}`).then(
					(response) => response.json()
				);

				const user = results[0];
				const name = `${user.name.first} ${user.name.last}`;

				photoUrl = user.picture.large;
				form.message = { status: 200, text: `${name}, brought to you by randomuser.me` };*/
			} catch (e) {
				form.message = { status: 500, text: `User not found.` };
			}
		}
	});

	const icon = filesProxy(form, 'icon');
</script>

<div class="w-full flex flex-col justify-center items-center">
	{#if isLoading}
		<MediumSpinner />
	{:else}
		<form method="POST" use:enhance enctype="multipart/form-data">
			<div class="space-y-6">
				<div>
					<Label>name</Label>
					<Input
						aria-invalid={$errors.name ? 'true' : undefined}
						name="name"
						class=" flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						bind:value={$form.name}
					/>
					{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
				</div>
				<div>
					<Label>ticker</Label>
					<Input
						aria-invalid={$errors.ticker ? 'true' : undefined}
						name="ticker"
						class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						bind:value={$form.ticker}
					/>
					{#if $errors.ticker}<span class="invalid">{$errors.ticker}</span>{/if}
				</div>
				<div>
					<Label>description</Label>
					<Textarea
						aria-invalid={$errors.description ? 'true' : undefined}
						class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						name="description"
						bind:value={$form.description}
					/>
					{#if $errors.description}<span class="invalid">{$errors.description}</span>{/if}
				</div>
				<div>
					<Label>icon</Label>
					<input
						aria-invalid={$errors.icon ? 'true' : undefined}
						class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						type="file"
						name="icon"
						accept="image/png, image/jpeg, image/jpg, image/gif"
						bind:files={$icon}
					/>
					{#if $errors.icon}<span class="invalid">{$errors.icon}</span>{/if}
				</div>
				<div class="flex flex-col space-y-6">
					<Button class="w-36" variant="ghost" on:click={toggleVissible}>{buttonText}</Button>
				</div>
				{#if isVisible}
					<div>
						<Label>twitter</Label>
						<Input
							aria-invalid={$errors.twitter ? 'true' : undefined}
							class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							name="twitter"
							type="url"
							bind:value={$form.twitter}
						/>
						{#if $errors.twitter}<span class="invalid">{$errors.twitter}</span>{/if}
					</div>
					<div>
						<Label>telegram</Label>
						<Input
							aria-invalid={$errors.telegram ? 'true' : undefined}
							class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							name="telegram"
							type="url"
							bind:value={$form.telegram}
						/>
						{#if $errors.telegram}<span class="invalid">{$errors.telegram}</span>{/if}
					</div>
					<div>
						<Label>discord</Label>
						<Input
							aria-invalid={$errors.discord ? 'true' : undefined}
							class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							name="discord"
							type="url"
							bind:value={$form.discord}
						/>
						{#if $errors.discord}<span class="invalid">{$errors.discord}</span>{/if}
					</div>
					<div>
						<Label>website</Label>
						<Input
							aria-invalid={$errors.website ? 'true' : undefined}
							class="flex h-10  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							name="website"
							type="url"
							bind:value={$form.website}
						/>
						{#if $errors.website}<span class="invalid">{$errors.website}</span>{/if}
					</div>
				{/if}
				<div class="submit">
					<button>Create Token</button>
				</div>
			</div>
			<div>
				<Dialog.Root bind:open={dialogOpen}>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Choose how many {$form.ticker} you want to buy (optional)</Dialog.Title>
							<Dialog.Description>
								tip: its optional but buying a small amount of tokens helps protect your tokens from
								snipers
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
									class="col-span-3"
								/>
								<Input
									type="number"
									min="0"
									bind:value={amountB}
									id="token"
									placeholder="0.0 (optional)"
									class="col-span-3"
								/>
								<Select.Root
									onSelectedChange={(v) => {
										if (v) {
											if (typeof v.value === 'number') {
												token = v.value;
											}
										}
									}}
									portal={null}
								>
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
							<Button class="" on:click={create}>Create Token</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</form>
	{/if}
</div>
<SuperDebug data={$form} />
