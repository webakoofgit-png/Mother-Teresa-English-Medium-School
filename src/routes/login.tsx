import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/portal";
export const Route = createFileRoute("/login")({ component: LoginPage });
