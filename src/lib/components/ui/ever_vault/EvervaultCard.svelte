<script lang="ts">
	import { useMotionTemplate, useMotionValue, Motion } from 'svelte-motion';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { MovingBorder } from '../moving-border';

	export let text: string | undefined = undefined;
	export let className: string | undefined = undefined;
	export let borderClassName: string | undefined = undefined;
	export let borderRadius: string | undefined = '1.75rem';

	let mouseX = useMotionValue(0);
	let mouseY = useMotionValue(0);

	export let duration = 2000;

	let randomString = '';

	onMount(() => {
		let str = generateRandomString(4000);
		randomString = str;
	});

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		let { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);

		const str = generateRandomString(4000);
		randomString = str;
	}

	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789^$!@#=+';
	const generateRandomString = (length: number) => {
		let result = '';
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length));
		}
		return result;
	};

	let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
	let style = { maskImage, WebkitMaskImage: maskImage };
</script>

<div
	class={cn(
		'relative min-h-52 flex h-full w-full items-center justify-center bg-transparent p-0.5',
		className
	)}
>
	<div
		on:mousemove={onMouseMove}
		role="presentation"
		class="group/card min-h-80 relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-transparent"
	>
		<div class="pointer-events-none">
			<div
				class="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-90"
			></div>
			<Motion let:motion {style}>
				<div
					use:motion
					class="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 backdrop-blur-xl transition duration-500 group-hover/card:opacity-100"
				/>
			</Motion>
			<Motion let:motion {style}>
				<div
					use:motion
					class="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
				>
					<p
						class="absolute inset-x-0 h-full whitespace-pre-wrap break-words font-mono text-xs font-bold text-white transition duration-500"
					>
						{randomString}
					</p>
				</div>
			</Motion>
		</div>
		<div
			class="relative z-10 flex items-center justify-center overflow-hidden bg-transparent p-[1px]"
		>
			<!-- <div class="absolute inset-0" style={`border-radius: calc(${borderRadius} * 0.96);`}>
				<MovingBorder {duration} rx="30%" ry="30%">
					<div
						class={cn(
							'h-20 w-20 bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)] opacity-[0.8]',
							borderClassName
						)}
					/>
				</MovingBorder>
			</div> -->
			<div
				class="relative flex min-w-96 min-h-40 items-center justify-center rounded-2xl text-3xl font-bold text-white"
			>
				<div
					class="absolute h-full w-full rounded-2xl bg-white/[0.5] blur-sm dark:bg-black/[0.5]"
				/>
				{#if text}
					<span class="z-20 text-black dark:text-white">{text}</span>
				{/if}
			</div>
		</div>
	</div>
</div>
