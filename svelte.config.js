import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import fs from 'fs';
import https from 'https';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ out: 'build' })
	},
	https: {
		//key: fs.readFileSync("/etc/letsencrypt/live/sigma.cipinnovation.com/privkey.pem"),
		//cert: fs.readFileSync("/etc/letsencrypt/live/sigma.cipinnovation.com/fullchain.pem")
	},
	preprocess: vitePreprocess()
};

export default config;
