![Project Logo](https://github.com/kakonoomoidee/Hackathon-JagoanTante/blob/master/src/frontend/public/acta_logo.png)

### Introduction
``ACTA`` is a decentralized digital contract platform designed for the general public, enabling users to securely create, sign, and manage legally binding agreements using the Internet Computer Protocol (ICP). The system leverages Internet Identity (II) for secure authentication and ensures that only the participants of a contract are aware of its existence and contents. For example, if user A creates a contract with user B, user C will have no visibility into that contract — ensuring privacy and confidentiality.
### Features
- 🔐 Private Contracts – Only participants can see and access the contract.
- 📝 Multi-signature Support – Supports multiple signers per contract.
- 📄 On-chain PDF Storage – Uploaded PDF contracts are stored directly on-chain via ICP.
- 🆔 Internet Identity Login – Secure, passwordless authentication using Internet Identity.
- ⏱️ Timestamps – Each contract includes a creation timestamp for legal clarity.
- ✅ Validation & Verification – All contracts are verified before being final
### Requirements and Pre-requisites
- Node.js >= 18.x
- DFX SDK (dfx) installed → [Install guide](https://internetcomputer.org/docs/building-apps/getting-started/install)
- Internet Identity (II) setup to test authentication
- Compatible browser (Chrome/Firefox recommended)
- Rust (for building ICP canisters, if applicable)
- ICP local replica (for local testing) or deployment to Internet Computer network
## Website Demo
🔗 Live Demo
You can try creating a contract, uploading a PDF, and signing it using Internet Identity (II). Only the invited participants will be able to view and sign the contract.
[click me](https://r2bsf-3qaaa-aaaan-qzzsq-cai.icp0.io/)

🔗 Local Demo
```
git clone https://github.com/your-username/acta-digital-signature.git
cd acta-digital-signature
npm install
dfx start --background
dfx deploy
```
## Future Development
- ✉️ Email/Notifikasi II Integration – Notify users when a contract requires their signature.
- 🔎 Contract Search & History Viewer – View signed and past contracts via history page.
- 📱 Mobile UI Support – Responsive design for mobile signers.
- 🔐 ZK-based Signature Verification – Add privacy-preserving proof-of-signature using zero-knowledge proofs.
- 🌍 Multi-language Support – For global accessibility.
- 🪪 Decentralized Identity Extension – Interoperability with other identity providers.
## Additional Links
### Website Documentation
Explore how ACTA works behind the scenes — from architecture to implementation details. This documentation covers features, contract structure, smart contract interactions, and on-chain data storage.
[Read the Docs](https://calm-crater-cb9.notion.site/ACTA-Decentralized-Digital-Contract-Signature-on-ICP-1ebcd35cf90580d29372ca5f031ad562)
### Pitch Deck
Want a quick overview of the problem ACTA solves and how it works? Check out our visual presentation outlining the vision, features, and future potential of ACTA.
[View Pitch Deck on Canva](https://www.canva.com/design/DAGmp5bXQWQ/5zeu5vCka1PiMg8rmYUoUw/edit)
### Demo Video
Watch ACTA in action — from signing in with Internet Identity to creating and signing contracts on-chain. This demo shows how simple, secure, and transparent digital contract signing can be.
[View Demo Video](https://drive.google.com/file/d/1nn4FNFARr4khMjdSpKlElompyX_igZ2k/view?usp=drive_link)
