<script>
  export let user = {};
  // Add logic to fetch user data
</script>

<div class="bg-gray-900 text-white p-3 sm:p-4 rounded-lg">
  <div class="flex flex-col sm:flex-row items-center sm:items-start mb-4">
    <img src={user.avatar} alt="User avatar" class="w-16 h-16 sm:w-12 sm:h-12 rounded-full mb-2 sm:mb-0 sm:mr-4">
    <div class="text-center sm:text-left">
      <h2 class="text-xl font-bold">{user.username}</h2>
      <p class="text-xs sm:text-sm text-gray-400">{user.followers} followers</p>
    </div>
  </div>
  
  <button class="w-full sm:w-auto bg-gray-700 px-3 py-1 rounded-md text-sm mb-3 sm:mb-0">Edit profile</button>
  
  <div class="mt-4 grid grid-cols-2 gap-2 text-center sm:text-left">
    <p class="text-xs sm:text-sm">Likes received: {user.likes}</p>
    <p class="text-xs sm:text-sm">Mentions received: {user.mentions}</p>
  </div>
  
  <div class="mt-4 bg-gray-800 p-2 rounded text-xs break-all">
    {user.publicKey}
  </div>
  
  <nav class="mt-4 overflow-x-auto">
    <ul class="flex space-x-2 sm:space-x-4 text-xs sm:text-sm whitespace-nowrap">
      <li class="text-green-400">coins held</li>
      <li>replies</li>
      <li>notifications</li>
      <li>coins created</li>
      <li>followers</li>
      <li>following</li>
    </ul>
  </nav>
  
  <button class="mt-4 w-full sm:w-auto border border-gray-600 px-3 py-1 rounded-md text-sm">Add coin</button>
</div>