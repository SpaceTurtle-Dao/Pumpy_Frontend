<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	// @ts-ignore
	import SocialIcons from '@rodneylab/svelte-social-icons';

    export let description:string;
    export let title:string;

</script>

<Card.Root
	data-x-chunk-name="dashboard-07-chunk-5"
	data-x-chunk-description="A card with a call to action to archive the product"
>
	<Card.Header>
		<Card.Title>{title}</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col justify-center space-y-6">
		<Card.Description>
			{description}
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
