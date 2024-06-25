<script lang='ts'>
  import Logo from "../../assets/sunny.jpeg"
  import Plug from "$lib/components/plug.svelte";
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

<nav class="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg text-gray-100 p-4 flex items-center justify-between border-b border-gray-800">
  <div class="flex items-center space-x-3">
    <img src={Logo} alt="Logo" class="h-12 w-12 rounded-full logo-spin">
    <div>
      <span class="font-bold text-2xl text-white">Fudit.fun</span>
      <span class="text-sm block text-green-400">Pumpy Release</span>
    </div>
  </div>
  <div class="flex items-center space-x-8">
    <a href="#" class="nav-link hover:text-green-400 font-medium">DEBUG</a>
    <a href="#" class="nav-link hover:text-green-400 font-medium">WHITE-PAPER</a>
    <Plug/>
  </div>
</nav>