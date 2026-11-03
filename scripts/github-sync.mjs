import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const target = 'https://github.com/webakoofgit-png/Mother-Teresa-English-Medium-School.git';
const root = process.cwd().replaceAll('\\', '/');
function git(args, { quiet = false, allowFailure = false } = {}) {
  const result = spawnSync('git', ['-c', `safe.directory=${root}`, ...args], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, env: process.env });
  if (result.error) throw result.error;
  if (!quiet) { if (result.stdout) process.stdout.write(result.stdout); if (result.stderr) process.stderr.write(result.stderr); }
  if (result.status !== 0 && !allowFailure) throw new Error(`Git ${args[0]} exited with ${result.status}`);
  return result;
}
function audit() {
  const paths = git(['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { quiet: true }).stdout.split('\0').filter(Boolean);
  const unique = [...new Set(paths)];
  const blocked = [];
  for (const file of unique) {
    if (/^(?:node_modules|\.npm-cache|\.output|\.git|\.wrangler|\.tanstack)\//.test(file) || /(?:^|\/)\.env(?:\.|$)/.test(file) && !file.endsWith('.env.example')) blocked.push(file);
    if (!/\.(?:tsx?|jsx?|mjs|json|md|yml|yaml|toml|txt)$/.test(file) || !fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    if (/gh[pousr]_[A-Za-z0-9]{25,}|\bsk-(?:proj-)?[A-Za-z0-9_-]{35,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text)) blocked.push(file);
  }
  if (blocked.length) throw new Error(`Review excluded or sensitive files before staging: ${blocked.join(', ')}`);
  console.log(`Reviewed ${unique.length} project files; generated directories and secrets are excluded.`);
}
const action = process.argv[2];
if (action === 'inspect') {
  git(['status', '--short']); audit();
} else if (action === 'prepare') {
  audit();
  const files = git(['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { quiet: true }).stdout.split('\0').filter(Boolean);
  for (const file of new Set(files)) {
    if (!/\.(?:tsx?|css|mjs|json)$/.test(file) || !fs.existsSync(file)) continue;
    const original = fs.readFileSync(file, 'utf8');
    const normalized = original.replace(/[ \t]+$/gm, '').trimEnd() + '\n';
    if (normalized !== original) fs.writeFileSync(file, normalized);
  }
  git(['config', 'core.autocrlf', 'false']);
  const remote = git(['remote', 'get-url', 'origin'], { quiet: true, allowFailure: true });
  if (remote.status !== 0) git(['remote', 'add', 'origin', target]);
  else if (remote.stdout.trim() !== target) throw new Error('Origin points to a different repository.');
  git(['add', '--all']); git(['diff', '--cached', '--check']); git(['diff', '--cached', '--stat']);
} else if (action === 'commit') {
  audit(); git(['commit', '-m', process.argv.slice(3).join(' ') || 'Update school website']);
} else if (action === 'push') {
  if (git(['remote', 'get-url', 'origin'], { quiet: true }).stdout.trim() !== target) throw new Error('Unexpected remote.');
  git(['push', '--set-upstream', 'origin', 'main']);
} else if (action === 'verify') {
  const local = git(['rev-parse', 'HEAD'], { quiet: true }).stdout.trim();
  const remote = git(['ls-remote', 'origin', 'refs/heads/main'], { quiet: true }).stdout.split(/\s/)[0];
  if (local !== remote) throw new Error('Remote main does not match the local commit.');
  console.log(`Verified GitHub main: ${local}`); git(['status', '--short']);
} else throw new Error('Choose inspect, prepare, commit, push or verify.');
