<script setup lang='ts'>
import type { PaginatedResponse, Program } from '@/types';
import ProgramItem from '@/components/program/ProgramItem.vue';

interface Props {
	programs: PaginatedResponse<Program>;
}

defineProps<Props>();

</script>

<template>
	<section class='section-padding'>
		<h1 class='section-title text-center font-manrope-bold'>
			Программы
		</h1>
		<div class='container' v-for='program in programs.data' :key='program.id'>
			<ProgramItem :program='program' />
		</div>


		<div class='pagination flex justify-center mt-14' v-if='programs.links'>
			<div class='pages flex'>
				<div class='page' v-for='page in programs.links.slice(1, programs.links.length - 1)'
					 :class='[page.active ? "active" : ""]'
					 @click='$emit("changePage", page.label)'>
					<span>
						{{ page.label }}
					</span>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.pages {
	gap: 10px;
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

.active {
	background-color: #c5c5c5;
}
</style>