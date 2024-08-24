<script>
  let balance = 0;
  let amount = 0;
  let message = '';

  function deposit() {
    if (amount > 0) {
      balance += amount;
      message = `Successfully deposited ${amount} coins.`;
      amount = 0;
    } else {
      message = 'Please enter a valid amount to deposit.';
    }
  }

  function withdraw() {
    if (amount > 0 && amount <= balance) {
      balance -= amount;
      message = `Successfully withdrawn ${amount} coins.`;
      amount = 0;
    } else if (amount > balance) {
      message = 'Insufficient balance.';
    } else {
      message = 'Please enter a valid amount to withdraw.';
    }
  }
</script>

<main class="min-h-screen bg-black-400 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
  <div class="bg-gray-800 text-white p-8 rounded-lg shadow-2xl w-full max-w-md">
    <h1 class="text-3xl font-bold mb-6 text-center bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 nova-mono-regular flex items-center justify-center">
      <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" class="inline-block mr-2">
        <path d="M2 17.0601H12" stroke="#FFFFFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.21997 13.5H9.78003C11.56 13.5 12 13.94 12 15.7V19.81C12 21.57 11.56 22.01 9.78003 22.01H4.21997C2.43997 22.01 2 21.57 2 19.81V15.7C2 13.94 2.43997 13.5 4.21997 13.5Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 9C2 5.13 5.13 2 9 2L7.95001 3.75" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18.5 11C20.9853 11 23 8.98528 23 6.5C23 4.01472 20.9853 2 18.5 2C16.0147 2 14 4.01472 14 6.5C14 8.98528 16.0147 11 18.5 11Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Crypto Wallet
    </h1>
    
    <div class="bg-gray-700 p-4 rounded-md mb-6 text-center">
      <p class="text-lg font-semibold text-gray-300">Current Balance</p>
      <p class="text-4xl font-bold text-purple-400 nova-mono-regular">{balance.toFixed(2)} coins</p>
    </div>

    <div class="mb-4">
      <input 
        type="number" 
        bind:value={amount} 
        min="0" 
        step="0.01" 
        placeholder="Enter amount" 
        class="w-full p-2 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
    </div>

    <div class="flex space-x-4 mb-4">
      <button 
        on:click={deposit}
        class="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 4v16m8-8H4" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Deposit
      </button>
      <button 
        on:click={withdraw}
        class="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 20V4m-8 8h16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Withdraw
      </button>
    </div>

    {#if message}
      <p class="text-sm text-center p-2 rounded-md {message.includes('Successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
        {message}
      </p>
    {/if}
  </div>
</main>
