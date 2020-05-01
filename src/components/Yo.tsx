import { JSX } from '@/utils/jsx'

export const Yo = (
  { someText }:
  { someText: string } & { html?: any }
) => (
  <div>Yo {someText}!</div>
);

export default { Yo };