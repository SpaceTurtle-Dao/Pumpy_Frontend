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
</script>

<div class="flex flex-row w-full gap-10">
	<div class="w-full basis-2/3">
		<div class="flex flex-col space-y-8">
			<Chart />
			<Trades/>
		</div>
	</div>
	<div class="flex flex-col space-y-4">
		<div class="flex flex-row gap-6">
			<Card.Root class="w-[350px] space-y-6">
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
						<Input type="number" placeholder="0.0" />
						<Button class="w-full">place trade</Button>
					</div>
				</Card.Content>
			</Card.Root>
			<Card.Root
				  data-x-chunk-name="dashboard-07-chunk-5"
				  data-x-chunk-description="A card with a call to action to archive the product"
				>
				  <Card.Header>
					<Card.Title>Archive Product</Card.Title>
					<Card.Description>
					  Lipsum dolor sit amet, consectetur adipiscing elit.
					</Card.Description>
				  </Card.Header>
				  <Card.Content>
					<div class="flex flex-row gap-6">
						<SocialIcons alt="" network="twitter" fgColor="#eeeeee" bgColor="#111111" width="50" height="50"/>
						<SocialIcons alt="" network="discord" fgColor="#eeeeee" bgColor="#111111" width="50" height="50"/>
						<SocialIcons alt="" network="telegram" fgColor="#eeeeee" bgColor="#111111" width="50" height="50"/>
					</div>
				  </Card.Content>
				</Card.Root>
		</div>
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
		<div class="w-full">
			<Holders/>
		</div>
	</div>
</div>
