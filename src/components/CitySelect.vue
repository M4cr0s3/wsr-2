<script setup lang='ts'>
import type { City } from '@/types';

interface GSelectProps {
	label: string;
	error: string;
	cities: City[];
	disabledOption: string;
	modelValue: string;
}

defineProps<GSelectProps>();

const id = Math.random().toString();

</script>

<template>
	<div class='flex flex-col w-full'>
		<label :for='id' class='font-manrope-medium text-lg'>
			{{ label }}
		</label>
		<select :id='id' class='mt-2' @change='$emit("update:modelValue", ($event.target as HTMLSelectElement).value)'>
			<option disabled>{{ disabledOption }}</option>
			<option class='font-manrope-bold' v-for='city in cities' :key='city.id' :value='city.id'>{{ city.title }}
			</option>
		</select>
	</div>
</template>

<style scoped>

</style>