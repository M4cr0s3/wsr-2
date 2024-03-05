<script setup lang='ts'>
import type { AdditionalService } from '@/types';

interface ServiceSelectProps {
	label: string;
	services: AdditionalService[];
	disabledOption: string;
	modelValue: any;
}

const props = defineProps<ServiceSelectProps>();
const emit = defineEmits(['update:modelValue']);

const id = Math.random().toString();

const onChange = (event: Event) => {
	const selectedId = +(event.target as HTMLSelectElement).value;
	const selectedService = props.services.find(service => service.id === selectedId);
	if (selectedService) {
		emit('update:modelValue', { id: selectedId, price: selectedService.price });
	}
};

</script>

<template>
	<div class='flex flex-col'>
		<label :for='id' class='font-manrope-medium text-lg'>
			{{ props.label }}
		</label>
		<select :id='id' @change='onChange($event)'>
			<option disabled selected>{{ props.disabledOption }}</option>
			<option class='font-manrope-bold' v-for='service in props.services' :key='service.id' :value='service.id'>
				{{ service.title }}
			</option>
		</select>
	</div>
</template>


<style scoped>
select {
	max-width: 400px;
}
</style>