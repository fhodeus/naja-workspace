import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
// @ts-expect-error no typings
import { generate } from 'selfsigned';

interface IGenerateOptions {
    outDirectory?: string;
    commonName: string;
}

export async function generateCertificate({ outDirectory, commonName }: IGenerateOptions) {
    const certOutputDir = outDirectory ? outDirectory : join(process.cwd(), '.certs');

    if (!existsSync(certOutputDir)) {
        await mkdir(certOutputDir, { recursive: true });
    }

    const locations = {
        key: join(certOutputDir, 'server.key'),
        pub: join(certOutputDir, 'server.pub'),
        crt: join(certOutputDir, 'server.crt'),
    };

    if (existsSync(locations.crt) && existsSync(locations.key) && existsSync(locations.pub)) {
        return locations;
    }

    const generatedInformation = generate(
        [
            {
                name: 'commonName',
                value: commonName,
            },
            { name: 'countryName', value: 'ES' },
            { shortName: 'ST', value: 'Malaga' },
            { name: 'localityName', value: 'Marbella' },
            { name: 'organizationName', value: 'GiG' },
            { shortName: 'OU', value: 'None' },
        ],
        {
            days: 365,
            algorithm: 'sha256',
            extensions: [
                {
                    name: 'basicConstraints',
                    cA: true,
                },
                {
                    name: 'keyUsage',
                    keyCertSign: true,
                    digitalSignature: true,
                    nonRepudiation: true,
                    keyEncipherment: true,
                    dataEncipherment: true,
                },
                {
                    name: 'subjectAltName',
                    altNames: [
                        {
                            type: 2,
                            value: commonName,
                        },
                    ],
                },
            ],
        },
    );

    await Promise.all([
        writeFile(locations.key, generatedInformation.private),
        writeFile(locations.pub, generatedInformation.public),
        writeFile(locations.crt, generatedInformation.cert),
    ]);

    return locations;
}
