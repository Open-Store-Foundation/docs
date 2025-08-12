# Terms of Service

Effective date: 2025-01-01

These Terms of Service ("Terms") govern your access to and use of the Open Store protocol and related interfaces and software operated or published by Open Store Foundation ("we", "us", "our"), including the Dev Console (website), API backend, Node validator software, and Store applications (collectively, the "Services"). The protocol operates on public blockchain networks (the "Networks").

By using the Services, you agree to these Terms. If you do not agree, do not use the Services.

## 1. Nature of the protocol

- The Open Store protocol is a public, permissionless system for publishing and discovering application metadata and files on the Networks.
- Information written to the Networks is public, replicated by independent parties, and may be immutable. We cannot remove or alter on-chain or Greenfield content.
- Our role is to provide reference interfaces, caches, and indexes that help users discover public data recorded on the Networks.

## 2. Components and data flow

- Dev Console (website): reads application and publisher data directly from the Networks. Publishing actions you take via the Dev Console result in transactions you authorize with your wallet.
- API node (backend): synchronizes public data from the Networks, builds searchable indexes and validation artifacts, and serves read APIs. Its caches mirror on-chain/Greenfield data without altering it.
- Store applications: query our API node (backend), which maintains synchronized caches and indexes of already public on-chain/Greenfield content for performance and discovery.
- Node validator: reference software that independent operators may run to validate packages and mirror public data. Independent operators act under their own policies.

Direct-address access: even if we hide certain applications from charts or name-based search, applications remain accessible by their precise address or content hash. In this mode, the interface functions as a blockchain explorer and may fetch data directly from the Networks, bypassing our backend.

## 3. Eligibility and compliance

You must have the authority to agree to these Terms and comply with applicable laws. You are responsible for your actions and any content you publish.

## 4. Your content and license

- When you publish application metadata or files, you instruct the protocol to make that content publicly available on the Networks.
- You represent that you have all rights necessary to publish the content and that the content does not infringe the rights of others or violate applicable law.
- You grant us and independent operators a non-exclusive, worldwide, royalty-free license to index, cache, reproduce, and display your public content as necessary to operate discovery, validation, and archival functions.

## 5. Discovery moderation (Discovery Exclusion List)

We may, at our discretion, hide applications from charts and name-based search when their primary function falls within the Discovery Exclusion List below. Hidden applications remain accessible by direct address or content hash.

Enforcement actions may include: exclusion from leaderboards, search, and curated views; labeling; rate-limiting; and removal from our off-chain caches. These actions do not alter or remove on-chain or Greenfield content.

### Discovery Exclusion List (high-risk categories)

If an application's or file's primary function is any of the following, it is hidden from general discovery and remains available only via direct address:

- Sale of prohibited goods and substances: heavy narcotics; forged documents and currency; stolen goods and property.
- Cybercrime and malicious activity: malware and spyware; hacking-for-hire and intrusion tools; carding and theft of financial credentials.
- Financial crimes and fraud: money laundering; scams and fraud schemes; sale of stolen data.
- Violence, extremism, and exploitation: child sexual abuse material (CSAM); human trafficking and exploitation; contract killing; terrorism.
- Invasion of privacy: sale of personal information (doxxing); unlawful surveillance and wiretapping.

Illustrative examples are provided in Appendix A. Borderline cases are evaluated based on overall design, marketing, user expectations, and the application's primary function.

## 6. Prohibited conduct

You agree not to use the Services to:

- Publish content with a primary function listed in the Discovery Exclusion List.
- Violate laws or the rights of others, including intellectual property, privacy, and publicity rights.
- Interfere with the security or integrity of the Services or the Networks, including spam, DDoS, or abuse of rate limits.
- Circumvent technical measures designed to protect users or the Services.

## 7. Wallets and security

You are responsible for safeguarding your wallet credentials and private keys. Transactions you authorize are final. We do not custody keys and cannot reverse transactions.

## 8. Third-party services and operators

Wallets, RPC providers, validators, mirrors, and Store hosts may be operated by independent third parties under their own terms and policies. We are not responsible for their services.

## 9. Intellectual property

The protocol specifications, reference clients, and our interfaces are provided under their respective licenses. Trademarks, logos, and branding are our property or that of their owners and may not be used without permission.

## 10. Disclaimers

THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT CONTROL THE NETWORKS AND DO NOT GUARANTEE THE AVAILABILITY, ACCURACY, OR INTEGRITY OF ON-CHAIN OR GREENFIELD CONTENT.

## 11. Limitation of liability

TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICES. OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES WILL NOT EXCEED US$100.

## 12. Indemnity

You agree to indemnify and hold harmless Open Store Foundation and its contributors, operators, and service providers from any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or related to your use of the Services or your violation of these Terms or applicable law.

## 13. Takedown and disputes about content

Because on-chain/Greenfield content is public and decentralized, we cannot remove it from the Networks. Where legally required and feasible, we may remove or disable access to content in our own interfaces and caches and will consider properly scoped notices. This may result in discovery delisting while leaving direct-address access intact.

## 14. Changes to the Services and Terms

We may modify the Services or these Terms at any time. Changes take effect when posted. If you continue to use the Services after changes are posted, you accept the changes.

## 15. Governing law

These Terms are governed by the laws applicable to the place of organization of Open Store Foundation, without regard to conflict of laws principles. Where local law prohibits certain uses, you must not use the Services for those purposes.

## 16. Contact

Open Store Foundation
Email: legal@openstore.foundation

---

## Appendix A — Illustrative examples

Example 1 (Allowed): General-purpose messenger used by some for unlawful deals
Consider a standard messaging app — "ChatSphere" — offering end-to-end encryption, group chats, file sharing, and voice calls. The developers did not design or market ChatSphere for criminal activity; it is a general-purpose communication tool.

Why this is allowed:

- The app’s core functionality is neutral and suitable for lawful communication.
- The developers do not advertise ChatSphere as a marketplace for drugs or other prohibited goods.
- Blocking ChatSphere due to misuse by some users would punish many legitimate users who rely on it for work, study, and staying in touch.

Conclusion: if someone uses ChatSphere to arrange illegal transactions, that is misuse of a neutral tool and not grounds to delist the app from discovery.

Example 2 (Not allowed): App purpose-built for selling illegal drugs
Now consider another app — "DrugDirect" — whose design, interface, and functionality are purpose-built for the sale of hard drugs:

- On launch, DrugDirect opens a catalog with photos, prices, and seller ratings.
- The main screen features buttons like "Heroin", "Cocaine", and "Secure delivery".
- The store description promises "Fast and anonymous deals, no questions asked." 

Why this is prohibited:

- Primary purpose: The app is explicitly designed to facilitate illegal trade.
- User expectations: UI and marketing promise convenient access to prohibited substances.
- Ecosystem risk: Allowing such an app would materially aid organized crime and endanger users.

Enforcement: DrugDirect is hidden from the general catalog and excluded from search. It remains reachable only by direct link or precise address, which prevents accidental discovery and avoids active promotion of criminal content.

## Appendix B — Discovery Exclusion List

If an application's or file's primary function is any of the following, it is hidden from general discovery and remains available only via direct address:

Sale of prohibited goods and substances

- Hard drugs
- Forged documents and currency
- Stolen goods and property

Cybercrime and malicious activity

- Malware and spyware
- Hacking-for-hire and intrusion tools
- Carding and theft of financial credentials

Financial crimes and fraud

- Money laundering
- Scams and fraud schemes
- Sale of stolen data

Violence, extremism, and exploitation

- Child sexual abuse material (CSAM)
- Human trafficking and exploitation
- Contract killing
- Terrorism

Invasion of privacy and confidentiality

- Sale of personal information (doxxing)
- Unlawful surveillance and wiretapping
