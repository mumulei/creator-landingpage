import test from 'node:test';
import assert from 'node:assert/strict';
import { createStepSequence } from '../src/components/token-art/step-sequence.js';

function fixture() {
  const jobs=new Map(), steps=[], settled=[];let id=0;
  const sequence=createStepSequence({onStep:v=>steps.push(v),onSettled:v=>settled.push(v),schedule:fn=>{jobs.set(++id,fn);return id;},cancel:key=>jobs.delete(key)});
  const tick=()=>{const job=jobs.entries().next().value;if(job){jobs.delete(job[0]);job[1]();}};
  return {sequence,steps,settled,tick,jobs};
}
test('fast scroll visits every intermediate step',()=>{
  const f=fixture();f.sequence.target(4);
  for(let i=0;i<5;i++)f.tick();
  assert.deepEqual(f.steps,[1,2,3,4]);assert.deepEqual(f.settled,[4]);
});
test('reverse scroll immediately changes the queued destination',()=>{
  const f=fixture();f.sequence.target(4);f.tick();f.sequence.target(0);
  for(let i=0;i<4;i++)f.tick();
  assert.deepEqual(f.steps,[1,2,1,0]);assert.deepEqual(f.settled,[0]);
});
test('repeated targets do not restart the sequence and cleanup cancels jobs',()=>{
  const f=fixture();f.sequence.target(4);f.sequence.target(4);
  assert.equal(f.jobs.size,1);f.sequence.destroy();assert.equal(f.jobs.size,0);
});
test('anchor navigation cancels playback and settles directly at the destination',()=>{
  const f=fixture();f.sequence.target(4);f.sequence.jump(4);f.tick();
  assert.deepEqual(f.steps,[1,4]);assert.equal(f.jobs.size,0);
  f.sequence.target(4);assert.equal(f.jobs.size,0);
  f.sequence.target(2);f.tick();f.tick();
  assert.deepEqual(f.steps,[1,4,3,2]);
});
