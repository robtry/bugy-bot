import create from 'zustand';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { randomNumber } from '../utils';

const INITIAL_GENERATION = 0;
const INITIAL_SPEED = 0.0005;
const INITIAL_STATUS = true;
const INITIAL_ENTITIES = 3;
const INITIAL_FOOD = Math.floor(randomNumber(10, 100));

const PLANE_SIZE = 15; // Z and X

export type FoodEntitie = {
	id: string;
	position: { x: number; y: number; z: number };
	available: boolean;
};

export type ExeEntitie = {
	id: string;
	position: { x: number; y: number; z: number };
	eated: number;
};

const generateFood = (quantity: number): FoodEntitie[] => {
	const food: FoodEntitie[] = [];
	const distance = (PLANE_SIZE - 5) / 2;
	let i = 0;
	for (; i < quantity; i++) {
		food.push({
			id: uuidv4(),
			available: true,
			position: {
				x: randomNumber(distance, -distance),
				// x: 7,
				y: 0,
				// 	y: 3 + 1,
				z: randomNumber(distance, -distance)
				// z: 7
			}
		});
	}
	return food;
};

const generateExe = (quantity: number): ExeEntitie[] => {
	const entities: ExeEntitie[] = [];
	const circle = 2 * Math.PI;
	const angle = circle / quantity;
	const distance = (PLANE_SIZE - 2) / 2; // -1 because is the size of the Mob
	let i = 0;
	for (; i <= circle; i += angle) {
		entities.push({
			id: uuidv4(),
			eated: 0,
			position: {
				x: distance * Math.cos(i),
				y: 0,
				z: distance * Math.sin(i)
			}
		});
	}
	return entities;
};

interface AppState {
	// Plane size
	planeSize: number;
	// Current generation
	generation: number;
	nextGeneration: () => void;
	// Current entities
	entities: ExeEntitie[];
	// Current food
	food: FoodEntitie[];
	removeFood: (id: string) => void;
	// To run automatically
	active: boolean;
	setActive: (active: boolean) => void;
	// Velocity of the day
	speedDay: number;
	slowDay: () => void;
	fastDay: () => void;
	// Datasets for charts
}

const appStore = create<AppState>((set) => ({
	planeSize: PLANE_SIZE,
	// Current days
	generation: INITIAL_GENERATION,
	nextGeneration: () =>
		set((state) =>
			produce(state, (draft) => {
				draft.generation++;
			})
		),
	// Food
	food: generateFood(INITIAL_FOOD),
	removeFood: (id: string) =>
		set((state) =>
			produce(state, (draft) => {
				const eatenFoodIndex = draft.food.findIndex((f) => f.id === id);
				if (eatenFoodIndex !== -1) {
					draft.food[eatenFoodIndex].available = false;
				}
			})
		),
	// Current entities
	entities: generateExe(INITIAL_ENTITIES),

	// To run automatically
	active: INITIAL_STATUS,
	setActive: (active: boolean) =>
		set((state) =>
			produce(state, (draft) => {
				draft.active = active;
			})
		),
	// To determinate the speed day
	speedDay: INITIAL_SPEED,
	fastDay: () =>
		set((state) =>
			produce(state, (draft) => {
				draft.speedDay = 0.1;
			})
		),
	slowDay: () =>
		set((state) =>
			produce(state, (draft) => {
				draft.speedDay = INITIAL_SPEED;
			})
		)
}));

export default appStore;
