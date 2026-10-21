import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const skill=join(homedir(),'.codex/skills/hairline-create');
const {assemble}=await import(pathToFileURL(join(skill,'build.mjs')));
const source=readFileSync(new URL('../../src/components/token-art/hairline-figure.js',import.meta.url),'utf8').replace(/^import .*;\n/m,'').replace('export function','function').replace(/^  if\(\['creator-globe'.*\n/m,'');
const stack=readFileSync(new URL('../../src/components/token-art/hairline-stack.js',import.meta.url),'utf8').replace('export function','function');
const output=new URL('../../docs/token-art/',import.meta.url);
mkdirSync(output,{recursive:true});
for(const kind of ['creators','content','gpu','models','tokens','creator-globe','agent-dot','brain-compute','ai-network']){
  const isStack=['creator-globe','agent-dot','brain-compute','ai-network'].includes(kind);
  const figure=`${isStack?stack:source}\nfunction mount({stage,svg,read},value){return ${isStack?'mountStackFigure':'mountHairline'}(HL,stage,svg,read,'${kind}');}\nhairline({name:'${kind}',means:'A ${kind} object in the Creatorial AI workflow.',rules:[1,4,6,7,9,10],range:[0,1,2],tour:[[175,140],[220,170],[200,130],null],mount});`;
  const file=new URL(`hairline-${kind}.html`,output);
  writeFileSync(file,assemble(figure));
  const result=spawnSync(process.execPath,[join(skill,'validate.mjs'),file.pathname],{encoding:'utf8'});
  console.log(kind,result.stdout,result.stderr);
  if(result.status)process.exitCode=1;
}
