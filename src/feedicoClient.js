const API_ROOT = 'https://api.feedico.io/api/v1';

export class FeedicoClient {
  /** @param {string} token */
  constructor(token) {
    this.token = token.trim();
    if (!this.token) throw new Error('FEEDICO_API_TOKEN is required.');
  }

  listMerchants(page = 1, pageSize = 50, provider = null, firmName = null) {
    return this.post(`${API_ROOT}/me/networks`, this.listBody(page, pageSize, provider, firmName));
  }

  listCoupons(page = 1, pageSize = 50, provider = null, firmName = null) {
    return this.post(`${API_ROOT}/me/coupons`, this.listBody(page, pageSize, provider, firmName));
  }

  /** @param {unknown} payload @returns {Record<string, unknown>[]} */
  static extractRows(payload) {
    if (Array.isArray(payload)) return payload.filter((row) => row && typeof row === 'object');
    if (payload && typeof payload === 'object') {
      for (const key of ['networks', 'coupons', 'items']) {
        const nested = /** @type {Record<string, unknown>} */ (payload)[key];
        if (Array.isArray(nested)) return nested.filter((row) => row && typeof row === 'object');
      }
    }
    return [];
  }

  /** @param {string} url @param {Record<string, unknown>} body */
  async post(url, body) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(90_000),
    });

    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error(`Invalid JSON from Feedico (HTTP ${response.status}).`);
    }

    if (!response.ok) {
      const message = data?.error || data?.message || `HTTP ${response.status}`;
      throw new Error(String(message));
    }
    return data;
  }

  listBody(page, pageSize, provider, firmName) {
    return {
      page: Math.max(1, page),
      pageSize: Math.max(1, Math.min(500, pageSize)),
      provider,
      firmName: firmName ?? '',
    };
  }
}
