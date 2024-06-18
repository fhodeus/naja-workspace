import { Command, flags } from '@oclif/command';

// Reference types for export.
import type { flags as _ } from '@oclif/parser';
import { relative } from 'path';

export default class EnsureCertificate extends Command {
    static description =
        'Ensures self signed certificate files exist in the specified output directory';

    static examples = [
        `$ dragon ensure-certificate www.myhostname.com`,
        `$ dragon ensure-certificate www.myhostname.com --outDirectory ./.certs`,
    ];

    static args = [
        {
            name: 'host',
            required: true,
            description: 'The host (common name) to generate self signed certificates for',
        },
    ];

    static flags = {
        help: flags.help({ char: 'h' }),
        outDirectory: flags.string({
            char: 'o',
            default: './.certs',
            description: 'The directory to output the certificates into',
        }),
    };

    async run() {
        const { args, flags } = this.parse(EnsureCertificate);

        const { generateCertificate } = await import('@endeavour/ensure-certificate');
        const host = args['host'];
        const outDirectory = flags.outDirectory;

        generateCertificate({
            outDirectory: relative(process.cwd(), outDirectory),
            commonName: host,
        });
    }
}
