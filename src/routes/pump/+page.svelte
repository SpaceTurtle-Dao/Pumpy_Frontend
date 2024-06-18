<script lang="ts">
	import Chart from '$lib/components/chart.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import Trades from '$lib/components/trades.svelte';
	import Holders from '$lib/components/holders.svelte';
	import Footer from '$lib/components/footer.svelte';
	import SocialIcons from '@rodneylab/svelte-social-icons';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { ChevronUp} from 'lucide-svelte';
</script>

<div class="flex flex-row gap-10">
	<div class="w-full basis-3/5">
		<div class="flex flex-col space-y-8">
			<Chart />
			<Trades />
		</div>
	</div>
	<div class="flex flex-col space-y-4 basis-2/5">
		<div class="flex flex-row gap-6">
			<div class="basis-1/2">
				<Card.Root class="space-y-1">
					<Card.Header>
						<div class="flex flex-row gap-2">
							<Button class="w-full">Buy</Button>
							<Button class="w-full" variant="secondary">Sell</Button>
						</div>
					</Card.Header>
					<Card.Content>
						<div class="flex flex-col space-y-4">
							<div class="flex flex-row justify-between">
								<Button class="h-6 ">switch to ICP</Button>
								<Button class="h-6">set max slippage</Button>
							</div>
						</div>
					</Card.Content>
					<Card.Footer class="flex flex-col space-y-3">
						<Input type="number" placeholder="0.0" />
						<div class="flex flex-row gap-4">
							<Button variant="outline" size="sm">reset</Button>
							<Button variant="outline" size="sm">1 ICP</Button>
							<Button variant="outline" size="sm">5 ICP</Button>
							<Button variant="outline" size="sm">10 ICP</Button>
						</div>
						<Button class="w-full">place trade</Button>
					</Card.Footer>
				</Card.Root>
			</div>
			<div class="flex flex-col space-y-4">
				<div class="flex flex-row basis-1/2 gap-4">
					<div class="basis-1/2">
						<Card.Root
							data-x-chunk-name="dashboard-05-chunk-1"
							data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
						>
							<Card.Header class="pb-2">
								<Card.Description>Market Cap</Card.Description>
							</Card.Header>
							<Card.Content class="flex flex-col space-y-2">
								<Card.Title class="text-4xl">$1329</Card.Title>
							</Card.Content>
							<Card.Footer class="gap-2">
								<ChevronUp/>
								<p class="text-xs text-green-400">25%</p>
								<p class="text-xs text-muted-foreground">1hr</p>
							</Card.Footer>
						</Card.Root>
					</div>
					<div class="basis-1/2">
						<Card.Root
							data-x-chunk-name="dashboard-05-chunk-1"
							data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
						>
							<Card.Header class="pb-2">
								<Card.Description>Volume</Card.Description>
							</Card.Header>
							<Card.Content class="flex flex-col space-y-2">
								<Card.Title class="text-4xl">$1329</Card.Title>
							</Card.Content>
							<Card.Footer class="gap-2">
								<ChevronUp/>
								<p class="text-xs text-green-400">25%</p>
								<p class="text-xs text-muted-foreground">1hr</p>
							</Card.Footer>
						</Card.Root>
					</div>
				</div>
				<Card.Root
					data-x-chunk-name="dashboard-05-chunk-1"
					data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
				>
					<Card.Header class="pb-0">
						<div class="flex flex-row justify-between">
							<div class="flex flex-row gap-2">
								<Avatar.Root class="hidden h-9 w-9 sm:flex">
									<Avatar.Image src="luna.png" alt="Avatar" />
									<Avatar.Fallback>OM</Avatar.Fallback>
								</Avatar.Root>
								<div class="flex flex-col">
									<Card.Description>Created By</Card.Description>
									<div class="text-xs text-muted-foreground">Luna</div>
								</div>
							</div>
							<Button size="lg">Follow</Button>
						</div>
					</Card.Header>
					<Card.Content class="flex flex-col space-y-2"></Card.Content>
					<Card.Footer>
						<p class="text-sm text-muted-foreground truncate ...">
							43emf-jxwxr-zvbvb-vojch-3a6um-mhe2d-if2bh-wefw3-3g52d-gjfos-vqe
						</p>
					</Card.Footer>
				</Card.Root>
			</div>
		</div>
		<div class="">
			<Card.Root
				data-x-chunk-name="dashboard-07-chunk-5"
				data-x-chunk-description="A card with a call to action to archive the product"
			>
				<Card.Header>
					<Card.Title>Luna</Card.Title>
				</Card.Header>
				<Card.Content class="flex flex-col justify-center space-y-6">
					<Card.Description>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
						dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
						mollit anim id est laborum.
					</Card.Description>
				</Card.Content>
				<Card.Footer class="flex justify-center">
					<div class="flex flex-row gap-6">
						<Button size="icon" class="bg-transparent rounded-full ">
							<SocialIcons
								alt=""
								network="twitter"
								fgColor="#eeeeee"
								bgColor="#111111"
								width="35"
								height="35"
							/>
						</Button>
						<Button size="icon" class="bg-transparent rounded-full">
							<SocialIcons
								alt=""
								network="discord"
								fgColor="#eeeeee"
								bgColor="#111111"
								width="35"
								height="35"
							/>
						</Button>
						<Button size="icon" class="bg-transparent rounded-full">
							<SocialIcons
								alt=""
								network="telegram"
								fgColor="#eeeeee"
								bgColor="#111111"
								width="35"
								height="35"
							/>
						</Button>
					</div>
				</Card.Footer>
			</Card.Root>
		</div>
		<div class="space-y-4">
			<div class="flex flex-row gap-4">
				<div class="basis-1/2">
					<Card.Root
						data-x-chunk-name="dashboard-05-chunk-1"
						data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
					>
						<Card.Header class="pb-2">
							<Card.Description>Liquidty</Card.Description>
							<Card.Title class="text-4xl">$1329</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col space-y-2">
							<div class="text-xs text-muted-foreground">25% bonded</div>
						</Card.Content>
						<Card.Footer>
							<Progress value={25} aria-label="25% increase" />
						</Card.Footer>
					</Card.Root>
				</div>

				<div class="basis-1/2">
					<Card.Root
						data-x-chunk-name="dashboard-05-chunk-1"
						data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
					>
						<Card.Header class="pb-2">
							<Card.Description>King of the hill progress</Card.Description>
							<Card.Title class="text-4xl">$1329</Card.Title>
						</Card.Header>
						<Card.Content class="flex flex-col space-y-2">
							<div class="text-xs text-muted-foreground">25% bonded</div>
						</Card.Content>
						<Card.Footer>
							<Progress value={25} aria-label="25% increase" />
						</Card.Footer>
					</Card.Root>
				</div>
			</div>
			<div class="w-full">
				<Holders />
			</div>
		</div>
	</div>
</div>
