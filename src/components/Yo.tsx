import { JSX } from '@/utils/jsx'
import { Component } from '@/utils/relax'

export const Yo = (
  { someText }:
  { someText: string } & Component
) => (
  <div>Yo {someText}!</div>
);

export default { Yo };
