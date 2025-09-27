
# Custom Distribution

Use custom distribution links to offload bandwidth from Greenfield and control your delivery setup. Links are stored on-chain and resolved by the Open Store App before installation.

## Link template placeholders

Supported variables for templating each distribution link:

| Variable | Type | Description | Example            |
| --- | --- | --- |--------------------|
| ${REF_ID} | hex string | On-chain object id reference | 0x0000000000ffaa11 |
| ${VERSION_NAME} | string | Artifact version name | v0.0.1             |
| ${VERSION_CODE} | integer | Numeric artifact version code | 321                |
| ${CHECKSUM} | hex string | BLAKE3 file checksum | a3b4…9f            |

Example template:

```
https://cdn.example.com/apps/${VERSION_CODE}/app-${VERSION_NAME}-${REF_ID}.apk?blake3=${CHECKSUM}
```

## Example expansion

### JavaScript/TypeScript

```javascript
const url = template
  .replace("${VERSION_CODE}", String(artifact.versionCode))
  .replace("${VERSION_NAME}", artifact.versionName || "")
  .replace("${REF_ID}", artifact.refId)
  .replace("${CHECKSUM}", artifact.checksum)
```

### Kotlin

```kotlin
val url = template
  .replace("${VERSION_CODE}", artifact.versionCode.toString())
  .replace("${VERSION_NAME}", artifact.versionName.orEmpty())
  .replace("${REF_ID}", artifact.refId)
  .replace("${CHECKSUM}", artifact.checksum)
```

## How clients resolve links

- Before installation, the app retrieves distribution links for the latest artifact directly from the blockchain.
- It attempts the links in order until one works. Some links may be blocked in specific countries.
- If none work, it falls back to downloading from Greenfield.

## Auth and rate limiting

- Distribution currently does not support any auth mechanism.
- Use public links. Rate limiting and protection features are planned for later.

## Requirements

- No protocol or vendor requirements. You can use any distribution system (CDN, HTTP(S) servers, Web3 storage, etc.).

## Notes for publishers

- Provide multiple redundant links for regional reliability.
- Ensure the file content matches the on-chain checksum; the app validates it locally before install.

