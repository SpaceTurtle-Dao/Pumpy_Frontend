<script>
  export let user = {};
  // Add logic to fetch user data
</script>

<div class="bg-gray-900 text-white p-4 rounded-lg">
  <div class="flex items-center mb-4">
    <img src={user.avatar} alt="User avatar" class="w-12 h-12 rounded-full mr-4">
    <div>
      <h2 class="text-xl font-bold">{user.username}</h2>
      <p class="text-sm text-gray-400">{user.followers} followers</p>
    </div>
  </div>
  
  <button class="bg-gray-700 px-3 py-1 rounded-md text-sm">Edit profile</button>
  
  <div class="mt-4">
    <p class="text-sm">Likes received: {user.likes}</p>
    <p class="text-sm">Mentions received: {user.mentions}</p>
  </div>
  
  <div class="mt-4 bg-gray-800 p-2 rounded text-xs break-all">
    {user.publicKey}
  </div>
  
  <nav class="mt-4">
    <ul class="flex space-x-4 text-sm">
      <li class="text-green-400">coins held</li>
      <li>replies</li>
      <li>notifications</li>
      <li>coins created</li>
      <li>followers</li>
      <li>following</li>
    </ul>
  </nav>
  
  <button class="mt-4 border border-gray-600 px-3 py-1 rounded-md text-sm">Add coin</button>
</div>