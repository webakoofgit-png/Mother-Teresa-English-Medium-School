import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each([
    '/about/principal-message', '/foundation', '/academics/pre-primary',
    '/academics/primary-secondary', '/academics/higher-secondary', '/admissions',
    '/facilities', '/events/n2', '/gallery', '/achievements', '/notices/n1',
    '/downloads', '/contact', '/login', '/student/dashboard', '/student/profile',
    '/student/homework', '/student/fees', '/student/attendance', '/student/timetable',
    '/student/exams', '/student/results', '/student/notices', '/student/materials',
    '/student/calendar', '/student/settings', '/admin/dashboard', '/admin/students',
    '/admin/students/new', '/admin/students/s1', '/admin/admissions', '/admin/classes',
    '/admin/teachers', '/admin/homework', '/admin/fees', '/admin/attendance',
    '/admin/timetable', '/admin/exams', '/admin/results', '/admin/notices',
    '/admin/website-content', '/admin/gallery', '/admin/foundation', '/admin/reports',
    '/admin/settings',
  ])('matches the complete route %s', path => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const match = router.matchRoutes(path).at(-1);
    expect(match?.routeId).not.toBe(rootRouteId);
    expect(match?.pathname).toBe(path);
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
