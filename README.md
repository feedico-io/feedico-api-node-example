# Feedico API — Node.js example

> Fetch **merchants** and **coupons** from [Feedico](https://feedico.io) with native `fetch` — zero npm dependencies.

**Website:** [feedico.io](https://feedico.io) · **Documentation:** [feedico.io/docs](https://feedico.io/docs)

`feedico` · `coupon-api` · `affiliate-api` · `merchants` · `coupons` · `rest-api` · `nodejs` · `javascript` · `api-example`

---

## Quick start

```bash
git clone https://github.com/feedico-io/feedico-api-node-example.git
cd feedico-api-node-example
cp .env.example .env
# Paste your fdco_… Bearer token

npm run merchants
npm run coupons
```

**Requirements:** Node.js 18+

---

## API endpoints

| Resource | Method | URL |
|----------|--------|-----|
| Merchants | `POST` | `https://api.feedico.io/api/v1/me/networks` |
| Coupons | `POST` | `https://api.feedico.io/api/v1/me/coupons` |

Auth: `Authorization: Bearer fdco_your_token`

Details: **[feedico.io/docs](https://feedico.io/docs)**

---

## Use in your app

```javascript
import { FeedicoClient } from './src/feedicoClient.js';

const client = new FeedicoClient(process.env.FEEDICO_API_TOKEN);
const payload = await client.listCoupons(1, 100);
const rows = FeedicoClient.extractRows(payload);
```

Works in Next.js route handlers, Cloudflare Workers, and plain Node scripts.

---

## Related projects

| Repo | Stack |
|------|--------|
| [feedico-api-php-example](https://github.com/feedico-io/feedico-api-php-example) | PHP |
| [feedico-api-python-example](https://github.com/feedico-io/feedico-api-python-example) | Python |
| [feedico-api-csharp-example](https://github.com/feedico-io/feedico-api-csharp-example) | C# |
| [feedico-api-postman](https://github.com/feedico-io/feedico-api-postman) | Postman |
| [feedico-etl-starter](https://github.com/feedico-io/feedico-etl-starter) | ETL |
| [feedico-wp-plugin](https://github.com/feedico-io/feedico-wp-plugin) | WordPress |

---

## License

MIT — [feedico.io](https://feedico.io) · [Documentation hub](https://feedico.io/docs)
