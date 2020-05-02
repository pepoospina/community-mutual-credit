import { EveesEthereum, EveesHttp } from '@uprtcl/evees';

import { HttpConnection } from '@uprtcl/http-provider';
import { EthereumConnection } from '@uprtcl/ethereum-provider';

import { loadWikiModule } from '@uprtcl/multiprovider-wiki';

export const initUprtcl = async () => {
  const c1host = 'http://localhost:3100/uprtcl/1';
  const ethHost = '';
  
  const ipfsConfig = { host: 'ipfs.infura.io', port: 5001, protocol: 'https' };

  const httpCidConfig: any = { version: 1, type: 'sha3-256', codec: 'raw', base: 'base58btc' };
  const ipfsCidConfig: any = { version: 1, type: 'sha2-256', codec: 'raw', base: 'base58btc' };

  const httpConnection = new HttpConnection();
  const ethConnection = new EthereumConnection({ provider: ethHost });

  const httpEvees = new EveesHttp(c1host, httpConnection, ethConnection, httpCidConfig);
  const ethEvees = new EveesEthereum(ethConnection, ipfsConfig, ipfsCidConfig);

  console.log('[WIKI-UPRTCL] loadWikiModule');
  await loadWikiModule([ethEvees, httpEvees], httpEvees);
};
