<script setup lang='ts'>
import { useProgramStore } from '@/stores/program';
import { onMounted, ref, watch, watchEffect } from 'vue';
import ServiceSelect from '@/components/ServiceSelect.vue';
import { useAdditionalServiceStore } from '@/stores/additionalService';
import GInput from '@/components/global/GInput.vue';
import type { OrderInput, Outfit } from '@/types';
import { useOrderStore } from '@/stores/order';
import Feedback from '@/components/Feedback.vue';
import GHeader from '@/components/global/GHeader.vue';
import useAuth from '@/utils/useAuth';

const programStore = useProgramStore();
const additionalServiceStore = useAdditionalServiceStore();
const orderStore = useOrderStore();
const { user } = useAuth();


const props = defineProps<{
	id: number
}>();

const services = ref([{}]);

const addService = () => {
	services.value.push({});
};

const additionalServices = ref<{
	id: number;
	price: number;
}[]>([]);
const totalPrice = ref<number>(0);
const peopleCount = ref<number>();
const peopleCountSignature = ref<string>('');
const selectedOutfits = ref<number[]>([]);
const selectedEmployees = ref<number[]>([]);
const showEmployees = ref<boolean>(false);
const currentOutfitId = ref<number>();
const currentOutfitEmployees = ref<Outfit>();
const chosenDateId = ref<number>();
const chosenTimeId = ref<number>();
const comment = ref<string>();

const selectEmployeeWithOutfit = (employeeId: number, outfitId: number) => {
	if (!selectedEmployees.value.includes(employeeId) && !selectedOutfits.value.includes(outfitId)) {
		selectedEmployees.value.push(employeeId);
		selectedOutfits.value.push(outfitId);
	} else if (selectedOutfits.value.includes(outfitId) && !selectedEmployees.value.includes(employeeId)) {
		console.log(employeeId, outfitId);
		selectedEmployees.value.splice(selectedEmployees.value.indexOf(employeeId), 1, employeeId);
	}
};

const chooseDate = (id: number) => {
	chosenDateId.value = id;
	chosenTimeId.value = undefined;
};

const chooseTime = (timeId: number, dateId: number) => {
	chosenTimeId.value = timeId;
	chosenDateId.value = dateId;
};

const showEmployee = (outfitId: number) => {
	showEmployees.value = true;
	currentOutfitId.value = outfitId;
};

const hideEmployee = () => {
	showEmployees.value = false;
	currentOutfitId.value = undefined;
};

const onSubmit = async (data: OrderInput) => {
	if (data) {
		await orderStore.makeOrder(data);
	}
};

watch(additionalServices.value, () => {
	let additionalPrice = 0 + programStore.program.price;
	additionalServices.value.forEach(service => {
		additionalPrice += service.price;
	});

	totalPrice.value = additionalPrice;
});

watchEffect(() => {
	if (peopleCount.value) {
		const lastDigit = peopleCount.value % 10;
		const lastTwoDigits = peopleCount.value % 100;

		if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
			peopleCountSignature.value = `${peopleCount.value} человек`;
		} else {
			if (lastDigit === 1) {
				peopleCountSignature.value = `${peopleCount.value} человек`;
			} else if (lastDigit >= 2 && lastDigit <= 4) {
				peopleCountSignature.value = `${peopleCount.value} человека`;
			} else {
				peopleCountSignature.value = `${peopleCount.value} человек`;
			}
		}
	}
});

watchEffect(() => {
	if (currentOutfitId.value) {
		currentOutfitEmployees.value = programStore.program.outfits.find(outfit => outfit.id === currentOutfitId.value);
	} else {
		currentOutfitEmployees.value = undefined;
	}
});

onMounted(async () => {
	await additionalServiceStore.getAdditionalServices();
	await programStore.getProgram(+props.id);
	totalPrice.value += programStore.program.price;
});

</script>

<template>

	<div class='wrapper'>
		<div class='dark_wrapper'></div>
		<GHeader class='relative z-50' style='background-color: transparent; color: #f6f5f5' :isWhite='true' />
		<div class='flex container items-center justify-center z-50 flex-col relative main-screen text-white h-full'>
			<h1 class='font-manrope-bold text-center w-full'>
				{{ programStore.program.title }}
			</h1>
			<a href='./employee.html' class='card__button relative font-manrope-bold z-50 text-white'>
				ЗАПИСАТЬСЯ
			</a>
		</div>
	</div>

	<main>
		<section class='section-padding'>
			<div class='program__card relative flex flex-col items-center'>
				<div class='program__number'>
					{{ programStore.program.id }}
				</div>
				<h2 class='font-manrope-extrabold'>{{ programStore.program.title }}</h2>
				<div class='program__photos mt-5 flex'>
					<div class='program__photo' v-for='photo in programStore.program.photos'>
						<img :src='photo.image_path' alt=''>
					</div>
				</div>
				<div class='container flex'>
					<div class='mt-5 text-center w-full'>
						<span>{{ programStore.program.description }}</span>
					</div>

					<div class='price__constructor flex flex-col mt-5'>
						<h3 class='font-manrope-bold mb-4'>Выбери доп. услуги</h3>
						<div class='flex flex-wrap gap-5 justify-center items-center'>
							<ServiceSelect
								v-for='(service, index) in services'
								:key='index'
								disabled-option='Выберите доп. услугу.'
								v-model='additionalServices[index]'
								label=''
								:services='additionalServiceStore.additionalServices'
							/>
							<div class='add__service page' @click='addService'>
								+
							</div>
						</div>
						<GInput name='people_count'
								v-model='peopleCount'
								placeholder=''
								label='Выберите количество людей'
								type='range'
								error=''
								:min='1'
								:max='programStore.program.max_people_count'
						/>
						<span class='font-manrope-extralight'>
							{{
								peopleCountSignature === '' ? 'Выберите количество человек, которые будут на' +
									' Вашем мероприятии.' : peopleCountSignature
							}}
						</span>
						<div class='flex flex-col mt-3 relative'>
							<h3 class='font-manrope-bold text-center'>
								Выберите костюмы и работников
							</h3>
							<div class='mt-4'
								 v-for='outfit in programStore.program.outfits'
								 :key='outfit.id'
							>
								<div class='flex flex-col items-center cursor-pointer'
									 @mouseenter='showEmployee(outfit.id)'
								>
									<img :src='outfit.preview_image_path' :alt='outfit.title'
										 style='width: 250px; height: 250px'>
									<span class='font-manrope-medium mt-3'>
										{{ outfit.title }}
									</span>
								</div>
								<div class='absolute'
									 @mouseleave='hideEmployee'
									 style='top: 50%; right: -50%; transform: translateY(-50%)'
								>
									<div
										class='flex items-center employee__container'
										v-if='currentOutfitEmployees'
									>
										<div
											class='flex flex-col items-center cursor-pointer'
											@click='selectEmployeeWithOutfit(employee.id, currentOutfitEmployees.id)'
											v-for='employee in currentOutfitEmployees.employees'
											:key='employee.id'
											:class='selectedEmployees.includes(employee.id) ? "employee-active" : ""'
										>
											<img :src='employee.photo' alt='employee.photo'
												 style='width: 150px; height: 150px'>
											<span class='font-manrope-medium mt-2'>
											{{ `${employee.name} ${employee.surname}` }}
										</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class='flex flex-col mt-3' v-for='day in programStore.program.days'>
							<h3 class='font-manrope-bold mb-2 text-center'>Выберите дату</h3>
							<h3
								class='font-manrope-semibold text-center cursor-pointer'
								@click='chooseDate(day.id)'>
								{{ day.date }}
							</h3>
							<div
								v-if='day.id === chosenDateId'
								class='flex flex-wrap mt-4 justify-center items-center'
								v-for='(time, index) in day.times'
								:key='time.id'
								:class='index === day.times.length - 1 ? "mb-4" : ""'
							>
								<span
									class='font-manrope-light time'
									:class='chosenTimeId === time.id ? "time-active" : ""'
									@click='chooseTime(time.id, day.id)'
								>
									{{ `${time.time_start} — ${time.time_end}` }}
								</span>
							</div>
						</div>
					</div>
					<div class='flex self-center w-full justify-center mt-4'>
						<textarea
							v-model='comment'
							class='font-manrope-bold'
							placeholder='Оставьте здесь свои пожелания!'
							rows='10'
							cols='20'
						/>
					</div>
					<div class='flex flex-col items-center w-full'>
						<div class='price mt-4'>
							<h1 class='font-manrope-medium'>Окончательная цена Вашего мероприятия: {{ totalPrice }}</h1>
						</div>
						<div class='flex justify-center items-center mt-2' @click='onSubmit({
							user_id: user.id,
							additional_service_ids: additionalServices.map(value => {
								return value.id
							}),
							schedule_program_id: chosenDateId as number,
							schedule_program_time_id: chosenTimeId as number,
							program_id: +id,
							employee_ids: selectedEmployees,
							outfit_ids: selectedOutfits,
							comment: comment as string,
							people_count: peopleCount as number
						})'>
							<button type='submit' class='card__button font-manrope-regular'>
								ЗАКАЗАТЬ
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<Feedback />
	</main>
</template>

<style scoped>
.time {
	font-size: 1.2rem;
	background-color: #f6f5f5;
	padding: 20px;
	border-radius: 10px;
	cursor: pointer;
	transition: background-color .3s ease-out;
}

textarea {
	background-color: #f6f5f5;
	border-radius: 10px;
	padding: 10px 10px;
	resize: none;
	box-shadow: var(--box-shadow);
}

.time-active {
	background-color: #c5c5c5;
	transition: background-color .3s ease-out;
}

.employee-active {
	background-color: #c5c5c5;
	transition: background-color .3s ease-out;
	padding: 15px;
	border-radius: 10px;
}

.time:hover {
	background-color: #c5c5c5;
	transition: background-color .3s ease-out;
}

.program__photos {
	flex-wrap: wrap;
}

.program__photos .program__photo {
	width: 25%;
	object-fit: cover;
	object-position: center;
	max-height: 301px;
}

.program__photo img {
	width: 100%;
	height: 100%;
}


.program__card h2 {
	margin: 40px 0 80px;
	text-align: center;
	font-size: 3rem;
}

.program__number {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100%;
	background-color: var(--background-color);
	width: 60px;
	height: 60px;
	font-size: 1.5rem;
	font-family: 'Manrope', sans-serif;
	font-weight: 600;
	position: relative;
}

.program__card:before {
	position: absolute;
	content: '';
	width: 50%;
	top: 30px;
	transform: translate(-50%, 50%);
	right: 0;
	height: 1px;
	background-color: var(--background-color);
}

.program__card__ver__2 h2 {
	font-size: 3rem;
}

.program__photo__ver__2 img {
	width: 100%;
	border-radius: 10px;
}

header ul li, footer ul li {
	list-style-type: none;
}

.wrapper {
	min-height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	z-index: -10;
}

.dark_wrapper {
	background: linear-gradient(90deg, rgba(0, 0, 0, .3), rgba(0, 0, 0, .5));
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: -10;
}

header {
	z-index: 10;
	position: relative;
}

header select {
	border: 1px solid white;
	color: white;
}

select option {
	color: black;
}

.main-screen {
	height: 40vw;
}

.wrapper .card__button {
	border: 1px solid white;
	color: white;
	margin-top: 30px;
	cursor: pointer;
	z-index: 10;
}

.program__card {
	margin-top: 20px;
}

.page {
	cursor: pointer;
	color: black;
	border-radius: 50%;
	background-color: var(--background-color);
	font-family: 'Manrope', sans-serif;
	font-weight: 600;
	height: 50px;
	width: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.price__constructor {
	display: flex;
	width: 100%;
	align-items: center;
}

.price__constructor .page {
	width: 50px;
	height: 50px;
	cursor: pointer;
}

.employee__container {
	border-radius: 10px;
	padding: 30px;
	background-color: #f6f5f5;
	gap: 40px;
}

</style>