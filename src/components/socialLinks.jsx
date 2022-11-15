import {
	FaGithubAlt,
	FaLinkedinIn,
	FaTwitter,
	FaEnvelope,
	FaMastodon
} from "react-icons/fa/index";

export default function SocialLinks() {
	return (
		<ul className="flex flex-1 items-center gap-x-4 sm:flex-initial">
			<li>
				<a
					className="inline-block py-2 px-1 text-lg sm:hover:text-link"
					href="https://github.com/RatulMaharaj"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithubAlt />
					<span className="sr-only">Github</span>
				</a>
			</li>
			<li>
				<a
					className="inline-block py-2 px-1 text-lg sm:hover:text-link"
					href="https://fosstodon.org/@RatulMaharaj"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaMastodon />
					<span className="sr-only">Mastodon</span>
				</a>
			</li>
			<li>
				<a
					className="inline-block px-1 py-2 text-lg sm:hover:text-link"
					href="https://linkedin.com/in/ratulmaharaj"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLinkedinIn />
					<span className="sr-only">LinkedIn</span>
				</a>
			</li>
			<li>
				<a
					className="inline-block px-1 py-2 text-lg sm:hover:text-link"
					href="https://twitter.com/RatulMaharaj"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaTwitter />
					<span className="sr-only">Twitter</span>
				</a>
			</li>
			<li>
				<a
					className="inline-block px-1 py-2 text-lg sm:hover:text-link"
					href="mailto:ratulmaharaj@looped.co.za"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaEnvelope />
					<span className="sr-only">Email</span>
				</a>
			</li>
		</ul>
	);
}
