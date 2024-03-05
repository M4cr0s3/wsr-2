<script setup lang='ts'>

import type { Program } from '@/types';

defineProps<{ program: Program }>();

</script>

<template>
	<div class='program__card__ver__2 flex flex-col items-center'>
		<div class='program__number'>
			{{ program.id }}
		</div>
		<h2 class='font-manrope-extrabold text-center mt-7'>{{ program.title }}</h2>
		<div class='program__photo__ver__2 mt-10'>
			<img :src='program.preview_image_path' alt=''>
		</div>
		<div class='program__plan'>
			<div class='program__plan__title'>
				{{ program.description }}
			</div>
			<div class='flex justify-center items-center mt-5'>
				<RouterLink :to='`program/${program.id}`' class='card__button font-manrope-regular'>
					ПОДРОБНЕЕ
				</RouterLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
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


.program__plan__title {
	font-family: 'Manrope', sans-serif;
	font-weight: 700;
	margin-top: 30px;
	text-align: center;
}


.program__card__ver__2 {
	margin-top: 60px;
	position: relative;
}

.program__card__ver__2 h2 {
	font-size: 3rem;
}


.program__photo__ver__2 {
	object-fit: cover;
	object-position: center;
}

.program__photo__ver__2 img {
	width: 100%;
	border-radius: 10px;
}

.program__card__ver__2:before {
	position: absolute;
	content: '';
	width: 50%;
	top: 30px;
	transform: translate(-50%, 50%);
	right: 0;
	height: 1px;
	background-color: var(--background-color);
}
</style>