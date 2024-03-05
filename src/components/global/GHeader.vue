<script setup lang='ts'>


defineProps<{ isWhite?: boolean }>();

</script>

<template>
	<div style='background-color: var(--background-color);'>
		<header class=''>
			<div class='container flex items-center justify-between'>
				<a href='./index.html' class='logo text-black flex items-center'>
					<div
						style='border-radius: 8px; background-color: rgba(255,255,255, .1); width: 60px; height: 60px;'></div>
					<h1 class='font-manrope-extrabold' :class='isWhite ? "text-white" : ""'>EVANCY</h1>
				</a>
				<nav>
					<ul class='flex items-center'>
						<li>
							<a href='./locations.html' class='font-manrope-medium' :class='isWhite ? "text-white" : ""'>
								Локации
							</a>
						</li>
						<li>
							<a href='./employees.html' class='font-manrope-medium' :class='isWhite ? "text-white" : ""'>
								Сотрудники
							</a>
						</li>
						<li>
							<RouterLink to='/programs' class='font-manrope-medium' :class='isWhite ? "text-white" : ""'>
								Программы
							</RouterLink>
						</li>
						<li>
							<a href='./discounts.html' class='font-manrope-medium' :class='isWhite ? "text-white" : ""'>
								Акции
							</a>
						</li>
					</ul>
				</nav>
				<div class='font-manrope-medium'>
					<a href='tel:7xxxxxxxx99' class='text-black' :class='isWhite ? "text-white" : ""'>
						+7xxxxxxxx99
					</a>
				</div>
				<div class='program__photo'>
					<select :class='isWhite ? "text-white" : ""'>
						<option disabled=''>Выберите город</option>
						<option class='font-manrope-bold'>Москва</option>
						<option class='font-manrope-bold'>Санкт-Петербург</option>
						<option class='font-manrope-bold'>Нижний Новгород</option>
					</select>
				</div>
				<div class='program__photo'>
					<a href='register.html' class='font-manrope-medium flex items-center gap-1 text-black'
					   :class='isWhite ? "text-white" : ""'>
						Войти
						<span class='flex items-center'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 256 256'><path
							fill='currentColor'
							d='m220.24 132.24l-72 72a6 6 0 0 1-8.48-8.48L201.51 134H40a6 6 0 0 1 0-12h161.51l-61.75-61.76a6 6 0 0 1 8.48-8.48l72 72a6 6 0 0 1 0 8.48'></path></svg>
                    </span>
					</a>
				</div>
			</div>
		</header>
	</div>
</template>

<style scoped>

</style>