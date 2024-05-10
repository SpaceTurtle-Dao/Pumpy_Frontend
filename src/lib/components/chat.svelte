<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Time from 'svelte-time';
	let elemChat: HTMLElement;
	let currentMessage = '';
	let messageFeed = [
		{
			id: 0,
			host: true,
			avatar: 48,
			name: 'Jane',
			timestamp: new Date(),
			message: 'Some message text.',
			color: 'color-primary-700'
		},
		{
			id: 1,
			host: false,
			avatar: 14,
			name: 'Michael',
			timestamp: new Date(),
			message: 'Some message text.',
			color: 'color-primary-700'
		}
	];

	function scrollChatBottom(behavior?: ScrollBehavior): void {
		elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
	}

	function addMessage(): void {
		const newMessage = {
			id: messageFeed.length,
			host: true,
			avatar: 48,
			name: 'Jane',
			timestamp: new Date(),
			message: currentMessage,
			color: 'variant-soft-primary'
		};
		// Append the new message to the message feed
		messageFeed.push(newMessage);
		messageFeed = [...messageFeed, newMessage];
		// Clear the textarea message
		currentMessage = '';
		// Smoothly scroll to the bottom of the feed
		setTimeout(() => {
			scrollChatBottom('smooth');
		}, 0);
	}
</script>


<div class="w-full">
    <div class="w-full max-h-[400px] py-4 overflow-y-auto space-y-4">
        {#each messageFeed as bubble, i}
            {#if bubble.host === true}
                <!-- Host Message Bubble -->
                <div class="grid grid-cols-[auto_1fr] gap-2">
                    <Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
                    <div class="card p-4 variant-soft rounded-tl-none space-y-2 bg-blue-100">
                        <header class="flex justify-between items-center">
                            <p class="font-bold">{bubble.name}</p>
                            <small class="opacity-50"><Time timestamp={bubble.timestamp} /></small>
                        </header>
                        <p>{bubble.message}</p>
                    </div>
                </div>
            {:else}
                <!-- Guest Message Bubble -->
    
                <div class="grid grid-cols-[1fr_auto] gap-2">
                    <div class="card p-4 rounded-tr-none space-y-2 bg-gray-200">
                        <header class="flex justify-between items-center">
                            <p class="font-bold">{bubble.name}</p>
                            <small class="opacity-50"><Time timestamp={bubble.timestamp} /></small>
                        </header>
                        <p>{bubble.message}</p>
                    </div>
                    <Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
                </div>
            {/if}
        {/each}
    </div>
	<div class="flex flex-row">
		<div >
            <textarea
			bind:value={currentMessage}
			class="bg-transparent border-2 border-gray-500 w-96"
			name="prompt"
			id="prompt"
			placeholder=" Write a message..."
			rows="2"
		/>
        </div>
        <div class="pl-1">
            <button type="button" class="btn variant-filled bg-gray-500 text-white btn-rounded h-12">Send</button>
        </div>
	</div>
    
</div>
