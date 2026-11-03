import { createFileRoute } from "@tanstack/react-router";
import { Portal } from "@/components/portal";
export const Route = createFileRoute("/admin/dashboard")({ component: Portal });
