import { JSX } from '@/utils/jsx'
import { Yo } from '@/containers/Yo'
import { Timer } from '@/components/Timer'

export const App = () => (
  <div className="well-hello">
    <b>cześć!</b>
    <Yo/>
    <Timer start={Date.now()}/>
  </div>
)

export default { App }
