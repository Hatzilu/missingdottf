'use client';
import Image from 'next/image';
import Form from './components/Form';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center gap-5 p-24">
			<div className="inline-block w-full">
				<a href={process.env.GITHUB_LINK} target="_blank" rel="noopener noreferrer">
					<Image src="/github-mark-white.svg" width={50} height={50} alt="GitHub" />
				</a>
			</div>
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 text-stone-200 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200  lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-stone-700/30">
					View every missing item from your Team Fortress 2 inventory.&nbsp;
				</p>
				<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none dark:from-black dark:via-black">
					<a
						className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
						href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						By{' '}
						<Image
							src="/vercel.svg"
							alt="Vercel Logo"
							className="dark:invert"
							width={100}
							height={24}
							priority
						/>
					</a>
				</div>
			</div>

			<Form />
		</main>
	);
}
