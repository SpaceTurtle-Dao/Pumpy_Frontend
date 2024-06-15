<script lang="ts" context="module">
	import { z } from 'zod';

	export const formSchema = z.object({
		name: z.string().min(2).max(50),
		ticker: z.string().min(2).max(50),
		description: z.string().min(100).max(500),
		image: z.string(),
		twitter: z.string().url(),
		telegram: z.string().url(),
		website: z.string().url()
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	let data: SuperValidated<Infer<FormSchema>>;
	export { data as form };
	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error('Please fix the errors in the form.');
			}
		}
	});

	const { form: formData, errors, enhance } = form;
</script>

<div class="w-full flex justify-center">
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
					<Form.Label for="picture">Picture</Form.Label>
					<Input id="picture" type="file" bind:value={$formData.image} />
					{#if $errors.image}
						<small>{$errors.image}</small>
					{/if}
				</div>
				<div>
					<Form.Label>twitter</Form.Label>
					<Input {...attrs} bind:value={$formData.twitter} />
					{#if $errors.twitter}
						<small>{$errors.twitter}</small>
					{/if}
				</div>
				<div>
					<Form.Label>telegram</Form.Label>
					<Input {...attrs} bind:value={$formData.telegram} />
					{#if $errors.telegram}
						<small>{$errors.telegram}</small>
					{/if}
				</div>
				<div>
					<Form.Label>website</Form.Label>
					<Input {...attrs} bind:value={$formData.website} />
					{#if $errors.website}
						<small>{$errors.website}</small>
					{/if}
				</div>
			</Form.Control>
			<Form.Description>Cost to deploy: ~0.02 ICP</Form.Description>
			<Form.FieldErrors />
			<Form.Button class="w-full">Submit</Form.Button>
			{#if browser}
				<SuperDebug data={$formData} />
			{/if}
		</Form.Field>
	</form>
</div>
