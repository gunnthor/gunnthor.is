# Setting up gunnthor@gunnthor.is

Goal: mail sent to `gunnthor@gunnthor.is` arrives in Gmail, and the address can
go live on the site.

## Current DNS state

Verified 22 August 2026:

| Record | Value |
| ------ | ----- |
| NS     | `ns1.vercel-dns.com`, `ns2.vercel-dns.com` |
| A (apex) | `64.29.17.65`, `216.198.79.1` (Vercel) |
| A (www)  | `64.29.17.1`, `216.198.79.65` (Vercel) |
| MX     | **none** |
| TXT    | **none** |

Two things follow from this:

1. **DNS is hosted at Vercel.** Records get added in the Vercel dashboard, not at
   ISNIC. ISNIC is the registrar; it is not answering DNS queries.
2. **There is nothing to preserve.** No MX, no SPF, no verification TXT. Adding
   mail records cannot break existing mail, because there is no existing mail.

## The thing to understand first

Email *forwarding* only solves **receiving**. It gets mail from
`gunnthor@gunnthor.is` into your Gmail inbox, and that is all it does.

**Replying is a separate problem.** Gmail's "Send mail as" needs a real outbound
SMTP server to send from an address it does not own. Every free forwarding tier
is inbound-only, so with a free plan your replies still leave as
`gunnthor0405@gmail.com` — which somewhat defeats putting the domain address on
the site.

So the real choice is: free and receive-only, or a few dollars a month and a
proper two-way address.

## Options

| Option | Cost | Receives | Sends as | Nameserver change? |
| ------ | ---- | -------- | -------- | ------------------ |
| **ImprovMX** free | Free | Yes (25 aliases, 1 domain, 500/day) | No | No — stays on Vercel |
| **Forward Email** free | Free | Yes (unlimited domains, open source) | No | No — stays on Vercel |
| **Forward Email** paid | ~$3/mo | Yes | **Yes** (SMTP) | No — stays on Vercel |
| **ImprovMX** Premium | ~$9/mo | Yes | **Yes** (SMTP) | No — stays on Vercel |
| **Cloudflare Email Routing** | Free | Yes | No | **Yes — moves DNS off Vercel** |
| **Google Workspace** | ~$7/mo | Yes (real mailbox) | Yes, natively | No |

Notes:

- **Cloudflare is not recommended here.** It is free and good, but it requires
  moving the nameservers off Vercel, which means re-creating the site's DNS
  records at Cloudflare. That is real risk for zero gain over ImprovMX.
- Vercel has a **built-in DNS preset for ImprovMX**, which makes that the
  lowest-friction path: it writes the MX and SPF records for you.
- Vercel does not provide mailboxes or forwarding itself. It only hosts the DNS.

## Recommended path

**Start free with ImprovMX to confirm delivery works. Upgrade only if you want
to reply from the address.**

1. Sign up at [improvmx.com](https://improvmx.com) and add the domain
   `gunnthor.is`.
2. Create the alias `gunnthor@gunnthor.is` → `gunnthor0405@gmail.com`.
3. In the Vercel dashboard: **Domains → gunnthor.is → Add DNS Preset → ImprovMX**.
   This adds the two MX records and the SPF TXT record automatically.

   If you would rather add them by hand, ImprovMX's records are:

   ```
   MX   @   mx1.improvmx.com   priority 10
   MX   @   mx2.improvmx.com   priority 20
   TXT  @   v=spf1 include:spf.improvmx.com ~all
   ```

   Take the exact values from the ImprovMX dashboard at the time — do not trust
   the ones written here if they disagree.
4. Wait for propagation, then confirm from a terminal:

   ```sh
   nslookup -type=MX gunnthor.is
   nslookup -type=TXT gunnthor.is
   ```
5. **Send a real test message** from an outside account and confirm it lands in
   Gmail.

### Only then, switch it on in the site

In `src/content/site.ts`:

```ts
export const EMAIL: string | null = INTENDED_EMAIL;
```

Commit and push; Vercel redeploys automatically. The address then appears in the
header, footer and contact section. Until that change, the site shows no email
at all — there is never a dead `mailto:` link in production.

### If you want to reply as gunnthor@gunnthor.is

Upgrade to a plan with SMTP (Forward Email at ~$3/mo is the best value), then in
Gmail: **Settings → Accounts and Import → Send mail as → Add another email
address**, and enter the SMTP host, port, username and password from that
provider. Gmail sends a confirmation code to the address — which will arrive via
the forwarding you already set up.

## Sources

- [Vercel: managing DNS records](https://vercel.com/docs/domains/managing-dns-records)
- [Vercel KB: using email with your Vercel domain](https://vercel.com/kb/guide/using-email-with-your-vercel-domain)
- [ImprovMX Vercel setup guide](https://improvmx.com/guides/vercel/)
- [Forward Email: Vercel guide](https://forwardemail.net/en/guides/vercel)
- [Forward Email vs ImprovMX comparison](https://forwardemail.net/en/blog/forward-email-vs-improvmx-email-service-comparison)
- [Cloudflare Email Routing limitations](https://community.cloudflare.com/t/limitations-of-email-routing/449895)
