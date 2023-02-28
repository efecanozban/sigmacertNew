<script>
	import { onMount } from 'svelte';
	import LoginForm from '$lib/components/login/loginForm.svelte';

	// response of login form
	/** @type {import('./$types').ActionData} */
	export let form;

	onMount(() => {
		if (form?.success == false) {
			switch (form?.message) {
				case 'no such user exists':
					alert('No such user!');
					break;
			}
		}
	});
</script>

<LoginForm />
