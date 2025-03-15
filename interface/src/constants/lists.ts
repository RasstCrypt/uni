// the Default token list configuration
export const DEFAULT_TOKEN_LIST = {
  name: "Rast Tea List",
  logoURI: "https://example.com/logo.png",
  timestamp: "2025-03-15T12:00:00Z",
  version: {
    major: 1,
    minor: 0,
    patch: 0
  },
  tokens: [
    {
      chainId: 93384,
      address: "0xD41512E803B6de6B32fA694793d3ccA0E33C5d39",
      name: "Bitcoin",
      symbol: "BTC",
      decimals: 18,
      logoURI: "https://raw.githubusercontent.com/RasstCrypt/token-list/main/Assets/bitcoin.png"
    },
    {
      chainId: 93384,
      address: "0xB1acD3c03292d34020F1556bc185F6d39E34a75D",
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      logoURI: "https://raw.githubusercontent.com/RasstCrypt/token-list/main/Assets/Ether.png"
    },
    {
      chainId: 93384,
      address: "0xeDB4faE9A9F03b17120F39a23d6aC4A7AC3B4D5D",
      name: "USDT",
      symbol: "USDT",
      decimals: 18,
      logoURI: "https://raw.githubusercontent.com/RasstCrypt/token-list/main/Assets/usdt.png"
    },
    {
      chainId: 93384,
      address: "0x82205d9593Ef097096Ff660a8E6D20273F8876bC",
      name: "Ras",
      symbol: "Rs",
      decimals: 18,
      logoURI: "https://raw.githubusercontent.com/RasstCrypt/token-list/main/Assets/Ras.png"
    },
    {
      chainId: 93384,
      address: "0x3693ebFDC85F3bE9e3C525E38D715a4a7cD90932",
      name: "Rast",
      symbol: "RTC",
      decimals: 18,
      logoURI: "https://raw.githubusercontent.com/RasstCrypt/token-list/main/Assets/Rast.png"
    }
  ]
}

// Set the default token as the first token in the list (USDT in this case)
export const DEFAULT_TOKEN = DEFAULT_TOKEN_LIST.tokens[2]

// The URL where your token list JSON is hosted
export const DEFAULT_TOKEN_LIST_URL = 'https://raw.githubusercontent.com/RasstCrypt/token-list/main/rastfiletoken.json'

// List of token list URLs to fetch from
export const DEFAULT_LIST_OF_LISTS: string[] = [
  DEFAULT_TOKEN_LIST_URL
]