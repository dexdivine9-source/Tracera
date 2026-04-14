const HELIUS_URL = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`;

export async function getAssetsByOwner(ownerAddress: string) {
  const response = await fetch(HELIUS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'getAssetsByOwner',
      params: {
        ownerAddress,
        page: 1,
        limit: 1000
      },
    }),
  });
  
  if (!response.ok) {
    throw new Error('Helius API request failed');
  }
  
  return response.json();
}

export async function getProgramAccounts(programId: string) {
  const response = await fetch(HELIUS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'my-id',
      method: 'getProgramAccounts',
      params: [
        programId,
        {
          encoding: 'jsonParsed'
        }
      ],
    }),
  });

  if (!response.ok) {
    throw new Error('Helius API request failed');
  }

  return response.json();
}
