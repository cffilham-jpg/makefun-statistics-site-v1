import {createServer} from 'node:http';
import {readFileSync,statSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./app/',import.meta.url));
const port=Number(process.argv[process.argv.indexOf('--port')+1])||8080;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg'};
createServer((req,res)=>{
  try{
    const url=new URL(req.url||'/','http://localhost');
    if(url.pathname==='/favicon.ico'){res.writeHead(204).end();return;}
    const path=resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
    if(!path.startsWith(resolve(root)+sep)||!statSync(path).isFile()){res.writeHead(404).end();return;}
    res.writeHead(200,{'Content-Type':(types[extname(path)]||'application/octet-stream')+'; charset=utf-8','Cache-Control':'no-store'});
    res.end(readFileSync(path));
  }catch{res.writeHead(404).end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log('Nusantara atlas running on port '+port));
