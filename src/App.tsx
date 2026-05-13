import { Exam } from './components/templates/Exam'
import { EXAM_MOCK, MOCK_COLLUMNS } from './mocks/exam'

function App() {
  return <Exam exam={EXAM_MOCK} columns={MOCK_COLLUMNS}/>
}

export default App
