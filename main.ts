import {cpSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildDossier} from './vendor/makefun-frontend.ts';
const repository=fileURLToPath(new URL('.',import.meta.url));
const destination=resolve(process.env.MAKEFUN_OUTPUT_DIR||'out');
mkdirSync(destination,{recursive:true});
for(const directory of ['app','screenshots']){
  cpSync(join(repository,directory),join(destination,directory),{recursive:true});
}
const caps={text_max_bytes:163840,screenshots:{max:4,max_bytes:262144},app_max_files:993,app_max_bytes:16777216};
writeFileSync(join(destination,'dossier.json'),buildDossier(destination,caps));
console.log('Built deterministic atlas package: '+destination);
