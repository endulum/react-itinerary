import Lists from './components/Lists';
import { DataProvider } from './components/Context';

export default function App() {
  return (
    <DataProvider>
      <h1>Itinerary</h1>
      <Lists />
    </DataProvider>
  );
}
