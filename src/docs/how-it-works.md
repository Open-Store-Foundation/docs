## How Open Store Works?

Open Store is a decentralized protocol for publishing and distributing applications and other digital assets with verifiable authenticity, transparent governance, and no royalty fees. This page explains why it exists, who participates, how the system flows end‑to‑end, and—most importantly—how it stays safe and where it can still be attacked.

### Why Open Store

- **Opaque publishing becomes transparent**: Traditional app stores are black boxes. A single insider or compromised publisher key can ship a malicious update. Open Store makes core metadata public on‑chain and validates artifacts and ownership to reduce single points of failure.
- **Censorship resistance with responsible limits**: The catalog is permissionless by default and on‑chain data is always queryable by address. Harmful, purpose‑built content (Appendix A) may be hidden from search while remaining accessible by direct address.
- **Human bottlenecks are minimized**: Publication flows are machine‑checkable: artifact structure, signatures, ownership proofs, and validator voting are all codified and economically incentivized.
- **Fair, explicit fees—not revenue cuts**: No royalties. Publishers pay explicit network/storage/validation fees and can optimize distribution costs via custom links/CDNs.
- **Self‑custody first**: Developers control their apps; users retain the final say, with local artifact verification before installation.

### Main Actors

- **Publisher**: Creates apps, uploads artifacts, pays fees, and initiates ownership and artifact validation.
- **Validator**: Verifies artifacts, proposes blocks, votes, and finalizes results on‑chain. Staked with proposal/vote penalties for misbehavior or inactivity.
- **Oracle**: Fetches and compares Web2 ownership data (e.g., `/.well-known/assetlinks.json`) with on‑chain ownership info to confirm domain↔app linkage. Centralized initially; planned to decentralize.
- **Broadcaster**: Daemon/API that syncs on‑chain data to a database and serves it to clients in a friendly format; optional Stats service.
- **Owner**: Maintains protocol parameters and governance; may be a DAO over time.
- **User**: Installs and updates apps using the Open Store App; performs local validation before install.

### Where You Can Participate

- **Publish**: Create a `Publisher`, define an `Asset`, prove ownership, upload artifacts, and publish.
- **Validate**: Run a validator node, stake, verify artifacts, propose and vote on blocks, earn rewards.
- **Operate Oracles (future)**: Run decentralized ownership oracles once stabilized.
- **Run Broadcaster nodes**: Provide API/Sync/Stats for the ecosystem.
- **Build Clients and Tools**: Open Store App, Studio, CLIs, explorers, and dashboards.
- **Govern**: Participate in parameter setting, DAO releases, and protocol upgrades.

## The Main Workflow

TL;DR of the happy path:

1. **Create Publisher**: The publisher creates a `Publisher` (name, storage). A Greenfield bucket is initialized via cross‑chain operations.
2. **Create App**: Define `Asset` (package name, name/description, platform/category, protocolId) and connect base plugins (Ownership, Builds, Distribution).
3. **Prove Ownership**: Save `OwnershipInfo` (endpoint domain, certificate SHA‑256 fingerprints, and `ProofOfCertificateOwnership`) and request Ownership Verification. Oracle compares `/.well-known/assetlinks.json` fingerprints to on‑chain fingerprints.
4. **Upload Artifact**: Upload the asset artifact (e.g., Android APK) to storage; optionally add custom distribution links (CDN) with templated params.
5. **Request Artifact Validation**: Pay Validation Fee; validators download and verify structure/signatures, compare versionCode/name/checksum and ownership proofs.
6. **Block Lifecycle**: Validators propose blocks with batched validation results, vote, and finalize. Stakes and penalties align incentives.
7. **Publish and Discover**: On success, the artifact is marked valid and can be published. Catalog/search (via API) shows verified apps; everything remains accessible by address on chain.
8. **Install with Local Checks**: The client fetches download links from chain and performs local verification (checksum, certificate fingerprints, proof signature) before installation.

Related guides:
- Publishing process: [Publishing Process](./publishing-process.md)
- Ownership details: [Ownership Verification](./ownership-verification.md)
- Fees overview: [Billing and Fees](./billing-and-fees.md)
- Custom CDN/links: [Custom Distribution](./custom-distribution.md)

## Security Model and Threats

Security is layered: on‑chain truth, independent validator checks with economic incentives, and mandatory local verification by the client before install. Below is a concise threat model covering trust boundaries, defenses, attacks, and residual risks.

### Trust Boundaries and Sources of Truth

- **On‑chain metadata is canonical**: Build info, ownership data, and validation results live on chain (BSC/opBSC/Greenfield refs), recorded via `OpenStore` and plugins.
- **Web2 proofs are cross‑checked**: Oracles fetch published ownership files (e.g., Android `assetlinks.json`) and compare to on‑chain fingerprints.
- **Client performs final checks**: Before install, the client validates artifact checksum, certificate fingerprints, and proof‑of‑ownership with the public key in the artifact itself.

### Defenses in Depth

- **Separation of concerns**: Critical logic can be isolated from fast‑changing UI modules; governance (DAO) can gate critical releases.
- **Ownership verification**: Fingerprints in `OwnershipInfo` must match those served by the endpoint; proofs are signatures over `APP_ADDRESS::SHA256_CERT_FINGERPRINT` using the certificate’s private key.
- **Artifact validation**: Validators parse and verify structure/signature (e.g., APK Signing V2), versioning monotonicity, checksum integrity, and ownership linkage.
- **Economic alignment**: Proposal/vote stakes and penalties discourage invalid blocks and inactivity; Validation/Oracle fees align rewards.
- **UNAVAILABLE handling**: Partial chain/storage outages are encoded explicitly; fees for such requests are neither paid out nor refunded, reducing attack surface.
- **Catalog gating, not censorship**: Harmful categories may be hidden from search; everything remains fetchable by on‑chain address unless the publisher restricts visibility at contract level.

### Key Attack Scenarios and Mitigations

- **Malicious update by a legitimate publisher**
  - Vector: A publisher signs a harmful artifact with their valid certificate.
  - Detection/Mitigation: Validators and clients verify integrity and signer but cannot detect malicious intent if the signer is legitimate. Defense shifts to governance for critical modules, staged rollouts, community audit, and optional DAO‑gated releases. Publishers should use hardware‑backed keys and segregate critical logic.

- **Signing key compromise**
  - Vector: Attacker steals the certificate private key and signs a malicious artifact.
  - Mitigation: Rapid rotation of `OwnershipInfo` to remove compromised fingerprints; require re‑verification; optionally pause publication. Long‑term: multi‑party signing, split critical logic, and DAO approvals for critical modules.

- **Oracle compromise or failure**
  - Vector: Oracle misreports ownership, or endpoint is hijacked.
  - Mitigation: Oracle only gates ownership verification; artifact integrity and local checks still apply. On‑chain fingerprints must already match what the endpoint serves—domain control alone is insufficient. Future decentralization and multi‑oracle consensus reduce single‑oracle risk.

- **Validator collusion to approve invalid artifacts**
  - Vector: Colluding validators propose/vote a block with incorrect results.
  - Mitigation: Independent recomputation and economic penalties for losing votes; discussion rounds for conflicting blocks; and crucially, the client will still reject artifacts failing local verification. UNAVAILABLE masking rules prevent gaming during outages.

- **Distribution tampering (CDN/Man‑in‑the‑middle)**
  - Vector: Alter artifact in transit or serve a different file.
  - Mitigation: Clients fetch download refs from chain and verify checksum, signature, and certificate fingerprints before install.

- **Rollback/downgrade attempts**
  - Vector: Serve older vulnerable versions as “latest.”
  - Mitigation: Validators enforce monotonic `versionCode` per app for validated artifacts; clients prefer freshest validated publication. Governance/publisher visibility controls can hide compromised lines.

- **Storage or chain downtime**
  - Vector: Greenfield/BSC outages disrupt validation.
  - Mitigation: Mark requests UNAVAILABLE; no fee payout/refund; retry later without skewing incentives. Local install remains possible when data and checks succeed.

- **Spam and invalid submissions**
  - Vector: Flood validation with junk.
  - Mitigation: Explicit Validation/Oracle fees and proposal/vote economics throttle spam; API only surfaces assets that passed the required checks.

### Guarantees and Limits

- **Strong guarantees**: On‑chain auditability, verifiable linkage of domain↔app↔certificate, artifact integrity/signature checks, incentivized validator consensus, and mandatory local verification before install.
- **Known limits**: If a legitimate signing key is used to intentionally ship malware, cryptographic checks will pass. Mitigations rely on governance for critical components, supply‑chain discipline, staged rollout, anomaly detection, and fast key rotation.

### Best Practices for Safety

- Use hardware‑backed signing keys; segregate prod/test signing.
- Isolate critical modules; consider DAO‑gated releases for them.
- Rotate keys and update `OwnershipInfo` promptly if compromise is suspected.
- Enable reproducible builds and publish checksums; engage community audits.
- Monitor validator/oracle health; diversify infrastructure across regions/providers.

## Quick Start Checklists

### Publisher

1. Create `Publisher`; fund Greenfield via cross‑chain; create bucket.
2. Create `Asset`; fill metadata; connect Ownership/Builds/Distribution.
3. Add `OwnershipInfo` (endpoint, SHA‑256 fingerprints, proofs); request verification.
4. Upload artifact; request Artifact Validation; publish on success.
5. Optionally add CDN distribution links with `${VERSION_CODE}`/`${VERSION_NAME}`/`${REF_ID}`.

### Validator

1. Run validator node; deposit stake; register (respect Minimum Stake).
2. Validate artifacts; propose/vote within the Proposal Window.
3. Handle UNAVAILABLE appropriately; avoid penalties; finalize blocks.

---

For background and formal definitions, see the whitepaper sections on Motivation, Principles, Glossary, Workflow, and Fees. If you’re new, start with [Publishing Process](./publishing-process.md) and [Ownership Verification](./ownership-verification.md).
