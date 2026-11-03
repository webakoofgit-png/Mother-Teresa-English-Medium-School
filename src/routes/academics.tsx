import { createFileRoute } from "@tanstack/react-router";
import { PublicPage } from "@/components/website/public-pages";
export const Route = createFileRoute("/academics")({ component: PublicPage });
