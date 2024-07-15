<script lang='ts'>
  import Logo from "../../assets/cube.svg"
  import Wallet from "./wallet.svelte";
  
  function viewProfile() {
    window.location.href = '/profile';
  }
</script>

<!-- <nav class=" text-white p-4 flex px-12 items-center justify-between">
	<div class="flex items-center space-x-2">
		<div class="size-10">
			<Logo />
		</div>
		<div>
			<span class="font-bold text-xl">SwapBox</span>
		</div>
	</div>
	<div class="flex items-center space-x-8">
		<a href="/swap" class="hover:text-gray-400">APP</a>
		<a href="/docs" class="hover:text-gray-400">DOCS</a>
		<Wallet />
	 -->

<nav class="">
	<div class="hidden lg:block">
		<div class=" md:p-5 flex justify-between items-stretch gap-2.5">
			<div class="rounded-md bg-background-inverse h-fit flex navbar-logo px-1.5 py-[7px] pr-3">
				<a class="flex items-center gap-1" href="/">
					<div class="w-9 h-9 inline-block relative"></div>
					<div class="relative" style="width:100.42px;height:16.65px">
						<img
							alt="logo-words"
							loading="eager"
							decoding="async"
							data-nimg="fill"
							class="will-change-transform transition duration-200 flex-shrink-0 min-w-[100.42px]"
							style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
							src="/assets/images/logo-words.svg"
						/>
					</div>
				</a>
			</div>
			<div class="rounded-md bg-background-inverse py-2 px-2 flex-1 h-[50px]">
				<div class="flex items-center gap-1.5">
					<a
						class="flex items-center justify-center text-text-on-fill text-base leading-[110%] gt-standard-mono px-3 py-2 rounded-md hover:bg-[#F5F5F5] hover:text-black"
						href="/pricing">Pricing</a
					>
					<a
						class="flex items-center justify-center text-text-on-fill text-base leading-[110%] gt-standard-mono px-3 py-2 rounded-md hover:bg-[#F5F5F5] hover:text-black"
						href="/features">Features</a
					>
					<a
						class="flex items-center justify-center text-text-on-fill text-base leading-[110%] gt-standard-mono px-3 py-2 rounded-md hover:bg-[#F5F5F5] hover:text-black"
						target="_blank"
						href="https://forum.cursor.com">Forum</a
					>
					<a
						class="flex items-center justify-center text-text-on-fill text-base leading-[110%] gt-standard-mono px-3 py-2 rounded-md hover:bg-[#F5F5F5] hover:text-black"
						target="_blank"
						href="https://docs.cursor.com">Docs</a
					>
					<a
						class="flex items-center justify-center text-text-on-fill text-base leading-[110%] gt-standard-mono px-3 py-2 rounded-md hover:bg-[#F5F5F5] hover:text-black"
						target="_blank"
						href="https://anysphere.inc">Careers</a
					>
					<a
						class="flex items-center justify-center text-text-on-fill text-base leading-[110%] gt-standard-mono px-3 py-2 rounded-md hover:bg-[#F5F5F5] hover:text-black"
						href="/blog">Blog</a
					>
				</div>
			</div>
			<a
				class="flex items-center justify-center text-base leading-[110%] gt-standard-mono rounded-md bg-background-inverse text-text-on-fill hover:bg-[#333] hover:text-[#fff] px-6 py-4 h-[50px]"
				href="/api/auth/login">Sign In</a
			>
			<button
				class="flex items-center justify-center text-base py-1.5 leading-[110%] gap-2 cursor-pointer gt-standard-mono *:gt-standard-mono hover:bg-[#2E53CC] bg-button-background text-text-on-fill px-[18px] rounded-md h-[50px]"
				>Download</button
			>
		</div>
	</div>
	<div class="flex h-full w-full items-center lg:hidden">
		<div class="flex justify-between bg-black items-center w-full rounded-md px-2 py-1.5">
			<a class="flex items-center gap-1.5" href="/">
				<img
					alt="logo"
					loading="lazy"
					width="24"
					height="24"
					decoding="async"
					data-nimg="1"
					style="color:transparent"
					srcSet="/_next/image?url=%2Fassets%2Fimages%2Flogo.png&amp;w=32&amp;q=75 1x, /_next/image?url=%2Fassets%2Fimages%2Flogo.png&amp;w=48&amp;q=75 2x"
					src="/_next/image?url=%2Fassets%2Fimages%2Flogo.png&amp;w=48&amp;q=75"
				/>
				<img
					alt="logo-words"
					loading="lazy"
					width="80.33600000000001"
					height="13.32"
					decoding="async"
					data-nimg="1"
					style="color:transparent"
					src="/assets/images/logo-words.svg"
				/>
			</a>
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				class="text-white h-6 w-6"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M432 176H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 272H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 368H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16z"
				></path>
			</svg>
		</div>
	</div>
</nav>

