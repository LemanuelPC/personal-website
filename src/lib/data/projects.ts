// Placeholder content mirroring the Figma frames — replace with real projects.
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
	/** Which pages feature this project */
	shelf: ('work' | 'play')[];
	/** Featured in the Explore carousel */
	bestRun?: boolean;
};

export const projects: Project[] = [
	{
		slug: 'company-01',
		title: 'Village Du Soir/Company 01.',
		description: 'A nightlife discovery app. I shipped production code for the app.',
		tools: ['HTML', 'CSS', 'JavaScript'],
		liveUrl: 'https://example.com',
		githubUrl: 'https://github.com/LemanuelPC',
		frame: 'phone',
		shelf: ['work'],
		bestRun: true
	},
	{
		slug: 'company-02',
		title: 'Company 02.',
		description:
			'Describe what the company or business does in 1–2 sentences. Then describe your role in the project and what you worked on.',
		tools: ['HTML', 'CSS', 'JavaScript'],
		liveUrl: 'https://example.com',
		githubUrl: 'https://github.com/LemanuelPC',
		logoText: 'Company Logo',
		shelf: ['work'],
		bestRun: true
	},
	{
		slug: 'company-03',
		title: 'Company 03.',
		description:
			'Describe what the company or business does in 1–2 sentences. Then describe your role in the project and what you worked on.',
		tools: ['HTML', 'CSS', 'JavaScript'],
		liveUrl: 'https://example.com',
		logoText: 'Company Logo',
		shelf: ['work'],
		bestRun: true
	},
	{
		slug: 'company-04',
		title: 'Company 04.',
		description:
			'Describe what the company or business does in 1–2 sentences. Then describe your role in the project and what you worked on.',
		tools: ['HTML', 'CSS', 'JavaScript'],
		githubUrl: 'https://github.com/LemanuelPC',
		logoText: 'Company Logo',
		shelf: ['work']
	},
	{
		slug: 'experiment-01',
		title: 'Experiment 01.',
		description: 'A prototype made for fun. Describe what it does and what you learned from it.',
		tools: ['HTML', 'CSS', 'JavaScript'],
		githubUrl: 'https://github.com/LemanuelPC',
		logoText: 'Company Logo',
		shelf: ['play']
	},
	{
		slug: 'experiment-02',
		title: 'Experiment 02.',
		description: 'A prototype made for fun. Describe what it does and what you learned from it.',
		tools: ['HTML', 'CSS', 'JavaScript'],
		githubUrl: 'https://github.com/LemanuelPC',
		logoText: 'Company Logo',
		shelf: ['play']
	}
];
