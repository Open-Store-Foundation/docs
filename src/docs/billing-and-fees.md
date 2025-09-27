# Billing and Fees

This page summarizes how billing and fees work in Open Store. It is written primarily for publishers and secondarily for end users.

## Key principles

- **No royalties**: The protocol does not charge a percentage of your revenue.
- **Pay only for what you use**: Costs are explicit and tied to specific actions and resources.
- **Bring your own distribution**: You can offload downloads to your own CDN/servers to optimize costs.

## What publishers pay

### Network fees

- **Gas fee**: Standard transaction fee on BSC/opBSC for on-chain actions (creating contracts, sending requests, publishing).
- **Cross-chain fee**: Cost to send messages BSC → Greenfield for storage-related operations.

### Greenfield fees

- **Storage fee**: Weekly prepayment to store files in your Greenfield bucket.
- **Download quote fee**: Weekly prepayment that defines how many GB users can download from your bucket.
- Learn more: [Greenfield Billing](https://docs.bnbchain.org/bnb-greenfield/core-concept/billing-payment/)

### Oracle fee (Ownership Verification)

- Paid when you request Ownership Verification.
- Amount is set by the Owner in the `AssetlinkOracleV1` contract.

### Validation fee (Artifact Validation)

- Paid when you submit an Asset Artifact for validation.
- Amount is set by the Owner in the `OpenStore` contract.

### Optional publisher costs

- **Custom distribution/CDN**: If you provide your own distribution links, you incur your own hosting/CDN costs but can reduce Greenfield download spend.

## When you pay (publisher workflow)

1. **Create Publisher**
   - Cross-chain fee to initialize Greenfield resources and create a bucket; initial BNB is bridged to Greenfield for storage and download quotes.
2. **Manage Publisher**
   - Topping up the Greenfield balance (cross-chain) and adjusting the bucket read quote (prepaid Greenfield fees).
3. **Ownership Verification**
   - Pay the Oracle fee when submitting Ownership Verification.
4. **Upload Asset Artifact**
   - Incurs Greenfield storage fees; cross-chain fees may apply for storage operations.
5. **Artifact Validation**
   - Pay the Validation fee when submitting a Validation Request.
6. **Publication**
   - On-chain gas for marking an artifact as published. You may choose:
     - Publication only
     - Separate validation then publication
     - Combined validation + publication (one flow that may reduce the number of transactions)
7. **Distribution to users**
   - Greenfield downloads consume your prepaid download quote; or your CDN incurs its own fees if you use custom distribution.

### Edge cases

- If a Validation Request is marked UNAVAILABLE due to temporary blockchain issues, the Validation fee is not returned to the requester and is not paid out to validators; it remains in the protocol balance.

## Cost optimization tips (publishers)

- **Keep Ownership Info stable**: Avoid unnecessary changes to endpoints and certificate fingerprints to reduce repeated Ownership Verifications.
- **Use custom distribution for heavy traffic**: Offload downloads to your CDN/infra to control bandwidth costs. See: [Custom Distribution](/docs/custom-distribution)
- **Prune old artifacts**: Delete unused versions to lower ongoing storage fees.
- **Choose the right publish flow**: Combined validation + publication can reduce the number of on-chain transactions compared to running them separately.
- **Monitor bucket read quote**: Prevent throttling or blocking by sizing the weekly download quote to expected demand.

## What users pay

- **No royalties or protocol fees** for browsing or installing.
- **No on-chain transactions required** for installation; downloads come from the publisher’s storage or CDN.
- Normal internet data charges from your ISP may apply when downloading.

## Quick glossary

- **Ownership Verification**: Confirms a link between your app and your website via asset links; paid Oracle fee.
- **Artifact Validation**: Verifies an uploaded artifact’s structure, signatures, and metadata; paid Validation fee.
- **Greenfield storage**: File storage for artifacts billed weekly for storage and download quotas.
