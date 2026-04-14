const DEFILLAMA_BASE_URL = 'https://api.llama.fi';
const DEXS_API_URL = 'https://api.llama.fi/summary/dexs';

export interface ProtocolData {
  name: string;
  tvl: number;
  change_1d: number;
  change_7d: number;
  volume24h?: number;
  historicalTvl: { date: number; tvl: number }[];
}

export async function getProtocolMetrics(slug: string): Promise<ProtocolData | null> {
  try {
    // 1. Fetch main protocol data (TVL and Changes)
    const response = await fetch(`${DEFILLAMA_BASE_URL}/protocol/${slug}`);
    if (!response.ok) return null;
    const data = await response.json();

    // 2. Fetch Volume data (only works if it's a DEX in DefiLlama)
    let volume24h = undefined;
    try {
      const volResp = await fetch(`${DEXS_API_URL}/${slug}?excludeTotalDataChart=true`);
      if (volResp.ok) {
        const volData = await volResp.json();
        volume24h = volData.total24h;
      }
    } catch (e) {
      console.error(`Volume fetch failed for ${slug}`, e);
    }

    // 3. Extract historical TVL
    const historicalTvl = data.chainTvls?.Solana?.tvl?.map((item: any) => ({
      date: item.date,
      tvl: item.totalLiquidity
    })) || [];

    return {
      name: data.name,
      tvl: data.tvl || 0,
      change_1d: data.change_1d || 0,
      change_7d: data.change_7d || 0,
      volume24h,
      historicalTvl: historicalTvl.slice(-30) // Last 30 days for the chart
    };
  } catch (error) {
    console.error("DefiLlama API Error:", error);
    return null;
  }
}

export async function getSolanaGlobalStats() {
  const response = await fetch(`${DEFILLAMA_BASE_URL}/protocol/solana`);
  if (!response.ok) return null;
  return response.json();
}

