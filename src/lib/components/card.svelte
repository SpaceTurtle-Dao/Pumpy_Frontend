<script lang="ts">
  import * as Card from "$lib/components/ui/card";
</script>

<Card.Root class="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
  <Card.Header>
    <div class="flex justify-between items-center mb-2">
      <span class="text-gray-400">29-03-2024</span>
      <span class="text-green-400">Project Type</span>
    </div>
    <Card.Title>
      <h2 class="text-2xl font-bold mb-2">PROJECT NAME HERE 
        <button class="ml-2 bg-blue-500 text-white p-1 rounded-full">+</button>
      </h2>
    </Card.Title>
    <Card.Description>
      <p class="mb-4">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."</p>
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <div class="mb-2">
      <span class="text-sm font-semibold">1024 $ICP VOLUME</span>
    </div>
    <div class="mb-2">
      <span class="text-sm font-semibold">890 $ICP CONTRIBUTED</span>
    </div>
    <div class="relative w-full h-3 bg-gray-700 rounded-full mb-2">
      <div class="absolute top-0 left-0 h-full bg-green-400 rounded-full" style="width: calc(890 / 1024 * 100%)"></div>
      <div class="absolute inset-0 flex justify-center items-center">
        <span class="text-xs text-white">▼</span>
      </div>
    </div>
    <div class="text-sm text-gray-400">
      BONDING ENDS: <span class="font-semibold">00:18:36:28</span>
    </div>
  </Card.Content>
</Card.Root>
