import { generateKeyPair } from 'node:crypto';

export class EmailDkimGenerator {
	public generate(selector?: string | string[]) {
		return new Promise<{ dkimDnsRecord: { name: string; content: string }; privateKey: string }>((resolve, reject) => {
			generateKeyPair(
				'rsa',
				{
					modulusLength: 2048,
					publicKeyEncoding: {
						type: 'spki',
						format: 'der',
					},
					privateKeyEncoding: {
						type: 'pkcs1',
						format: 'der',
					},
				},
				(err, publicKey, privateKey) => {
					if (err) reject(err);

					resolve({
						dkimDnsRecord: {
							name: selector ? (Array.isArray(selector) ? [selector.join('-'), '_domainkey'].join('.') : [selector, '_domainkey'].join('.')) : '_domainkey',
							content: `v=DKIM1; k=rsa; p=${publicKey.toString('base64')}`,
						},
						privateKey: privateKey.toString('base64'),
					});
				},
			);
		});
	}
}

let generatorPromises: Promise<any>[] = [];
for (const environment of ['weather-watcher']) {
	generatorPromises.push(new EmailDkimGenerator().generate([environment, 'mailchannels']));
}
Promise.all(generatorPromises).then(console.log).catch(console.error);
