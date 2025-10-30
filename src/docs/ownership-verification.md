
# Ownership Verification

This guide explains what publishers must provide to verify ownership and how the oracle performs the verification.

## What you need to provide

- Web domain (Asset Endpoint)
  - Example: https://example.com
  - ENS‑like systems may be supported in the future.

- Certificate SHA‑256 fingerprints
  - Example: F8:F9:21:DA:21:05:21:A2:21:BC:21:9A:21:81:21:E0:21:AB:21:2D:93:EA:53:41:7A:45:81:98:F8:ED:5D:80

- AssetApp address
  - Example: 0x1234567890abcdef1234567890abcdef12345678

- X509 DER certificate (bytes) for each fingerprint
  - The certificate is stored on‑chain alongside the fingerprint.

- ProofOfCertificateOwnership for each certificate
  - Message format: 'caip2ChainId::appAddress::sha256CertificateFingerprint'
  - Sign the message with the private key corresponding to the certificate (one proof per fingerprint)
  - A helper script is available: proof_gen.py
    - https://github.com/Open-Store-Foundation/studio/blob/main/src/assets/proof_gen.py

## How the oracle executes the request

1. Fetch the JSON from $ENDPOINT/.well-known/assetlinks.json
   - Android Asset Links documentation: https://developer.android.com/training/app-links/verify-android-applinks
2. Locate the entry for your Android app: namespace "android_app" with the correct package_name.
3. Compare the set of sha256_cert_fingerprints in the assetlinks entry with the fingerprints stored on‑chain in your Ownership Info.
   - All required fingerprints present → success
   - Any missing → error

Example assetlinks entry

```json
[
  {
    "relation": [
      "delegate_permission/common.handle_all_urls"
    ],
    "target": {
      "namespace": "android_app",
      "package_name": "org.openstore.example.android",
      "sha256_cert_fingerprints": [
        "F8:F9:21:DA:21:05:21:A2:21:BC:21:9A:21:81:21:E0:21:AB:21:2D:93:EA:53:41:7A:45:81:98:F8:ED:5D:80"
      ]
    }
  }
]
```

## Proofs and APK validation

- Proof Validation: The daemon and clients verify each ProofOfCertificateOwnership signature against the message 'caip2ChainId::appAddress::sha256CertificateFingerprint' using the public key contained in the provided X509 certificate.
- The oracle step verifies the website’s assetlinks entry matches the on‑chain packageName and certificate fingerprints; signature authenticity is enforced during proof validation and by clients before install.

- On every install or update, the client re‑checks all proofs and certificate fingerprints locally. If any check fails, installation is blocked.

