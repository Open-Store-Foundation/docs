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
- ProofOfCertificateOwnership: signature over 'APP_ADDRESS::SHA256_CERT_FINGERPRINT'

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
- After success, you can submit artifacts for Artifact Validation

## Publishing variants

You control validation and publication independently to fit your workflow and budget:

1. Publication only
   - The artifact is marked as published but not validated
   - Discoverability: by address only (Explorer mode)

2. Separate validation then publication
   - First perform Artifact Validation (Validation fee), then publish later
   - Discoverability after publication: catalog and name search (requires Ownership Verification + Artifact Validation)

3. Combined validation + publication
   - Submit for validation and request auto‑publication on success in one flow

Notes

- Without Ownership Verification you can still publish, but artifacts will not appear in catalog/name search; they remain accessible by address
- Artifact Validation requires Ownership Verification to be completed successfully

## Asset availability and Terms

- Catalog and search
  - Shown only for apps that passed Ownership Verification and Artifact Validation
  - Apps that violate the Terms of Service may be removed from catalog and search

- Explorer mode (by address)
  - Users can search by the app address and read data directly from the blockchain node
  - This path does not rely on the public catalog, so no one can fully block the app’s on‑chain data

- Publisher visibility control
  - Publishers can set an app to invisible at the contract level; this hides it from the public catalog

## After publishing

- Distribution links can point to Greenfield and/or your own CDN. See: [Custom Distribution](/docs/custom-distribution)
- Costs depend on on‑chain transactions, Greenfield storage/download quotas, and optional CDN spend. See: [Billing and Fees](/docs/billing-and-fees)
