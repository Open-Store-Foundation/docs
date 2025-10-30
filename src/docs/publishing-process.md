# Publishing Process

This guide describes the end‑to‑end publishing flow for publishers: what data you need, how Ownership Verification works, publishing variants, and how availability works in the app and explorer modes.

## What you need to provide

### Create a Developer (Publisher)

- Name: unique developer username
- File Storage: Greenfield (a bucket will be created and funded via cross‑chain)
- Initial Greenfield balance: to cover storage and download quotas

### Create an App

- PackageName: unique text identifier (immutable)
- Name: display name
- Description: app description
- PlatformId: e.g., Android (immutable)
- ProtocolId: where app metadata is stored
- CategoryId: app category

### Ownership Info (for Android)

- Asset Endpoint: your website domain (e.g., https://example.com)
- Certificate SHA‑256 Fingerprints: all signing cert fingerprints
- X509 DER Certificate (bytes): the certificate corresponding to each fingerprint
- ProofOfCertificateOwnership: signature over 'caip2ChainId::appAddress::sha256CertificateFingerprint'

### Artifact (Build) Info

- APK file: upload a valid, properly signed Android APK; Open Store Studio parses it automatically
- Auto‑extracted: versionCode (integer), versionName (string), checksum (file hash validated before install)
- Set by Studio after upload: refId (on‑chain/file reference id), protocolId (storage protocol id)
- Versioning: each new artifact must have a versionCode strictly higher than the last successfully validated version

## Oracle verification

For full details, see [Ownership Verification](/docs/ownership-verification).

Ownership Verification checks that your app is linked to your domain:

- The oracle fetches $ENDPOINT/.well-known/assetlinks.json
- It finds the entry for your app and compares SHA‑256 certificate fingerprints with those saved on‑chain
- If all required fingerprints match, verification succeeds (Oracle fee applies)
 

## Publication

Notes

- Without Ownership Verification you can still publish, but artifacts will not appear in catalog/name search; they remain accessible by address
- Catalog and search require Ownership Verification and Proof Validation to succeed

## Asset availability and Terms

- Catalog and search
  - Shown only for apps that passed Ownership Verification and Proof Validation
  - Apps that violate the Terms of Service may be removed from catalog and search

- Explorer mode (by address)
  - Users can search by the app address and read data directly from the blockchain node
  - This path does not rely on the public catalog, so no one can fully block the app’s on‑chain data

- Publisher visibility control
  - Publishers can set an app to invisible at the contract level; this hides it from the public catalog

## After publishing

- Distribution links can point to Greenfield and/or your own CDN. See: [Custom Distribution](/docs/custom-distribution)
- Costs depend on on‑chain transactions, Greenfield storage/download quotas, and optional CDN spend. See: [Billing and Fees](/docs/billing-and-fees)
