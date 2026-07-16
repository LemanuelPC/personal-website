// Real project lineup. Card images are added under /static as screenshots become
// available; until then a project shows its `logoText` wordmark in the frame.
export type Project = {
	slug: string;
	title: string;
	description: string;
	tools: string[];
	liveUrl?: string;
	githubUrl?: string;
	/** Path under /static, shown inside the card's device frame */
	image?: string;
	/** Shown when there is no image */
	logoText?: string;
	/** Device frame style on the Work/Play cards */
	frame?: 'phone' | 'wide';
	/** Extra related links (e.g. a companion app), shown as additional keycaps */
	links?: { label: string; url: string }[];
	/** Which pages feature this project */
	shelf: ('work' | 'play')[];
	/** Featured in the Explore carousel */
	bestRun?: boolean;
};

export const projects: Project[] = [
	{
		slug: 'village-du-soir',
		title: 'Village Du Soir.',
		description:
			'A production platform for a Geneva nightlife venue: an Odoo 18 ERP, a React Native app, a customized POS and Adyen payments. I built the v2 mobile app end-to-end and authored most of the backend’s custom modules.',
		tools: [
			'Odoo',
			'Python',
			'PostgreSQL',
			'Redis',
			'React Native',
			'Expo',
			'TypeScript',
			'Adyen',
			'Docker'
		],
		liveUrl: 'https://villagedusoir.com',
		links: [
			{ label: 'App Store', url: 'https://apps.apple.com/ch/app/village-du-soir/id6654923415' },
			{ label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.eclypsys.vds' }
		],
		image: '/projects/village-du-soir.webp',
		logoText: 'Village Du Soir',
		frame: 'phone',
		shelf: ['work'],
		bestRun: true
	},
	{
		slug: 'unw-hunt-tracker',
		title: 'UNW Hunt Tracker.',
		description:
			'A live web app used weekly by a 100+ member gaming guild. An Excel→PostgreSQL pipeline feeds a Flask API with JWT role-based access, a tri-lingual dashboard, and real-time recalculation over server-sent events.',
		tools: ['Python', 'Flask', 'PostgreSQL', 'JWT', 'bcrypt', 'openpyxl', 'Jinja', 'gunicorn'],
		liveUrl: 'https://unw-weekly-hunt.onrender.com',
		githubUrl: 'https://github.com/LemanuelPC/unw-hunt-tracker',
		links: [{ label: 'Flutter app', url: 'https://github.com/LemanuelPC/unw-hunt-mobile' }],
		image: '/projects/unw-hunt-tracker.webp',
		logoText: 'UNW Hunt',
		frame: 'wide',
		shelf: ['work'],
		bestRun: true
	},
	{
		slug: 'angella-tham',
		title: 'Angella Tham.',
		description:
			'A designer’s portfolio site I recovered from its deployed source map, then rebuilt on Vite + React 19 + Tailwind 4, halving the bundle and swapping a hardcoded password for PBKDF2 + AES-GCM client-side encryption.',
		tools: ['React', 'Vite', 'Tailwind', 'React Router', 'Lottie', 'Web Crypto', 'Vitest'],
		liveUrl: 'https://angellatham.com',
		githubUrl: 'https://github.com/LemanuelPC/angellatham-portfolio',
		image: '/projects/angella-tham.webp',
		logoText: 'Angella Tham',
		frame: 'wide',
		shelf: ['work'],
		bestRun: true
	},
	{
		slug: 'lepc-dev',
		title: 'This Site.',
		description:
			'The site you’re on, built in SvelteKit with Svelte 5 runes, hand-crafted from my own Figma brand, with theming and micro-interactions coded from scratch rather than pulled from a component library.',
		tools: ['SvelteKit', 'Svelte 5', 'TypeScript', 'Vite'],
		liveUrl: 'https://lepc.dev',
		githubUrl: 'https://github.com/LemanuelPC/personal-website',
		image: '/projects/lepc-dev.webp',
		logoText: 'lepc.dev',
		frame: 'wide',
		shelf: ['work'],
		bestRun: true
	},
	{
		slug: 'karaoke-room',
		title: 'Karaoke Room.',
		description:
			'A self-hosted karaoke system: a Python ML pipeline separates vocals from instruments and aligns lyrics word-by-word (with CJK romanization), a Tauri big-screen player mixes the stems live, and phones act as remotes.',
		tools: [
			'Python',
			'PyTorch',
			'CUDA',
			'Demucs',
			'WhisperX',
			'CREPE',
			'FastAPI',
			'Rust',
			'Tauri',
			'Svelte'
		],
		githubUrl: 'https://github.com/LemanuelPC/karaoke-room',
		image: '/projects/karaoke-room.webp',
		logoText: 'Karaoke Room',
		frame: 'wide',
		shelf: ['play'],
		bestRun: true
	},
	{
		slug: 'slug-ball-showdown',
		title: 'SlugBall Showdown.',
		description:
			'A two-player arcade football game in Java with a hand-written 2D physics engine: vectors, gravity, collision reflection and a fixed-timestep game loop, all coded from scratch on a bare graphics library.',
		tools: ['Java', 'Ant', 'Simple Graphics'],
		githubUrl: 'https://github.com/LemanuelPC/Slug_Ball_Showdown',
		image: '/projects/slug-ball-showdown.webp',
		logoText: 'SlugBall',
		frame: 'wide',
		shelf: ['play']
	},
	{
		slug: 'nineties-chatroom',
		title: 'The 90s.',
		description:
			'A real-time 90s-music debate arena: pick a side, argue it out in a live Socket.IO chatroom, then the room votes on the winner. Built on Express, Redis and PostgreSQL with a server-driven timer, voting and leaderboard, all wired up with docker-compose.',
		tools: ['Node.js', 'Express', 'Socket.IO', 'Redis', 'PostgreSQL', 'bcrypt', 'Docker'],
		githubUrl: 'https://github.com/LemanuelPC/nineties-chatroom',
		image: '/projects/nineties-chatroom.webp',
		logoText: 'The 90s',
		frame: 'wide',
		shelf: ['play']
	},
	{
		slug: 'battleship-royale',
		title: 'Battleship Royale.',
		description:
			'A networked, text-based Battleship in Java: several clients connect over TCP to a concurrent server, with the shared game state and turn-taking guarded against the races and deadlocks that come with real multiplayer.',
		tools: ['Java', 'TCP', 'Concurrency'],
		githubUrl: 'https://github.com/LemanuelPC/battleship-royale',
		image: '/projects/battleship-royale.webp',
		logoText: 'Battleship Royale',
		frame: 'wide',
		shelf: ['play']
	},
	{
		slug: 'savesync',
		title: 'SaveSync.',
		description:
			'A config-driven CLI that syncs PC game saves between machines using a USB drive as the go-between. It knows where each game hides its saves, checksums every copy, and never deletes a save it hasn’t already backed up.',
		tools: ['Python', 'rich', 'PyYAML', 'argparse', 'pytest'],
		githubUrl: 'https://github.com/LemanuelPC/savesync',
		image: '/projects/savesync.webp',
		logoText: 'SaveSync',
		frame: 'wide',
		shelf: ['play']
	},
	{
		slug: 'spotify-smart-control',
		title: 'Spotify Smart Control.',
		description:
			'A Node.js service that steers Spotify playback from your activity, talking to the Spotify Web API with token refresh and a set of automation rules so the right music follows what you’re doing.',
		tools: ['Node.js', 'Express', 'Spotify API', 'Tampermonkey', 'active-win', 'Vitest'],
		githubUrl: 'https://github.com/LemanuelPC/spotify-smart-control',
		image: '/projects/spotify-smart-control.webp',
		logoText: 'Spotify Control',
		frame: 'wide',
		shelf: ['play']
	}
];
