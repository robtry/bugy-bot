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
import { useEffect, useRef, useState } from 'react';
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

/**
 * Dashboard with buttons, log and chart
 */
export default function Dashboard() {
	const [generation, food, isActive, setActive, setSlowDay, setFastDay, available] = appStore(
		(state) => [
			state.generation,
			state.food,
			state.active,
			state.setActive,
			state.slowDay,
			state.fastDay,
			state.available
		],
		shallow
	);

	// Data for the chart
	const [labels, setLabels] = useState<number[]>([]);
	const [data, setData] = useState<number[]>([]);

	// References to avoid re-renders
	const foodRef = useRef<any[]>([]);
	const availableRef = useRef<number>(0);

	// Listen for changes on generations
	useEffect(() => {
		setLabels(Array.from(Array(generation).keys()));
		setData((prev) => [...prev, availableRef.current]);
	}, [generation]);

	// Listen without re-renders on food
	useEffect(() => {
		foodRef.current = food;
	}, [food]);

	// Listen without re-renders on available
	useEffect(() => {
		availableRef.current = available;
	}, [available]);

	// Enable fast run
	const fullRun = () => {
		setActive(true);
		setFastDay();
	};

	// Enable slow run
	const slowRun = () => {
		setActive(true);
		setSlowDay();
	};

	// Pause the simulation
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
				<span style={{ marginBottom: 0 }}>
					Con el transcurso de los días Bugy bot <br />
					come una cantidad random de manzanas <br />
					se puede observar en la gráfica
				</span>
				<p style={{ margin: 0 }}>Días: {generation}</p>
				<p style={{ margin: 0 }}>Comida: {available}</p>
				<p style={{ margin: 0 }}>
					Estatus: {available === 0 ? 'completado' : isActive ? 'corriendo' : 'pausa'}
				</p>
				{/* Description */}
			</div>

			{/* Chart */}
			<div>
				<Line
					options={options}
					data={{
						labels,
						datasets: [
							{
								label: 'Comida',
								data,
								borderColor: 'rgb(255, 99, 132)',
								backgroundColor: 'rgba(255, 99, 132, 0.5)'
							}
						]
					}}
					redraw
				/>
			</div>
		</div>
	);
}
