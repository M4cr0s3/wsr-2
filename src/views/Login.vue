<script setup lang='ts'>
import GInput from '@/components/global/GInput.vue';
import { reactive, ref, watch } from 'vue';
import type { LoginCredentials } from '@/types';
import { useRouter } from 'vue-router';
import useAuth from '@/utils/useAuth';

const router = useRouter();
const { user, login } = useAuth();

const authData = reactive({
	authCredential: '',
	password: '',
});

const authCredentialType = ref('text');
const authCredentialKey = ref('');

const error = ref('');

watch(() => authData.authCredential, () => {
	if (authData.authCredential.includes('@')) {
		authCredentialType.value = 'email';
		authCredentialKey.value = 'email';
	} else {
		authCredentialType.value = 'tel';
		authCredentialKey.value = 'phone_number';
	}
});

const onSubmit = async (data: LoginCredentials) => {
	await login(data);
	if (user.value.isLoggedIn) {
		await router.push({ name: 'programs' });
	}
};
</script>

<template>
	<div class='wrapper__register'>
		<form @submit.prevent='onSubmit({
			[authCredentialKey]: authData.authCredential,
			password: authData.password
		})' class='flex flex-col items-center'>
			<div class=''>
				<h1 class='font-manrope-bold mb-4'>Авторизация</h1>
			</div>
			<GInput :name='authData.authCredential' v-model='authData.authCredential'
					placeholder=' Номер телефона или email'
					label='Номер телефона или email' :type='authCredentialType'
					:pattern='authCredentialType === "tel" ? "^(\\+7|8)[0-9]{10}$" : ""'
					:error='error' />
			<GInput :name='authData.password' v-model='authData.password' placeholder='Пароль' label='Пароль'
					type='password'
					:error='error' />
			<button type='submit' class='card__button'>
				Отправить
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