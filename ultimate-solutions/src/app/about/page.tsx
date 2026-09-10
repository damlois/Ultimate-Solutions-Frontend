import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/ui/Reveal";
import { IconBadge, type IconBadgeColor } from "@/components/ui/IconBadge";
import { ABOUT, VISION_MISSION_OBJECTIVE } from "@/lib/site";
import { Eye, Sparkles, Target } from "lucide-react";

const ACCENT_COLORS: IconBadgeColor[] = ["purple", "fuchsia", "blue"];
const CARD_TINTS = ["bg-violet-200/70", "bg-fuchsia-200/70", "bg-sky-200/70"];
const TEAM_TINTS = ["bg-violet-100", "bg-sky-100", "bg-amber-100", "bg-emerald-100"];

const PILLARS = [
	{ key: "vision", label: "Vision", icon: Eye, text: VISION_MISSION_OBJECTIVE.vision },
	{ key: "mission", label: "Mission", icon: Sparkles, text: VISION_MISSION_OBJECTIVE.mission },
	{ key: "objective", label: "Objective", icon: Target, text: VISION_MISSION_OBJECTIVE.objective },
] as const;

const TEAM = [
	{
		name: "Anuoluwapo Soremekun",
		role: "Chief Executive Director",
		src: "/team/Anuoluwapo%20Soremekun.jpeg",
	},
	{
		name: "Gbadebo Adewale",
		role: "Chief Operating Officer",
		src: "/team/Gbadebo%20Adewale.jpeg",
	},
	{
		name: "Emmanuel Adegbola",
		role: "Brand Identity Expert",
		src: "/team/Emmanuel%20Adegbola.png",
	},
	{
		name: "Oluwanifesimi Ariyo",
		role: "Human Resource Personnel",
		src: "/team/Oluwanifesimi%20Ariyo.jpg",
	},
] as const;

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />

			<main className="relative">
				<div className="absolute inset-0 -z-10 overflow-hidden">
					<div className="absolute -top-32 right-[-140px] h-[420px] w-[420px] rounded-full bg-ultimate-purple/15 blur-3xl animate-float-slow" />
					<div className="absolute top-[520px] left-[-160px] h-[380px] w-[380px] rounded-full bg-sky-500/10 blur-3xl animate-float-slower" />
				</div>

				<div className="container-page py-14 sm:py-18 space-y-16">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground hover:-translate-x-0.5 transition-all"
					>
						<span className="text-lg leading-none">←</span> Back to home
					</Link>

					<div className="grid gap-10 lg:grid-cols-2 lg:items-center">
						<Reveal>
							<div className="space-y-4">
								<div className="inline-flex items-center gap-2 rounded-full border border-ultimate-purple/20 bg-ultimate-purple/5 px-3 py-1 text-xs font-semibold text-ultimate-purple">
									<span className="h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
									About
								</div>

								<h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-balance">
									A <span className="text-gradient">digital tech ecosystem</span>{" "}
									built for growth
								</h1>
								<p className="text-muted whitespace-pre-line leading-relaxed">
									{ABOUT}
								</p>

								<div className="flex flex-wrap gap-3 pt-2">
									<Link
										href="/#contact"
										className="inline-flex h-11 items-center justify-center rounded-full bg-ultimate-purple px-6 text-sm font-semibold text-white hover:bg-ultimate-purple-2 hover:-translate-y-0.5 transition-all"
									>
										Work with us
									</Link>
									<Link
										href="/work"
										className="inline-flex h-11 items-center justify-center rounded-full bg-ultimate-purple/5 px-6 text-sm font-semibold text-ultimate-purple hover:bg-ultimate-purple/10 hover:-translate-y-0.5 transition-all"
									>
										View portfolio
									</Link>
								</div>
							</div>
						</Reveal>

						<Reveal delay={120}>
							<div className="relative">
								<div className="absolute -inset-3 rounded-[2rem] bg-gradient-brand opacity-30 blur-2xl -z-10" />
								<div className="rounded-3xl overflow-hidden bg-card shadow-2xl shadow-ultimate-purple/15">
									<div className="relative aspect-[4/5] w-full bg-card">
										<Image
											src="https://images.pexels.com/photos/16323586/pexels-photo-16323586.jpeg?auto=compress&cs=tinysrgb&w=1400"
											alt="Laptop workspace for a digital tech ecosystem"
											fill
											sizes="(max-width: 1024px) 100vw, 520px"
											className="object-cover"
											priority
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
									</div>
								</div>
							</div>
						</Reveal>
					</div>

					<section className="grid gap-4 md:grid-cols-3">
						{PILLARS.map((p, i) => (
							<Reveal key={p.key} delay={i * 100}>
								<div
									className={[
										"h-full rounded-3xl p-8 shadow-sm transition-all duration-300",
										"hover:-translate-y-1.5 hover:rotate-1 hover:shadow-xl",
										CARD_TINTS[i % CARD_TINTS.length],
									].join(" ")}
								>
									<IconBadge icon={p.icon} color={ACCENT_COLORS[i % ACCENT_COLORS.length]} className="bg-white shadow-sm" />
									<div className="mt-5 font-display text-lg font-semibold">{p.label}</div>
									<p className="mt-3 text-sm text-[#150419]/70 leading-relaxed">{p.text}</p>
								</div>
							</Reveal>
						))}
					</section>

					<section aria-label="Team" className="space-y-6">
						<Reveal>
							<div className="space-y-2">
								<div className="inline-flex items-center gap-2 rounded-full border border-ultimate-purple/20 bg-ultimate-purple/5 px-3 py-1 text-xs font-semibold text-ultimate-purple">
									<span className="h-1.5 w-1.5 rounded-full bg-ultimate-purple" />
									Team
								</div>
								<h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
									Meet the people behind the work
								</h2>
								<p className="text-muted max-w-2xl">
									An excellent, focused team built around creativity, execution, and
									delivery.
								</p>
							</div>
						</Reveal>

						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{TEAM.map((m, i) => (
								<Reveal key={m.name} delay={i * 90}>
									<div
										className={[
											"group h-full rounded-3xl p-6 overflow-hidden shadow-sm transition-all duration-300",
											"hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-xl",
											TEAM_TINTS[i % TEAM_TINTS.length],
										].join(" ")}
									>
										<div className="relative">
											<div className="absolute -inset-10 bg-gradient-to-br from-ultimate-purple/15 via-transparent to-transparent blur-2xl" />
											<div className="relative aspect-[4/4] w-full rounded-2xl bg-card overflow-hidden shadow-md">
												<Image
													src={m.src}
													alt={m.name}
													fill
													sizes="(max-width: 1024px) 100vw, 360px"
													className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
												/>
											</div>
										</div>

										<div className="mt-5">
											<div className="font-display text-lg font-semibold md:whitespace-nowrap">
												{m.name}
											</div>
											<div className="text-sm text-muted">{m.role}</div>
										</div>
									</div>
								</Reveal>
							))}
						</div>
					</section>
				</div>
			</main>

			{/* Webinar Banner */}
			<div className="noise-overlay relative w-full overflow-hidden bg-gradient-to-r from-ultimate-purple to-fuchsia-700 py-10">
				<div className="absolute -top-16 left-1/4 h-52 w-52 rounded-full bg-white/10 blur-3xl animate-float-slow" />
				<div className="absolute -bottom-16 right-1/4 h-52 w-52 rounded-full bg-white/10 blur-3xl animate-float-slower" />
				<div className="container-page relative flex flex-col items-center justify-center gap-4 text-center text-white">
					<div className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
						Want to see how we work up close?
					</div>
					<p className="max-w-lg text-sm text-white/80">
						Join our free webinar and learn how we help brands design, build, and grow.
					</p>
					<Link
						href="https://tinyurl.com/sorexineaskmeanything"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 font-semibold text-ultimate-purple shadow-lg hover:bg-gray-100 hover:-translate-y-0.5 transition-all"
					>
						Register for our free webinar
					</Link>
				</div>
			</div>

			<Footer />
		</div>
	);
}

