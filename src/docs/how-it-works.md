## How Open Store Works?

Open Store is a decentralized protocol for publishing and distributing applications and other digital assets with verifiable authenticity, transparent governance, and no royalty fees. This page explains why it exists, who participates, how the system flows end‑to‑end, and—most importantly—how it stays safe and where it can still be attacked.

### Why Open Store

- **Opaque publishing becomes transparent**: Traditional app stores are black boxes. A single insider or compromised publisher key can ship a malicious update. Open Store makes core metadata public on‑chain and validates artifacts and ownership to reduce single points of failure.
- **Censorship resistance with responsible limits**: The catalog is permissionless by default and on‑chain data is always queryable by address. Harmful, purpose‑built content (Appendix A) may be hidden from search while remaining accessible by direct address.
- **Human bottlenecks are minimized**: Publication flows are machine‑checkable: artifact structure, signatures, and ownership proofs are codified and verified by clients and daemon.
- **Fair, explicit fees—not revenue cuts**: No royalties. Publishers pay explicit network/storage fees and can optimize distribution costs via custom links/CDNs.
- **Self‑custody first**: Developers control their apps; users retain the final say, with local artifact verification before installation.

### Main Actors

- **Publisher**: Creates apps, uploads artifacts, pays fees, and initiates ownership verification.
 
- **Oracle**: Fetches and compares Web2 ownership data (e.g., `/.well-known/assetlinks.json`) with on‑chain ownership info to confirm domain↔app linkage. Centralized initially; planned to decentralize.
- **Broadcaster**: Daemon/API that syncs on‑chain data to a database and serves it to clients in a friendly format; optional Stats service.
- **Owner**: Maintains protocol parameters and governance; may be a DAO over time.
- **User**: Installs and updates apps using the Open Store App; performs local validation before install.

### Where You Can Participate

- **Publish**: Create a `Publisher`, define an `Asset`, prove ownership, upload artifacts, and publish.
- **Operate Oracles (future)**: Run decentralized ownership oracles once stabilized.
- **Run Daemon/API nodes**: Provide API/Sync/Stats for the ecosystem.
- **Build Clients and Tools**: Open Store App, Studio, CLIs, explorers, and dashboards.
- **Govern**: Participate in parameter setting, DAO releases, and protocol upgrades.

## The Main Workflow

TL;DR of the happy path:

1. A Publisher creates and configures a Publisher Account contract.
2. The Publisher creates a new Asset (Application) contract.
3. The Publisher specifies the Ownership Info for the new Asset (website domain, certificate hashes, X509 certificates and proofs of ownership for those certificates).
4. The Publisher sends the Ownership Info for Ownership Verification.
5. The Oracle performs Ownership Verification.
6. A Daemon performs Proof Validation if Ownership Verification was Successful.
7. The Publisher uploads an Asset Artifact (the file for the new Asset version).
8. (Optional) The Publisher can add custom distribution links for the Asset Artifact (e.g., CDN).
9. The Daemon synchronizes the necessary data from the Blockchain to a DB.
10. The API provides data to users from the DB in a structured format if it passed Ownership Validation and Proof Validation.
11. The User sync data from chain and perform Proof Validation and Artifact Validation on his own.
12. The User interacts with the Asset (Asset Artifact) through an application.

### Processes

#### Proof Validation

1. Sync `OwnershipInfo` from chain (domain, SHA‑256 certificate fingerprints, X509 DER certificates, proofs).
2. For each fingerprint, compute the message `caip2ChainId::appAddress::sha256CertificateFingerprint`.
3. Use the public key from the provided X509 certificate to verify the corresponding proof signature.
4. Store validation status in the daemon’s DB; the API surfaces only assets that passed Ownership Verification and Proof Validation.

#### Artifact Validation

1. Resolve the latest artifact and metadata from chain/API.
2. Download the artifact from the provided links (CDN/Greenfield).
3. Extract signer certificates and verify signatures (e.g., APK Signing V2).
4. Compare extracted certificate fingerprints to `OwnershipInfo` fingerprints.
5. Verify the artifact checksum matches the on‑chain value.
6. If any check fails, block installation.

Related guides:
- Publishing process: [Publishing Process](./publishing-process.md)
- Ownership details: [Ownership Verification](./ownership-verification.md)
- Fees overview: [Billing and Fees](./billing-and-fees.md)
- Custom CDN/links: [Custom Distribution](./custom-distribution.md)

## Security Model and Threats

Security is layered: on‑chain truth, daemon‑based proof validation, and mandatory local verification by the client before install. Below is a concise threat model covering trust boundaries, defenses, attacks, and residual risks.

### Trust Boundaries and Sources of Truth

- **On‑chain metadata is canonical**: Build info and ownership data live on chain (BSC/opBSC/Greenfield refs), recorded via `OpenStore` and plugins.
- **Web2 proofs are cross‑checked**: Oracles fetch published ownership files (e.g., Android `assetlinks.json`) and compare to on‑chain fingerprints.
- **Client performs final checks**: Before install, the client validates artifact checksum, certificate fingerprints, and proof‑of‑ownership with the public key in the artifact itself.

### Defenses in Depth

- **Separation of concerns**: Critical logic can be isolated from fast‑changing UI modules; governance (DAO) can gate critical releases.
- **Ownership verification**: Fingerprints in `OwnershipInfo` must match those served by the endpoint; proofs are signatures over `caip2ChainId::appAddress::sha256CertificateFingerprint` using the certificate’s private key, and the X509 certificate is stored alongside for verification.
- **Artifact validation**: Clients parse and verify structure/signature (e.g., APK Signing V2), verify checksum integrity, and ensure ownership linkage before install.
- **Catalog gating, not censorship**: Harmful categories may be hidden from search; everything remains fetchable by on‑chain address unless the publisher restricts visibility at contract level.

### Key Attack Scenarios and Mitigations

- **Malicious update by a legitimate publisher**
  - Vector: A publisher signs a harmful artifact with their valid certificate.
  - Detection/Mitigation: Clients verify integrity and signer but cannot detect malicious intent if the signer is legitimate. Defense shifts to governance for critical modules, staged rollouts, community audit, and optional DAO‑gated releases. Publishers should use hardware‑backed keys and segregate critical logic.

- **Signing key compromise**
  - Vector: Attacker steals the certificate private key and signs a malicious artifact.
  - Mitigation: Rapid rotation of `OwnershipInfo` to remove compromised fingerprints; require re‑verification; optionally pause publication. Long‑term: multi‑party signing, split critical logic, and DAO approvals for critical modules.

- **Oracle compromise or failure**
  - Vector: Oracle misreports ownership, or endpoint is hijacked.
  - Mitigation: Oracle only gates ownership verification; artifact integrity and local checks still apply. On‑chain fingerprints must already match what the endpoint serves—domain control alone is insufficient. Future decentralization and multi‑oracle consensus reduce single‑oracle risk.

 

- **Distribution tampering (CDN/Man‑in‑the‑middle)**
  - Vector: Alter artifact in transit or serve a different file.
  - Mitigation: Clients fetch download refs from chain and verify checksum, signature, and certificate fingerprints before install.

- **Rollback/downgrade attempts**
  - Vector: Serve older vulnerable versions as “latest.”
  - Mitigation: Clients and services prefer freshest publication with monotonic `versionCode`. Governance/publisher visibility controls can hide compromised lines.

- **Storage or chain downtime**
  - Vector: Greenfield/BSC outages disrupt sync.
  - Mitigation: Temporary outages may delay API freshness; clients can still validate artifacts locally before install.

- **Spam and invalid submissions**
  - Vector: Flood with junk submissions.
  - Mitigation: Oracle fee throttles spam; API only surfaces assets that passed the required checks.

### Guarantees and Limits

- **Strong guarantees**: On‑chain auditability, verifiable linkage of domain↔app↔certificate, artifact integrity/signature checks, and mandatory local verification before install.
- **Known limits**: If a legitimate signing key is used to intentionally ship malware, cryptographic checks will pass. Mitigations rely on governance for critical components, supply‑chain discipline, staged rollout, anomaly detection, and fast key rotation.

### Best Practices for Safety

- Use hardware‑backed signing keys; segregate prod/test signing.
- Isolate critical modules; consider DAO‑gated releases for them.
- Rotate keys and update `OwnershipInfo` promptly if compromise is suspected.
- Enable reproducible builds and publish checksums; engage community audits.
- Monitor oracle health and daemon sync; diversify infrastructure across regions/providers.

## Quick Start Checklists

### Publisher

1. Create `Publisher`; fund Greenfield via cross‑chain; create bucket.
2. Create `Asset`; fill metadata; connect Ownership/Builds/Distribution.
3. Add `OwnershipInfo` (endpoint, SHA‑256 fingerprints, X509 certificate, proofs); request verification.
4. Upload artifact; publish.
5. Optionally add CDN distribution links with `${VERSION_CODE}`/`${VERSION_NAME}`/`${REF_ID}`.

 

---

For background and formal definitions, see the whitepaper sections on Motivation, Principles, Glossary, Workflow, and Fees. If you’re new, start with [Publishing Process](./publishing-process.md) and [Ownership Verification](./ownership-verification.md).
