import { JSX } from '@/utils/jsx'

export const Yo = ({ someText, ..._ }) => (
  <div>Yo {someText}!</div>
);

export default { Yo };