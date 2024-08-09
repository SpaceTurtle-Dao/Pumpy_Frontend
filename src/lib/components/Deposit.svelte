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

<main class="min-h-screen flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-2xl w-96">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Crypto Wallet</h1>
    
    <div class="bg-gray-500 p-4 rounded-md mb-6">
      <p class="text-lg font-semibold text-gray-700">Current Balance</p>
      <p class="text-4xl font-bold text-purple-600">{balance.toFixed(2)} coins</p>
    </div>

    <div class="mb-4">
      <input 
        type="number" 
        bind:value={amount} 
        min="0" 
        step="0.01" 
        placeholder="Enter amount" 
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
    </div>

    <div class="flex space-x-4 mb-4">
      <button 
        on:click={deposit}
        class="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
      >
        Deposit
      </button>
      <button 
        on:click={withdraw}
        class="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
      >
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