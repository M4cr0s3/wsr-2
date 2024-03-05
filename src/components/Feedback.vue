<script setup lang='ts'>

</script>

<template>
	<section class='section-padding-bottom'>
		<h1 class='section-title font-manrope-bold text-center'>
			Давайте сделаем проект вместе!
		</h1>
		<div class='container' style='margin-top: 60px'>
			<form action='' method='post' class='flex flex-col items-center'>
				<div class='flex flex-col w-full items-center'>
					<label for='name' class='font-manrope-medium text-lg text-start w-half'>
						Имя
					</label>
					<input type='text' class='font-manrope-medium' id='name' placeholder='Имя'>
				</div>
				<div class='flex flex-col w-full items-center'>
					<label for='phone_number' class='font-manrope-medium text-start w-half text-lg'>
						Номер телефона
					</label>
					<input type='text' class='font-manrope-medium' id='phone_number' placeholder='Номер телефона'>
				</div>
				<div class='flex flex-col w-full items-center'>
					<label for='about' class='font-manrope-medium text-lg w-half text-start'>
						Кратко о задаче
					</label>
					<textarea name='' id='about' rows='5'
							  placeholder='Кратко о задаче'>                    </textarea>
					<!--                    <input type="text" class="font-manrope-medium" id="about" placeholder="Кратко о задаче">-->
				</div>
				<div class='flex w-full justify-center mt-5'>
					<div class='flex flex-col' style='width: 50%;'>
						<label class='font-manrope-medium text-lg mb-2'>Бюджет</label>
						<div class='flex gap-5'>
                        <span class='budget text-base active-budget'>
                            &lt; 1 млн
                        </span>
							<span class='budget text-base'>
                            1-3 млн
                        </span>
							<span class='budget text-base'>
                            3-5 млн
                        </span>
							<span class='budget text-base'>
                            &gt; 5 млн
                        </span>
						</div>
					</div>
				</div>
				<button type='submit' class='card__button'>
					Отправить
				</button>
			</form>
		</div>
	</section>
</template>

<style scoped>

</style>