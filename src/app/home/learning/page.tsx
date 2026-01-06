import { getScamBriefs } from "./lib/getScamBriefs";
import LearnClient from "@/components/LearnClient";

export default async function LearnPage() {
  const briefs = await getScamBriefs();

  return (
    <LearnClient briefs={briefs} />
  );
}
