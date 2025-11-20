import './App.css';
import LeftPanel from './layout/LeftPanel/LeftPanel';
import RightPanel from './layout/RightPanel/RightPanel';
import Button from './components/Button/Button';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import Header from './components/Header/Header';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';


function mapData (data) {
	if (!data){
		return [];
	} 
	return data.map( i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {

	const [data, setData] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);

	const addData = item => {
		if (!item.id) {
			setData([...mapData(data), {
				...item,
				date : new Date(item.date),
				id : data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1
			}]);
		} else {
			setData([...mapData(data).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				}
				return i;
			})]);
		}
		
	};

	const DeleteItem = (id) => {
		setData([...data.filter( i => i.id !== id)]);
	};


	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList items = {mapData(data)} setItem={setSelectedItem}/>
				</LeftPanel>
				<RightPanel>
					<JournalForm onSubmit={addData} data={selectedItem} onDelete={DeleteItem}/>
				</RightPanel>
			
			</div>
		</UserContextProvider>
	);
}

export default App;
