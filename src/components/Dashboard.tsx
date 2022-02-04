import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import shallow from 'zustand/shallow';
import appStore from '../store/app.store';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// Config for chart
export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top' as const
		},
		title: {
			display: false,
			text: 'Historial'
		}
	}
};
// Data
const data = {
	labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
	datasets: [
		{
			label: 'Entidades',
			data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			borderColor: 'rgb(255, 99, 132)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)'
		}
	]
};

// Controls to start the days
export default function Dashboard() {
	const [generation, food, isActive, setActive, setSlowDay, setFastDay] = appStore(
		(state) => [
			state.generation,
			state.food,
			state.active,
			state.setActive,
			state.slowDay,
			state.fastDay
		],
		shallow
	);

	const fullRun = () => {
		setActive(true);
		setFastDay();
	};

	const slowRun = () => {
		setActive(true);
		setSlowDay();
	};

	const pauseSimulator = () => setActive(false);

	return (
		<div
			style={{
				// border: '1px solid #000',
				position: 'absolute',
				zIndex: 1,
				display: 'flex',
				flexWrap: 'wrap',
				width: '100%',
				justifyContent: 'space-around'
			}}
		>
			{/* Controls */}
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
				<button type='button' onClick={slowRun}>
					Normal
				</button>
				<button type='button' onClick={fullRun}>
					Cámara rápida
				</button>
				<button type='button' onClick={pauseSimulator}>
					Pause
				</button>
			</div>

			{/* Data */}
			<div>
				<p style={{ marginBottom: 0 }}>Generación: {generation}</p>
				<p style={{ margin: 0 }}>Comida: {food.length}</p>
				<p style={{ margin: 0 }}>Estatus: {isActive ? 'corriendo' : 'pausa'}</p>
			</div>

			{/* Chart */}
			<div>
				<Line options={options} data={data} />
			</div>
		</div>
	);
}
