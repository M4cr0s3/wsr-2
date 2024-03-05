<script setup lang='ts'>

interface GInputProps {
	type: string;
	name: string;
	modelValue: any;
	placeholder: string;
	label: string;
	error: string;
	pattern?: string;
}

interface GRangeInputProps extends GInputProps {
	min?: number;
	max?: number;
}

defineProps<GInputProps | GRangeInputProps>();

const id = Math.random().toString();

</script>

<template>
	<div class='flex flex-col w-full items-center' v-if='type !== "range"'>
		<label :for='id' class='font-manrope-medium text-lg text-start'>
			{{ label }}
		</label>
		<input :type='type' class='font-manrope-medium' :id='id' :placeholder='placeholder' :value='modelValue'
			   @input='$emit("update:modelValue", ($event.target as HTMLInputElement).value)'
			   :pattern='type === "tel" ? pattern : undefined' />


		<div class='' v-if='error'>
			{{ error }}
		</div>
	</div>
	<div v-if='type === "range"' class='flex flex-col items-center mt-2'>
		<label :for='id' class='font-manrope-medium text-lg text-start'>
			{{ label }}
		</label>
		<input class='font-manrope-medium' :id='id' :type='type' :min='min' :max='max'
			   :value='modelValue'
			   @input='$emit("update:modelValue", ($event.target as HTMLInputElement).value)' />
	</div>

</template>

<style scoped>
input {
	margin: 10px 0 5px 0;
}
</style>