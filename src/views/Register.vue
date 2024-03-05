<script setup lang='ts'>
import GInput from '@/components/global/GInput.vue';
import { onMounted, ref } from 'vue';
import type { Credentials } from '@/types';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { useCityStore } from '@/stores/city';
import CitySelect from '@/components/CitySelect.vue';
import useAuth from '@/utils/useAuth';

const fio = ref('');
const phone_number = ref('');
const birthday = ref('');
const password = ref('');
const password_confirmation = ref('');
const city_id = ref('');
const error = ref('');

const citiesStore = useCityStore();

const { register, user } = useAuth();

const onSubmit = async (data: Credentials) => {
	await register(data);
	if (user.value.isLoggedIn) {
		await router.push({ name: 'programs' });
	}
};

onMounted(async () => {
	await citiesStore.getCities();
});

</script>

<template>
	<div class='wrapper__register'>
		<form
			@submit.prevent='onSubmit({ name: fio, phone_number, birthday, password, password_confirmation, city_id })'
			class='flex flex-col items-center'>
			<div class=''>
				<h1 class='font-manrope-bold mb-4'>Регистрация</h1>
			</div>
			<div class='flex gapped__fields'>
				<div class='col-6'>
					<GInput :name='fio' v-model='fio' placeholder='Иванов Иван Иванович' label='ФИО' type='text'
							:error='error' />
					<GInput :name='phone_number' v-model='phone_number' placeholder='+7 999 999 99 99'
							label='Номер телефона' type='text' :error='error' />
					<GInput :name='birthday' v-model='birthday' placeholder='Дата рождения' label='Дата рождения'
							type='date' :error='error' />
				</div>
				<div class='col-6'>
					<GInput :name='password' v-model='password' placeholder='Пароль' label='Пароль' type='password'
							:error='error' />
					<GInput :name='password_confirmation' v-model='password_confirmation'
							placeholder='Подтвердите пароль'
							label='Подтвердите пароль' type='password' :error='error' />
					<CitySelect v-model='city_id' :cities='citiesStore.cities' disabled-option='Выберите город' label='Выберите город'
							 :error='error' />
				</div>
			</div>
			<button class='card__button'>
				Зарегистрироваться
			</button>
		</form>
	</div>
</template>

<style>
.wrapper__register {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}

form {
	background-color: var(--background-color);
	padding: 30px 100px 40px;
	border-radius: 10px;
	box-shadow: var(--box-shadow);
}

form .card__button {
	width: 100%;
}

form input, textarea {
	width: 100%;
	min-width: 300px;
	background-color: transparent;
}

form label {
	width: 100%;
}

.gapped__fields {
	gap: 30px;
}

form .card__button {
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Manrope', sans-serif;
	margin-top: 20px;
	box-shadow: var(--box-shadow);
}

</style>