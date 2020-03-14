import https, { RequestOptions } from 'https';
import { URL } from "url";

export function get(url: URL, options: RequestOptions = {}): Promise<any> {
  return request(url, null, { ...options, method: 'GET' })
}

export function post(url: URL, data: object, options: RequestOptions = {}): Promise<any> {
  return request(url, data, { ...options, method: 'POST' })
}

export function put(url: URL, data: object, options: RequestOptions = {}): Promise<any> {
  return request(url, data, { ...options, method: 'PUT' })
}

function request(url: URL, data: object | null, options: RequestOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    const defaults: RequestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { "User-Agent": "HeightGo" },
    };

    // Create and prepare request
    const req = https.request({ ...defaults, ...options }, res => {
      const chunks: any = [];
      res.on("data", d => (chunks.push(d)));
      res.on("end", () => {
        resolve(JSON.parse(Buffer.concat(chunks).toString('UTF-8')));
      });
    });

    // Reject request, if we've got error
    req.on("error", e => {
      console.error(e);
      reject(e);
    });

    // Write data if we have any
    if (data) {
      req.write(JSON.stringify(data));
    }

    // Send request
    req.end();
  });
}
