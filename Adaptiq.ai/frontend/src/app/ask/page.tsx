import { AppShell } from "@/components/AppShell";
import { AskChat } from "@/components/AskChat";
import { PageIntro } from "@/components/FeatureViews";

export default function AskPage() {
	return <AppShell><PageIntro eyebrow="AdaptIQ workspace" title="Ask AdaptIQ AI" description="Your personal AI learning companion." /><AskChat /></AppShell>;
}
