<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    // @ts-ignore
    import SocialIcons from '@rodneylab/svelte-social-icons';

    export let description: string;
    export let title: string;
</script>

<Card.Root
    data-x-chunk-name="dashboard-07-chunk-5"
    data-x-chunk-description="A card with a description and social media links"
    class="w-full bg-gradient-to-br from-[#1e1e2f] to-[#2a2a42] rounded-lg shadow-lg p-4 flex flex-col justify-between"
>
    <Card.Header>
        <Card.Title class="text-lg font-semibold text-white mb-2">{title}</Card.Title>
    </Card.Header>
    <Card.Content class="flex flex-col justify-center space-y-4">
        <Card.Description class="text-sm text-gray-300">
            {description}
        </Card.Description>
    </Card.Content>
    <Card.Footer class="flex justify-center mt-4">
        <div class="flex flex-row gap-4">
            <Button size="icon" class="bg-[#2a2a42] hover:bg-[#3a3a52] rounded-full p-2">
                <SocialIcons
                    alt="Twitter"
                    network="twitter"
                    fgColor="#eeeeee"
                    bgColor="transparent"
                    width="24"
                    height="24"
                />
            </Button>
            <Button size="icon" class="bg-[#2a2a42] hover:bg-[#3a3a52] rounded-full p-2">
                <SocialIcons
                    alt="Discord"
                    network="discord"
                    fgColor="#eeeeee"
                    bgColor="transparent"
                    width="24"
                    height="24"
                />
            </Button>
            <Button size="icon" class="bg-[#2a2a42] hover:bg-[#3a3a52] rounded-full p-2">
                <SocialIcons
                    alt="Telegram"
                    network="telegram"
                    fgColor="#eeeeee"
                    bgColor="transparent"
                    width="24"
                    height="24"
                />
            </Button>
        </div>
    </Card.Footer>
</Card.Root>