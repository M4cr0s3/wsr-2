<script setup lang='ts'>
import Default from '@/layouts/default.vue';
import ProgramList from '@/components/program/ProgramList.vue';
import { useProgramStore } from '@/stores/program';
import { onMounted } from 'vue';

const programStore = useProgramStore();

onMounted(async () => {
	await programStore.getPrograms();
});

</script>

<template>
	<default>
		<ProgramList :programs='programStore.programs'
					 @changePage='(label: string) => programStore.getPrograms(+label)' />
	</default>
</template>

<style scoped>

</style>