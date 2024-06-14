<script lang="ts" context="module">
	import { z } from 'zod';

	export const formSchema = z.object({
		name: z.string().min(2).max(50),
		ticker: z.string().min(2).max(50),
		description: z.string().min(100).max(500),
		image: z.string().url(),
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

	const { form: formData, enhance } = form;
</script>

<form action="/?/pumpForm" method="POST" class="w-2/3 space-y-6" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
			<Form.Label>ticker</Form.Label>
			<Input {...attrs} bind:value={$formData.ticker} />
			<Form.Label>description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
			<div class="grid w-full max-w-sm items-center gap-1.5">
				<Form.Label for="picture">Picture</Form.Label>
				<Input id="picture" type="file" />
			</div>
			<Form.Label>twitter</Form.Label>
			<Input {...attrs} bind:value={$formData.twitter} />
			<Form.Label>telegram</Form.Label>
			<Input {...attrs} bind:value={$formData.telegram} />
			<Form.Label>website</Form.Label>
			<Input {...attrs} bind:value={$formData.website} />
		</Form.Control>
		<Form.Description>Cost to deploy: ~0.02 ICP</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</form>
