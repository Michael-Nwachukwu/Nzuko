# Nzuko - Decentralized Event Management Platform

Nzuko is a Web3-based event management platform that enables organizers to create, manage, and sell tickets for events using blockchain technology. The platform leverages smart contracts to ensure transparent and secure event management, ticket sales, and vendor management.

## Features

- **Decentralized Event Creation**: Create events with detailed information including name, description, venue, and ticket availability
- **NFT-Based Tickets**: Each ticket is minted as an NFT, providing authenticity and traceability
- **Multiple Payment Options**: Support for both ETH and ERC20 token payments
- **Vendor Management**: Add and manage event vendors with smart contract-based agreements
- **Ticket Tiers**: Create multiple ticket tiers with different pricing and availability
- **Event Status Management**: Automatic event status updates (Upcoming, Ongoing, Completed, Terminated)
- **Refund System**: Built-in refund mechanism for terminated events

## Project Structure

```
├── Frontend/           # Next.js frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── ...
└── HostXContract/     # Smart contract development
    ├── contracts/     # Solidity smart contracts
    ├── scripts/       # Deployment and interaction scripts
    ├── test/         # Contract test files
    └── ...
```

## Smart Contracts

### EventManagerFactory
- Main factory contract for creating and managing events
- Keeps track of all events and their organizers
- Provides functions to create new events and retrieve event information

### EventContract
- Individual event contract created for each event
- Handles ticket sales, vendor management, and event status
- Implements ERC721 for NFT-based tickets
- Manages ticket tiers and refunds

## Technical Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- wagmi (Ethereum interactions)
- Web3 libraries

### Smart Contracts
- Solidity ^0.8.21
- Hardhat (Development Environment)
- OpenZeppelin Contracts
- ERC721 (NFT Standard)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MetaMask or similar Web3 wallet

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/Nzuko.git
cd Nzuko
\`\`\`

2. Install Frontend dependencies:
\`\`\`bash
cd Frontend
npm install
\`\`\`

3. Install Smart Contract dependencies:
\`\`\`bash
cd HostXContract
npm install
\`\`\`

### Smart Contract Deployment

1. Configure your environment:
\`\`\`bash
cd HostXContract
cp .env.example .env
# Add your private key and network details to .env
\`\`\`

2. Deploy contracts:
\`\`\`bash
npx hardhat run scripts/deploy.ts --network <your-network>
\`\`\`

### Running the Frontend

1. Configure frontend environment:
\`\`\`bash
cd Frontend
cp .env.example .env.local
# Add your contract addresses and API keys
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Usage

### Creating an Event
1. Connect your Web3 wallet
2. Fill in event details (name, description, venue, etc.)
3. Set ticket availability and pricing
4. Deploy the event contract

### Managing Tickets
1. Create ticket tiers with different pricing
2. Set ticket availability for each tier
3. Monitor ticket sales and revenue

### Vendor Management
1. Add vendors with service details
2. Set vendor payment terms
3. Confirm service delivery and process payments

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/yourusername/Nzuko](https://github.com/yourusername/Nzuko)
