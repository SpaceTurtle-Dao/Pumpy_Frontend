<script lang='ts'>
  import Logo from "../../assets/cube.svg"
  import Plug from "$lib/components/plug.svelte";
  import { Router, Route } from "svelte-routing";
  
  function viewProfile() {
    window.location.href = '/profile';
  }
</script>

<style>
  @import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';

  .nav-link {
    position: relative;
    overflow: hidden;
    transition: color 0.3s ease;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4ade80;
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .logo-spin {
    transition: transform 0.5s ease;
  }

  .logo-spin:hover {
    transform: rotate(360deg);
  }

  main {
    padding-top: 72px; /* Adjust based on your navbar height */
  }
</style>

<nav class="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg text-gray-100 p-2 sm:p-4 flex flex-col sm:flex-row items-center justify-between border-b border-gray-800">
  <div class="flex items-center space-x-3 mb-2 sm:mb-0">
    <img src={Logo} alt="Logo" class="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full logo-spin">
    <div>
      <span class="font-bold text-lg sm:text-xl md:text-2xl text-white">Fudit.fun</span>
      <span class="text-xs sm:text-sm block text-green-400">Pumpy Release</span>
    </div>
  </div>
  <div class="flex flex-wrap justify-center sm:justify-end items-center space-x-2 sm:space-x-4 md:space-x-8">
    <a href="#" class="nav-link hover:text-green-400 text-xs sm:text-sm md:text-base font-medium">DEBUG</a>
    <a href="#" class="nav-link hover:text-green-400 text-xs sm:text-sm md:text-base font-medium">WHITE-PAPER</a>
    <Plug/>
    <button 
      on:click={viewProfile}
      class="bg-green-500 hover:bg-green-600 text-white font-bold text-xs sm:text-sm py-1 px-2 sm:py-1 sm:px-3 md:py-2 md:px-4 rounded transition duration-300 ease-in-out mt-2 sm:mt-0"
    >
      View Profile
    </button>
  </div>
</nav>

