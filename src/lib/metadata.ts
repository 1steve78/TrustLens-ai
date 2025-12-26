import https from "https";
import tls from "tls";

export async function getDomainMetadata(url: string) {
  let domainAgeDays = 0;
  let sslValid = false;

  try {
    const hostname = new URL(url).hostname;

    // SSL check
    await new Promise<void>((resolve, reject) => {
      const req = https.get(
        { host: hostname, method: "GET", timeout: 3000 },
        (res) => {
          sslValid = !!(res.socket instanceof tls.TLSSocket && (res.socket.authorized || !!res.socket.getPeerCertificate()));
          resolve();
        }
      );
      req.on("error", reject);
      req.on("timeout", reject);
    });

    // TEMP domain age (mock for now)
    // Real WHOIS comes later
    domainAgeDays = Math.floor(Math.random() * 60) + 1;

  } catch (err) {
    console.error("Metadata error:", err);
  }

  return {
    domainAgeDays,
    sslValid,
  };
}
