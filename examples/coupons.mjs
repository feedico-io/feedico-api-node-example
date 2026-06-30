import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FeedicoClient } from '../src/feedicoClient.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(root, '.env');

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const eq = trimmed.indexOf('=');
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

const token = process.env.FEEDICO_API_TOKEN?.trim();
if (!token) {
  console.error('Set FEEDICO_API_TOKEN in .env (see .env.example).');
  process.exit(1);
}

const page = Number(process.env.FEEDICO_PAGE ?? 1);
const pageSize = Number(process.env.FEEDICO_PAGE_SIZE ?? 10);
const provider = process.env.FEEDICO_PROVIDER || null;
const firmName = process.env.FEEDICO_FIRM_NAME || null;

const client = new FeedicoClient(token);

try {
  const payload = await client.listCoupons(page, pageSize, provider, firmName);
  const rows = FeedicoClient.extractRows(payload);
  console.log(`Coupons on page ${page}: ${rows.length}\n`);
  for (const row of rows) {
    const title = row.title ?? row.description ?? '(no title)';
    const code = row.couponCode ?? row.code ?? '';
    const merchant = row.firmName ?? row.merchantName ?? '';
    const ends = row.endsAt ?? row.endDate ?? '';
    let line = `- ${title}`;
    if (code) line += ` | code: ${code}`;
    if (merchant) line += ` | ${merchant}`;
    if (ends) line += ` | until ${ends}`;
    console.log(line);
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
