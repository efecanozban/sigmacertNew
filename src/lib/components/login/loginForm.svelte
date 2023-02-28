<div class="absolute top-[20vh] w-full flex justify-center">
	<form
		class="h-[65vh] w-[60vw] md:w-[40vw] lg:w-[30vw] text-center bg-inherit rounded-[50px] bg-[url('/favicon.png')] bg-no-repeat bg-top bg-[length:42vh_auto] neomorphic-sm"
		method="POST"
		action="?/login"
	>
		<input
			class="relative w-2/3 h-8 top-[65%] pl-6 mb-6 rounded-3xl"
			type="text"
			name="kullaniciAdi"
			placeholder="Kullanıcı Adı"
		/>
		<br />
		<input
			class="relative w-2/3 h-8 top-[65%] pl-6 mb-6 rounded-3xl"
			type="text"
			name="sifre"
			placeholder="Şifre"
		/> <br />
		<button class="relative w-2/3 h-8 top-[65%] rounded-3xl bg-white font-tahoma">Giriş Yap</button>
	</form>
</div>
