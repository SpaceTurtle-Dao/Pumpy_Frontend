<script lang="ts">
	import Activity from 'lucide-svelte/icons/activity';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import DollarSign from 'lucide-svelte/icons/dollar-sign';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';
	import Users from 'lucide-svelte/icons/users';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
</script>

<Card.Root
	data-x-chunk-name="dashboard-01-chunk-5"
	data-x-chunk-description="A card showing a list of recent sales with customer names and email addresses."
>
	<Card.Header>
		<Card.Title>Holder Distribution</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-8">
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="luna.png" alt="Avatar" />
				<Avatar.Fallback>OM</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">Olivia Martin</p>
				<p class="text-sm text-muted-foreground truncate ...">43emf-jxwxr-zvbvb-vojch-3a6um-mhe2d-if2bh-wefw3-3g52d-gjfos-vqe</p>
			</div>
			<div class="ml-auto font-medium">10.5%</div>
		</div>
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="sunny.jpeg" alt="Avatar" />
				<Avatar.Fallback>JL</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">Jackson Lee</p>
				<p class="text-sm text-muted-foreground truncate ...">43emf-jxwxr-zvbvb-vojch-3a6um-mhe2d-if2bh-wefw3-3g52d-gjfos-vqe</p>
			</div>
			<div class="ml-auto font-medium">39.00%</div>
		</div>
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="luna.png" alt="Avatar" />
				<Avatar.Fallback>IN</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
				<p class="text-sm text-muted-foreground truncate ...">43emf-jxwxr-zvbvb-vojch-3a6um-mhe2d-if2bh-wefw3-3g52d-gjfos-vqe</p>
			</div>
			<div class="ml-auto font-medium">9.0%</div>
		</div>
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="sunny.jpeg" alt="Avatar" />
				<Avatar.Fallback>WK</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">William Kim</p>
				<p class="text-sm text-muted-foreground truncate ...">43emf-jxwxr-zvbvb-vojch-3a6um-mhe2d-if2bh-wefw3-3g52d-gjfos-vqe</p>
			</div>
			<div class="ml-auto font-medium">$9.90%</div>
		</div>
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="luna.png" alt="Avatar" />
				<Avatar.Fallback>SD</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				<p class="text-sm font-medium leading-none">Sofia Davis</p>
				<p class="text-sm text-muted-foreground truncate ...">43emf-jxwxr-zvbvb-vojch-3a6um-mhe2d-if2bh-wefw3-3g52d-gjfos-vqe/p>
			</div>
			<div class="ml-auto font-medium">3.9%</div>
		</div>
	</Card.Content>
</Card.Root>
